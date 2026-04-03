import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { ArrowDown, ArrowLeft, X } from "lucide-react";

import {
  START_HERE_LOCATION_OPTIONS,
  START_HERE_STEPS,
  type StartHereChoiceStep,
  type StartHereSelectionKey,
  type StartHereStep,
} from "@/components/homepage/start-here/startHereData";
import styles from "@/components/homepage/start-here/StartHereFlow.module.css";
import { useContactForm } from "@/hooks/use-contact-form";
import { cn } from "@/lib/utils";

type StartHereFlowProps = {
  onClose: () => void;
  onComplete: () => void;
};

type StartHereResponses = {
  services: string[];
  clientType: string;
  projectGoal: string[];
  timeline: string;
  deliverable: string;
};

const INITIAL_RESPONSES: StartHereResponses = {
  services: [],
  clientType: "",
  projectGoal: [],
  timeline: "",
  deliverable: "",
};

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

function isChoiceStep(step: StartHereStep): step is StartHereChoiceStep {
  return step.kind === "choice";
}

function getChoiceValue(
  responses: StartHereResponses,
  key: StartHereSelectionKey,
): string | string[] {
  return responses[key];
}

export default function StartHereFlow({
  onClose,
  onComplete,
}: StartHereFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [responses, setResponses] = useState<StartHereResponses>(INITIAL_RESPONSES);
  const currentStep = START_HERE_STEPS[stepIndex]!;

  const themeStyle = useMemo<ThemeStyle>(
    () => ({
      "--wizard-bg": currentStep.theme.background,
      "--wizard-text": currentStep.theme.text,
      "--wizard-muted": currentStep.theme.mutedText,
      "--wizard-chip-bg": currentStep.theme.chipBg,
      "--wizard-chip-text": currentStep.theme.chipText,
      "--wizard-chip-selected-bg": currentStep.theme.chipSelectedBg,
      "--wizard-chip-selected-text": currentStep.theme.chipSelectedText,
      "--wizard-button-bg": currentStep.theme.buttonBg,
      "--wizard-button-text": currentStep.theme.buttonText,
      "--wizard-button-icon-bg": currentStep.theme.buttonIconBg,
      "--wizard-button-icon-text": currentStep.theme.buttonIconText,
      "--wizard-sticker-bg": currentStep.theme.stickerBg,
      "--wizard-sticker-text": currentStep.theme.stickerText,
      "--wizard-input-bg": currentStep.theme.inputBg ?? "rgba(255, 255, 255, 0.15)",
      "--wizard-input-text": currentStep.theme.inputText ?? currentStep.theme.text,
      "--wizard-input-placeholder":
        currentStep.theme.inputPlaceholder ?? "rgba(255, 255, 255, 0.55)",
      "--wizard-input-border":
        currentStep.theme.inputBorder ?? "rgba(255, 255, 255, 0.08)",
    }),
    [currentStep],
  );

  const { formRef, handleSubmit, isSubmitting } = useContactForm({
    buildSubject: (formData) => {
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const services = responses.services.join(", ");

      const identity = name || email || "unknown contact";
      return `Hierys project brief from ${identity}${services ? ` - ${services}` : ""}`;
    },
    successMessage: "Thanks. Your brief has been submitted.",
    errorMessage: "Your brief could not be submitted. Please try again.",
    onSuccess: () => {
      onComplete();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  useEffect(() => {
    document.body.classList.add("start-here-open");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("start-here-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const currentStepComplete = useMemo(() => {
    if (!isChoiceStep(currentStep)) {
      return true;
    }

    const currentValue = getChoiceValue(responses, currentStep.id);

    if (Array.isArray(currentValue)) {
      return currentValue.length > 0;
    }

    return currentValue.trim().length > 0;
  }, [currentStep, responses]);

  const handleOptionSelect = (option: string) => {
    if (!isChoiceStep(currentStep)) {
      return;
    }

    setResponses((currentResponses) => {
      if (currentStep.selectionMode === "multi") {
        const currentValues = currentResponses[currentStep.id] as string[];
        const hasOption = currentValues.includes(option);

        return {
          ...currentResponses,
          [currentStep.id]: hasOption
            ? currentValues.filter((item) => item !== option)
            : [...currentValues, option],
        };
      }

      return {
        ...currentResponses,
        [currentStep.id]: option,
      };
    });
  };

  const handleNext = () => {
    if (!currentStepComplete) {
      return;
    }

    setStepIndex((currentIndex) =>
      Math.min(currentIndex + 1, START_HERE_STEPS.length - 1),
    );
  };

  const handleBack = () => {
    setStepIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  return (
    <section
      aria-label="Start here project brief flow"
      aria-modal="true"
      className={styles.overlay}
      onTouchMoveCapture={(event) => {
        event.stopPropagation();
      }}
      onWheelCapture={(event) => {
        event.stopPropagation();
      }}
      role="dialog"
      style={themeStyle}
    >
      <div className={styles.panel}>
        <div className={styles.topBar}>
          <button
            className={cn(styles.iconButton, stepIndex === 0 && styles.iconButtonHidden)}
            onClick={handleBack}
            type="button"
          >
            <ArrowLeft />
          </button>

          <button className={styles.iconButton} onClick={onClose} type="button">
            <X />
          </button>
        </div>

        <div className={styles.content} key={currentStep.id}>
          <span className={styles.sticker}>{currentStep.stepLabel}</span>

          <header className={styles.header}>
            <h2 className={cn(styles.heading, "u-displayHeading")}>
              {currentStep.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className={styles.description}>{currentStep.description}</p>
          </header>

          {isChoiceStep(currentStep) ? (
            <>
              <div className={styles.optionWrap}>
                <div className={styles.optionGrid}>
                  {currentStep.options.map((option) => {
                    const selectedValue = getChoiceValue(responses, currentStep.id);
                    const isSelected = Array.isArray(selectedValue)
                      ? selectedValue.includes(option)
                      : selectedValue === option;

                    return (
                      <button
                        aria-pressed={isSelected}
                        className={cn(styles.option, isSelected && styles.optionSelected)}
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        type="button"
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.actionRow}>
                <button
                  className={cn(styles.primaryAction, "u-iconSwapTrigger")}
                  disabled={!currentStepComplete}
                  onClick={handleNext}
                  type="button"
                >
                  <span className={styles.primaryActionLabel}>Next</span>
                  <span className={cn(styles.primaryActionIcon, "u-iconSwap")} aria-hidden="true">
                    <span className="u-iconSwap__a">
                      <ArrowDown />
                    </span>
                    <span className="u-iconSwap__b">
                      <ArrowDown />
                    </span>
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className={styles.formWrap}>
              <form
                ref={formRef}
                className={styles.form}
                onSubmit={handleSubmit}
              >
                <input name="services" type="hidden" value={responses.services.join(", ")} />
                <input name="client_type" type="hidden" value={responses.clientType} />
                <input
                  name="project_goal"
                  type="hidden"
                  value={responses.projectGoal.join(", ")}
                />
                <input name="timeline" type="hidden" value={responses.timeline} />
                <input name="deliverable" type="hidden" value={responses.deliverable} />

                <div className={styles.rowSingle}>
                  <input
                    className={styles.input}
                    disabled={isSubmitting}
                    name="name"
                    placeholder="Full Name*"
                    required
                    type="text"
                  />
                </div>

                <div className={styles.rowDouble}>
                  <input
                    className={styles.input}
                    disabled={isSubmitting}
                    name="email"
                    placeholder="Email*"
                    required
                    type="email"
                  />
                  <input
                    className={styles.input}
                    disabled={isSubmitting}
                    name="phone"
                    placeholder="Phone*"
                    required
                    type="tel"
                  />
                </div>

                <div className={styles.rowTriple}>
                  <input
                    className={styles.input}
                    disabled={isSubmitting}
                    name="company"
                    placeholder="Company*"
                    required
                    type="text"
                  />
                  <input
                    className={styles.input}
                    disabled={isSubmitting}
                    name="industry"
                    placeholder="Industry*"
                    required
                    type="text"
                  />
                  <select
                    className={styles.input}
                    defaultValue=""
                    disabled={isSubmitting}
                    name="location"
                    required
                  >
                    <option disabled value="">
                      Location*
                    </option>
                    {START_HERE_LOCATION_OPTIONS.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  className={cn(styles.input, styles.textarea)}
                  disabled={isSubmitting}
                  name="message"
                  placeholder="Message (optional)"
                  rows={6}
                />

                <div className={styles.actionRow}>
                  <button
                    className={cn(styles.primaryAction, "u-iconSwapTrigger")}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <span className={styles.primaryActionLabel}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </span>
                    <span className={cn(styles.primaryActionIcon, "u-iconSwap")} aria-hidden="true">
                      <span className="u-iconSwap__a">
                        <ArrowDown />
                      </span>
                      <span className="u-iconSwap__b">
                        <ArrowDown />
                      </span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
