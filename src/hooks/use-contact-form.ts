import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export const CONTACT_FORM_ACTION =
  "https://api.rootsbmd.com/public/SaveContactForm";
export const CONTACT_FORM_EMAIL_TO = "wasif@rootsbmd.com";

type ContactFormValues = Record<string, string>;

type ContactFormSuccessPayload = {
  response: unknown;
  values: ContactFormValues;
};

type ContactFormError = Error & {
  response?: Response;
  responsePayload?: {
    message?: string;
    status?: boolean;
  } | null;
};

type UseContactFormOptions = {
  buildSubject?: (formData: FormData) => string;
  successMessage?: string;
  errorMessage?: string;
  getErrorMessage?: (error: unknown) => string;
  onSuccess?: (payload: ContactFormSuccessPayload) => void;
  onError?: (error: unknown) => void;
};

function toContactFormValues(formData: FormData): ContactFormValues {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
  );
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const {
    buildSubject,
    successMessage = "Form submitted successfully.",
    errorMessage = "Submission failed. Please try again.",
    getErrorMessage,
    onSuccess,
    onError,
  } = options;

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!formRef.current || isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        const formData = new FormData(formRef.current);
        const subject =
          typeof buildSubject === "function"
            ? buildSubject(formData)
            : "Hierys coming soon query";

        formData.set("email_to", CONTACT_FORM_EMAIL_TO);
        formData.set("subject", subject);

        const response = await fetch(CONTACT_FORM_ACTION, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        const responsePayload = (await response.json().catch(() => null)) as
          | ContactFormError["responsePayload"]
          | null;

        if (!response.ok || responsePayload?.status === false) {
          const submissionError = new Error(
            responsePayload?.message || "Request failed",
          ) as ContactFormError;
          submissionError.response = response;
          submissionError.responsePayload = responsePayload;
          throw submissionError;
        }

        const values = toContactFormValues(formData);

        formRef.current.reset();
        toast.success(successMessage);
        onSuccess?.({ response: responsePayload, values });
      } catch (error) {
        const nextErrorMessage =
          typeof getErrorMessage === "function"
            ? getErrorMessage(error)
            : errorMessage;

        toast.error(nextErrorMessage);
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      buildSubject,
      errorMessage,
      getErrorMessage,
      isSubmitting,
      onError,
      onSuccess,
      successMessage,
    ],
  );

  return {
    formRef,
    handleSubmit,
    isSubmitting,
  };
}
