import React from "react";

import styles from "@/components/homepage/process/ProcessSection.module.css";

export default function ProcessSection() {
  return (
    <section className={styles.section} id="process">
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          <span>HOW WE WORK?</span>
          <span>HOWEVER YOU DO!</span>
        </h2>

        <p className={styles.copy}>
          Every team works differently, so{" "}
          <strong>we don&apos;t force you into a one-size-fits-all process.</strong>{" "}
          Some clients like hopping on a call, some send a brief, some drop a
          half-formed idea and want help shaping it.{" "}
          <strong>However you work, we adapt, align, and get things moving.</strong>
        </p>
      </div>
    </section>
  );
}
