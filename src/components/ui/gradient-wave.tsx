"use client";

import { useEffect, useRef } from "react";

type DeformSettings = {
  incline: number;
  offsetTop: number;
  offsetBottom: number;
  noiseFreq: [number, number];
  noiseAmp: number;
  noiseSpeed: number;
  noiseFlow: number;
  noiseSeed: number;
};

interface GradientWaveProps {
  colors?: string[];
  isPlaying?: boolean;
  className?: string;
  shadowPower?: number;
  darkenTop?: boolean;
  noiseSpeed?: number;
  noiseFrequency?: [number, number];
  deform?: Partial<DeformSettings>;
}

type GeometryAttribute = {
  attach: (name: string, program: WebGLProgram) => number;
  use: (location: number) => void;
  update: () => void;
  values?: Float32Array | Uint16Array;
};

const DEFAULT_COLORS = [
  "#ffffff",
  "#fb7185",
  "#e879f9",
  "#a3e635",
  "#ffffff",
];

const DEFAULT_DEFORM: DeformSettings = {
  incline: 0.5,
  offsetTop: -0.5,
  offsetBottom: -0.5,
  noiseFreq: [3, 4],
  noiseAmp: 250,
  noiseSpeed: 10,
  noiseFlow: 5,
  noiseSeed: 5,
};

function normalizeColor(hexCode: number): [number, number, number] {
  return [
    ((hexCode >> 16) & 255) / 255,
    ((hexCode >> 8) & 255) / 255,
    (hexCode & 255) / 255,
  ];
}

class MiniGl {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  meshes: any[] = [];
  commonUniforms: Record<string, any>;
  width = 1;
  height = 1;
  Material: any;
  Uniform: any;
  PlaneGeometry: any;
  Mesh: any;
  Attribute: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = this.canvas.getContext("webgl", { antialias: true });

    if (!gl) {
      throw new Error("WebGL not supported");
    }

    this.gl = gl;
    const context = this.gl;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const miniGl = this;

    this.Uniform = class {
      type: string = "float";
      value: any;
      typeFn: string;
      excludeFrom?: string;
      transpose?: boolean;

      constructor(config: any) {
        Object.assign(this, config);

        const typeMap: Record<string, string> = {
          float: "1f",
          int: "1i",
          vec2: "2fv",
          vec3: "3fv",
          vec4: "4fv",
          mat4: "Matrix4fv",
        };

        this.typeFn = typeMap[this.type] || "1f";
      }

      update(location: WebGLUniformLocation | null): void {
        if (this.value === undefined || location === null) {
          return;
        }

        const isMatrix = this.typeFn.startsWith("Matrix");
        const fn = `uniform${this.typeFn}`;

        if (isMatrix) {
          (context as any)[fn](location, this.transpose || false, this.value);
          return;
        }

        (context as any)[fn](location, this.value);
      }

      getDeclaration(name: string, stage: string, length?: number): string {
        if (this.excludeFrom === stage) {
          return "";
        }

        if (this.type === "array") {
          if (!Array.isArray(this.value) || this.value.length === 0) {
            return "";
          }

          return `${this.value[0].getDeclaration(name, stage, this.value.length)}
const int ${name}_length = ${this.value.length};`;
        }

        if (this.type === "struct") {
          let nameWithoutPrefix = name.replace("u_", "");
          nameWithoutPrefix =
            nameWithoutPrefix.charAt(0).toUpperCase() + nameWithoutPrefix.slice(1);

          const fields = Object.entries(this.value as Record<string, any>)
            .map(([fieldName, uniform]) =>
              (uniform as any).getDeclaration(fieldName, stage).replace(/^uniform/, "")
            )
            .join("");

          return `uniform struct ${nameWithoutPrefix}
{
${fields}
} ${name}${length ? `[${length}]` : ""};`;
        }

        return `uniform ${this.type} ${name}${length ? `[${length}]` : ""};`;
      }
    };

    this.Attribute = class {
      type: number = context.FLOAT;
      normalized = false;
      buffer: WebGLBuffer;
      target!: number;
      size!: number;
      values?: Float32Array | Uint16Array;

      constructor(config: any) {
        const buffer = context.createBuffer();

        if (!buffer) {
          throw new Error("Failed to create WebGL buffer");
        }

        this.buffer = buffer;
        Object.assign(this, config);
      }

      update(): void {
        if (!this.values) {
          return;
        }

        context.bindBuffer(this.target, this.buffer);
        context.bufferData(this.target, this.values, context.STATIC_DRAW);
      }

      attach(name: string, program: WebGLProgram): number {
        const location = context.getAttribLocation(program, name);

        if (location === -1 || this.target !== context.ARRAY_BUFFER) {
          return location;
        }

        context.bindBuffer(this.target, this.buffer);
        context.enableVertexAttribArray(location);
        context.vertexAttribPointer(
          location,
          this.size,
          this.type,
          this.normalized,
          0,
          0,
        );

        return location;
      }

      use(location: number): void {
        if (location === -1) {
          return;
        }

        context.bindBuffer(this.target, this.buffer);

        if (this.target !== context.ARRAY_BUFFER) {
          return;
        }

        context.enableVertexAttribArray(location);
        context.vertexAttribPointer(
          location,
          this.size,
          this.type,
          this.normalized,
          0,
          0,
        );
      }
    };

    this.Material = class {
      uniforms: Record<string, any>;
      uniformInstances: Array<{
        uniform: any;
        location: WebGLUniformLocation | null;
      }> = [];
      program: WebGLProgram;

      constructor(vertexShader: string, fragmentShader: string, uniforms: Record<string, any> = {}) {
        const program = context.createProgram();

        if (!program) {
          throw new Error("Failed to create WebGL program");
        }

        this.program = program;
        this.uniforms = uniforms;

        const prefix = "precision highp float;";

        const compileShader = (type: number, source: string) => {
          const shader = context.createShader(type);

          if (!shader) {
            throw new Error("Failed to create shader");
          }

          context.shaderSource(shader, source);
          context.compileShader(shader);

          if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
            const shaderError = context.getShaderInfoLog(shader) || "Unknown shader error";
            context.deleteShader(shader);
            throw new Error(shaderError);
          }

          return shader;
        };

        const getUniformDeclarations = (uniformSet: Record<string, any>, stage: string) =>
          Object.entries(uniformSet)
            .map(([uniformName, uniform]) => uniform.getDeclaration(uniformName, stage))
            .join("\n");

        const vertexSource = `
          ${prefix}
          attribute vec4 position;
          attribute vec2 uv;
          attribute vec2 uvNorm;
          ${getUniformDeclarations(miniGl.commonUniforms, "vertex")}
          ${getUniformDeclarations(uniforms, "vertex")}
          ${vertexShader}
        `;

        const fragmentSource = `
          ${prefix}
          ${getUniformDeclarations(miniGl.commonUniforms, "fragment")}
          ${getUniformDeclarations(uniforms, "fragment")}
          ${fragmentShader}
        `;

        const compiledVertex = compileShader(context.VERTEX_SHADER, vertexSource);
        const compiledFragment = compileShader(context.FRAGMENT_SHADER, fragmentSource);

        context.attachShader(this.program, compiledVertex);
        context.attachShader(this.program, compiledFragment);
        context.linkProgram(this.program);

        if (!context.getProgramParameter(this.program, context.LINK_STATUS)) {
          const linkError = context.getProgramInfoLog(this.program) || "Unknown program error";
          throw new Error(linkError);
        }

        context.useProgram(this.program);
        this.attachUniforms(undefined, miniGl.commonUniforms);
        this.attachUniforms(undefined, this.uniforms);
      }

      attachUniforms(name: string | undefined, uniforms: any): void {
        if (name === undefined) {
          Object.entries(uniforms).forEach(([entryName, uniform]) =>
            this.attachUniforms(entryName, uniform)
          );
          return;
        }

        if (uniforms.type === "array") {
          uniforms.value.forEach((uniform: any, index: number) =>
            this.attachUniforms(`${name}[${index}]`, uniform)
          );
          return;
        }

        if (uniforms.type === "struct") {
          Object.entries(uniforms.value).forEach(([entryName, uniform]) =>
            this.attachUniforms(`${name}.${entryName}`, uniform)
          );
          return;
        }

        this.uniformInstances.push({
          uniform: uniforms,
          location: context.getUniformLocation(this.program, name),
        });
      }
    };

    this.PlaneGeometry = class {
      width = 1;
      height = 1;
      attributes: Record<string, GeometryAttribute>;
      vertexCount = 0;
      xSegCount = 0;
      ySegCount = 0;

      constructor() {
        this.attributes = {
          position: new miniGl.Attribute({
            target: context.ARRAY_BUFFER,
            size: 3,
          }),
          uv: new miniGl.Attribute({
            target: context.ARRAY_BUFFER,
            size: 2,
          }),
          uvNorm: new miniGl.Attribute({
            target: context.ARRAY_BUFFER,
            size: 2,
          }),
          index: new miniGl.Attribute({
            target: context.ELEMENT_ARRAY_BUFFER,
            size: 1,
            type: context.UNSIGNED_SHORT,
          }),
        };
      }

      setTopology(xSegs = 1, ySegs = 1): void {
        this.xSegCount = xSegs;
        this.ySegCount = ySegs;
        this.vertexCount = (this.xSegCount + 1) * (this.ySegCount + 1);
        const quadCount = this.xSegCount * this.ySegCount;

        this.attributes.uv.values = new Float32Array(2 * this.vertexCount);
        this.attributes.uvNorm.values = new Float32Array(2 * this.vertexCount);
        this.attributes.index.values = new Uint16Array(6 * quadCount);

        for (let y = 0; y <= this.ySegCount; y += 1) {
          for (let x = 0; x <= this.xSegCount; x += 1) {
            const vertexIndex = y * (this.xSegCount + 1) + x;

            this.attributes.uv.values[2 * vertexIndex] = x / this.xSegCount;
            this.attributes.uv.values[2 * vertexIndex + 1] = 1 - y / this.ySegCount;
            this.attributes.uvNorm.values[2 * vertexIndex] =
              (x / this.xSegCount) * 2 - 1;
            this.attributes.uvNorm.values[2 * vertexIndex + 1] =
              1 - (y / this.ySegCount) * 2;

            if (x >= this.xSegCount || y >= this.ySegCount) {
              continue;
            }

            const quadIndex = y * this.xSegCount + x;
            const indexOffset = quadIndex * 6;

            this.attributes.index.values[indexOffset] = vertexIndex;
            this.attributes.index.values[indexOffset + 1] =
              vertexIndex + 1 + this.xSegCount;
            this.attributes.index.values[indexOffset + 2] = vertexIndex + 1;
            this.attributes.index.values[indexOffset + 3] = vertexIndex + 1;
            this.attributes.index.values[indexOffset + 4] =
              vertexIndex + 1 + this.xSegCount;
            this.attributes.index.values[indexOffset + 5] =
              vertexIndex + 2 + this.xSegCount;
          }
        }

        this.attributes.uv.update();
        this.attributes.uvNorm.update();
        this.attributes.index.update();
      }

      setSize(width = 1, height = 1): void {
        this.width = width;
        this.height = height;
        this.attributes.position.values = new Float32Array(3 * this.vertexCount);

        const offsetX = width / -2;
        const offsetY = height / -2;
        const segWidth = width / this.xSegCount;
        const segHeight = height / this.ySegCount;

        for (let y = 0; y <= this.ySegCount; y += 1) {
          const posY = offsetY + y * segHeight;

          for (let x = 0; x <= this.xSegCount; x += 1) {
            const posX = offsetX + x * segWidth;
            const index = y * (this.xSegCount + 1) + x;

            this.attributes.position.values[3 * index] = posX;
            this.attributes.position.values[3 * index + 1] = -posY;
            this.attributes.position.values[3 * index + 2] = 0;
          }
        }

        this.attributes.position.update();
      }
    };

    this.Mesh = class {
      geometry: any;
      material: any;
      attributeInstances: Array<{ attribute: any; location: number }> = [];

      constructor(geometry: any, material: any) {
        this.geometry = geometry;
        this.material = material;

        const attributes = Object.entries(
          this.geometry.attributes as Record<string, GeometryAttribute>,
        );

        attributes.forEach(([name, attribute]) => {
          this.attributeInstances.push({
            attribute,
            location: attribute.attach(name, this.material.program),
          });
        });

        miniGl.meshes.push(this);
      }

      draw(): void {
        context.useProgram(this.material.program);
        this.material.uniformInstances.forEach(({ uniform, location }: any) =>
          uniform.update(location)
        );
        this.attributeInstances.forEach(({ attribute, location }) =>
          attribute.use(location)
        );
        context.drawElements(
          context.TRIANGLES,
          this.geometry.attributes.index.values.length,
          context.UNSIGNED_SHORT,
          0,
        );
      }
    };

    const identityMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    this.commonUniforms = {
      projectionMatrix: new this.Uniform({
        type: "mat4",
        value: identityMatrix,
      }),
      modelViewMatrix: new this.Uniform({
        type: "mat4",
        value: identityMatrix,
      }),
      resolution: new this.Uniform({
        type: "vec2",
        value: [1, 1],
      }),
      aspectRatio: new this.Uniform({
        type: "float",
        value: 1,
      }),
    };
  }

  setSize(width = 640, height = 480): void {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
    this.commonUniforms.resolution.value = [width, height];
    this.commonUniforms.aspectRatio.value = width / height;
  }

  setOrthographicCamera(): void {
    this.commonUniforms.projectionMatrix.value = [
      2 / this.width,
      0,
      0,
      0,
      0,
      2 / this.height,
      0,
      0,
      0,
      0,
      -0.001,
      0,
      0,
      0,
      0,
      1,
    ];
  }

  render(): void {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clearDepth(1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.meshes.forEach((mesh) => mesh.draw());
  }
}

class Gradient {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  colors: string[];
  minigl: MiniGl;
  mesh!: any;
  time = 0;
  last = 0;
  animationId?: number;
  isPlaying = false;

  constructor(container: HTMLDivElement, canvas: HTMLCanvasElement, colors: string[]) {
    this.container = container;
    this.canvas = canvas;
    this.colors = colors.slice(0, 5);
    this.minigl = new MiniGl(canvas);
    this.init();
  }

  init(): void {
    const sectionColors = this.colors.map((hex) =>
      normalizeColor(parseInt(hex.replace("#", "0x"), 16))
    );
    const layerColors = sectionColors.slice(1, 5);
    const activeColors = [0, 0, 0, 0];
    layerColors.forEach((_, index) => {
      activeColors[index] = 1;
    });

    const uniforms = {
      u_time: new this.minigl.Uniform({ value: 0 }),
      u_shadow_power: new this.minigl.Uniform({ value: 5 }),
      u_darken_top: new this.minigl.Uniform({ value: 0 }),
      u_active_colors: new this.minigl.Uniform({
        value: activeColors,
        type: "vec4",
      }),
      u_global: new this.minigl.Uniform({
        value: {
          noiseFreq: new this.minigl.Uniform({
            value: [0.00014, 0.00029],
            type: "vec2",
          }),
          noiseSpeed: new this.minigl.Uniform({ value: 0.000005 }),
        },
        type: "struct",
      }),
      u_vertDeform: new this.minigl.Uniform({
        value: {
          incline: new this.minigl.Uniform({ value: 0 }),
          offsetTop: new this.minigl.Uniform({ value: -0.5 }),
          offsetBottom: new this.minigl.Uniform({ value: -0.5 }),
          noiseFreq: new this.minigl.Uniform({ value: [3, 4], type: "vec2" }),
          noiseAmp: new this.minigl.Uniform({ value: 320 }),
          noiseSpeed: new this.minigl.Uniform({ value: 10 }),
          noiseFlow: new this.minigl.Uniform({ value: 3 }),
          noiseSeed: new this.minigl.Uniform({ value: 5 }),
        },
        type: "struct",
        excludeFrom: "fragment",
      }),
      u_baseColor: new this.minigl.Uniform({
        value: sectionColors[0] || normalizeColor(0xffffff),
        type: "vec3",
        excludeFrom: "fragment",
      }),
      u_waveLayers: new this.minigl.Uniform({
        value: [],
        excludeFrom: "fragment",
        type: "array",
      }),
    };

    layerColors.forEach((color, index) => {
      uniforms.u_waveLayers.value.push(
        new this.minigl.Uniform({
          value: {
            color: new this.minigl.Uniform({
              value: color,
              type: "vec3",
            }),
            noiseFreq: new this.minigl.Uniform({
              value: [
                2 + index / sectionColors.length,
                3 + index / sectionColors.length,
              ],
              type: "vec2",
            }),
            noiseSpeed: new this.minigl.Uniform({
              value: 11 + 0.3 * index,
            }),
            noiseFlow: new this.minigl.Uniform({
              value: 6.5 + 0.3 * index,
            }),
            noiseSeed: new this.minigl.Uniform({
              value: 5 + 10 * index,
            }),
            noiseFloor: new this.minigl.Uniform({ value: 0.1 }),
            noiseCeil: new this.minigl.Uniform({
              value: 0.63 + 0.07 * index,
            }),
          },
          type: "struct",
        })
      );
    });

    const vertexShader = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

vec3 blendNormal(vec3 base, vec3 blend) { return blend; }
vec3 blendNormal(vec3 base, vec3 blend, float opacity) { return (blend * opacity + base * (1.0 - opacity)); }

varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;
  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;
  float tilt = resolution.y / 2.0 * uvNorm.y;
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);
  noise = max(0.0, noise);

  vec3 pos = vec3(position.x, position.y + tilt + incline + noise - offset, position.z);

  v_color = u_baseColor;

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i] == 1.0) {
      WaveLayers layer = u_waveLayers[i];
      float layerNoise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(layerNoise, 4.0));
    }
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

    const fragmentShader = `
varying vec3 v_color;

void main() {
  vec3 color = v_color;

  if (u_darken_top == 1.0) {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
  }

  gl_FragColor = vec4(color, 1.0);
}`;

    const material = new this.minigl.Material(vertexShader, fragmentShader, uniforms);
    const geometry = new this.minigl.PlaneGeometry();
    this.mesh = new this.minigl.Mesh(geometry, material);
    this.resize();
  }

  resize(): void {
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    this.minigl.setSize(width, height);
    this.minigl.setOrthographicCamera();

    const xSegCount = Math.max(12, Math.ceil(width * 0.02));
    const ySegCount = Math.max(12, Math.ceil(height * 0.05));
    this.mesh.geometry.setTopology(xSegCount, ySegCount);
    this.mesh.geometry.setSize(width, height);
    this.minigl.render();
  }

  applyConfig(config: {
    shadowPower: number;
    darkenTop: boolean;
    noiseSpeed: number;
    noiseFrequency: [number, number];
    deform: DeformSettings;
    isPlaying: boolean;
  }): void {
    const uniforms = this.mesh.material.uniforms;

    uniforms.u_shadow_power.value = config.shadowPower;
    uniforms.u_darken_top.value = config.darkenTop ? 1 : 0;
    uniforms.u_global.value.noiseFreq.value = config.noiseFrequency;
    uniforms.u_global.value.noiseSpeed.value = config.noiseSpeed;

    Object.entries(config.deform).forEach(([key, value]) => {
      const uniform = uniforms.u_vertDeform.value[key];

      if (uniform) {
        uniform.value = value;
      }
    });

    if (config.isPlaying) {
      this.start();
    } else {
      this.stop();
      this.minigl.render();
    }
  }

  animate = (timestamp: number): void => {
    if (!this.isPlaying) {
      return;
    }

    this.time += Math.min(timestamp - this.last, 1000 / 15);
    this.last = timestamp;
    this.mesh.material.uniforms.u_time.value = this.time;
    this.minigl.render();
    this.animationId = window.requestAnimationFrame(this.animate);
  };

  start(): void {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    this.last = performance.now();
    this.animationId = window.requestAnimationFrame(this.animate);
  }

  stop(): void {
    this.isPlaying = false;

    if (this.animationId !== undefined) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

  destroy(): void {
    this.stop();
  }
}

export function GradientWave({
  colors = DEFAULT_COLORS,
  isPlaying = true,
  className = "",
  shadowPower = 8,
  darkenTop = false,
  noiseSpeed = 0.00001,
  noiseFrequency = [0.0001, 0.0009],
  deform,
}: GradientWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<Gradient | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const canvas = document.createElement("canvas");

    Object.assign(canvas.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "block",
    });

    container.appendChild(canvas);

    try {
      const gradient = new Gradient(container, canvas, colors.slice(0, 5));
      gradientRef.current = gradient;

      const resizeObserver = new ResizeObserver(() => gradient.resize());
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
        gradientRef.current = null;
        gradient.destroy();

        if (container.contains(canvas)) {
          container.removeChild(canvas);
        }
      };
    } catch (error) {
      console.error("Failed to initialize gradient:", error);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      return undefined;
    }
  }, [colors]);

  useEffect(() => {
    gradientRef.current?.applyConfig({
      shadowPower,
      darkenTop,
      noiseSpeed,
      noiseFrequency,
      deform: {
        ...DEFAULT_DEFORM,
        ...deform,
      },
      isPlaying,
    });
  }, [
    darkenTop,
    deform,
    isPlaying,
    noiseFrequency,
    noiseSpeed,
    shadowPower,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 h-full w-full overflow-hidden ${className}`}
    />
  );
}
