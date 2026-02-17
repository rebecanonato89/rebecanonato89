"use client";

import { useState } from "react";

import { getCopy, type LocaleKey } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  locale: LocaleKey;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

function validate(state: FormState, messages: {
  required: string;
  invalidEmail: string;
}) {
  const errors: FormErrors = {};

  if (!state.name.trim()) {
    errors.name = messages.required;
  }

  if (!state.email.trim()) {
    errors.email = messages.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = messages.invalidEmail;
  }

  if (!state.message.trim()) {
    errors.message = messages.required;
  }

  return errors;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const copy = getCopy(locale);
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(state, copy.validation);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setState(initialState);
    } catch (error) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="surface space-y-5 p-6" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-base-300" htmlFor="name">
            {copy.contact.form.name}
          </label>
          <Input
            id="name"
            name="name"
            value={state.name}
            onChange={onChange("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className="text-xs text-red-400" role="alert">
              {errors.name}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-base-300" htmlFor="email">
            {copy.contact.form.email}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={state.email}
            onChange={onChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span
              id="email-error"
              className="text-xs text-red-400"
              role="alert"
            >
              {errors.email}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-base-300" htmlFor="company">
          {copy.contact.form.company}
        </label>
        <Input
          id="company"
          name="company"
          value={state.company}
          onChange={onChange("company")}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-base-300" htmlFor="message">
          {copy.contact.form.message}
        </label>
        <Textarea
          id="message"
          name="message"
          value={state.message}
          onChange={onChange("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span
            id="message-error"
            className="text-xs text-red-400"
            role="alert"
          >
            {errors.message}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={submitting}>
          {copy.contact.form.submit}
        </Button>
        {status === "success" && (
          <span className="text-sm text-accent-500" role="status">
            {copy.contact.form.success}
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-400" role="alert">
            {copy.contact.form.error}
          </span>
        )}
      </div>
    </form>
  );
}
