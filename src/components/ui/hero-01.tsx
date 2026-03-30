"use client";

import { Button } from "@/components/ui/button";
import { GradientWave } from "@/components/ui/gradient-wave";
import { MorphingText } from "@/components/ui/liquid-text";
import { useContactForm } from "@/hooks/use-contact-form";

const impactWords = [
  "Branding",
  "Strategy",
  "Marketing",
  "SMM",
  "SEO",
  "AI Integration",
  "High-Performing",
  "Presence",
  "Web Development",
  "Designs",
] as const;

export function HeroSection01() {
  const { formRef, handleSubmit, isSubmitting } = useContactForm({
    buildSubject: (formData) => {
      const email = formData.get("email");

      if (typeof email === "string" && email.trim().length > 0) {
        return `Hierys coming soon query from ${email.trim()}`;
      }

      return "Hierys coming soon query";
    },
    successMessage: "Your query has been sent. We will get back to you soon.",
    errorMessage: "We could not send your query. Please try again.",
  });

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden">
      <GradientWave
        colors={["#ffffff", "#fb7185", "#e879f9", "#a3e635", "#ffffff"]}
        shadowPower={4}
        darkenTop={false}
        noiseFrequency={[0.0001, 0.0002]}
        deform={{ incline: 0.2, noiseAmp: 100, noiseFlow: 2 }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-14 text-center sm:px-10 lg:px-12">
        <h1 className="max-w-4xl font-display text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
          We turn vision into impact with
        </h1>

        <MorphingText
          texts={[...impactWords]}
          className="mt-6 h-[4.5rem] max-w-4xl text-[clamp(2.5rem,10vw,6.8rem)] uppercase tracking-[-0.04em] text-slate-950 md:h-24 lg:h-[7.5rem]"
        />

        <p className="mt-8 text-lg font-medium text-slate-700 sm:text-xl">
          We will be live soon.
        </p>

        <div className="mt-12 w-full max-w-lg rounded-[32px] border border-white/70 bg-white/72 p-6 text-left shadow-[0_24px_60px_rgba(17,24,39,0.08)] backdrop-blur sm:p-8">
          <h2 className="font-display text-center text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
            Have a question or want to connect with us?
          </h2>

          <p className="mt-3 text-base text-center leading-7 text-slate-700">
            Send us your email and message, and we will get back to you soon.
          </p>

          <form
            ref={formRef}
            className="mt-8 space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isSubmitting}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/90 px-4 text-base text-slate-950 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-[rgba(162,180,249,0.35)]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={2}
                required
                disabled={isSubmitting}
                className="w-full rounded-3xl border border-black/10 bg-white/90 px-4 py-3 text-base text-slate-950 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-[rgba(162,180,249,0.35)]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-full px-8 text-base shadow-[0_18px_40px_rgba(18,24,38,0.12)]"
            >
              Send Query
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
