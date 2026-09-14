"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { submitContactForm } from "@/actions/contact-form";
import { Input, Select, Checkbox, Button } from "@/components/ui";
import { SECTOR_OPTIONS, BUDGET_OPTIONS } from "@/lib/validations";
import { trackLead } from "@/lib/meta-pixel-events";
import type { FormActionResult } from "@/types";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormActionResult | null, FormData>(
    submitContactForm,
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle successful submission
  useEffect(() => {
    if (state?.success && state.message.startsWith("__eventId:")) {
      const eventId = state.message.replace("__eventId:", "");
      // Fire client-side pixel event with matching event_id
      trackLead(eventId);
      setIsSuccess(true);
    }
  }, [state]);

  if (isSuccess) {
    return (
      <div
        className="rounded-[1rem] bg-surface border border-deep/50 p-8 md:p-12 text-center"
        role="alert"
        id="form-success"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-6 flex items-center justify-center">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-fg mb-3">
          Mesajınız İletildi
        </h3>
        <p className="text-fg-muted max-w-md mx-auto">
          En kısa sürede sizinle iletişime geçeceğiz. Genellikle 24 saat
          içinde dönüş yapıyoruz.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-[1rem] bg-surface border border-deep/50 p-6 md:p-8 space-y-5"
      id="contact-form"
      noValidate
    >
      {/* Honeypot — invisible to users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_honey">Lütfen doldurmayın</label>
        <input
          type="text"
          id="_honey"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Ad"
          id="firstName"
          name="firstName"
          placeholder="Adınız"
          required
          error={state?.errors?.firstName}
        />
        <Input
          label="Soyad"
          id="lastName"
          name="lastName"
          placeholder="Soyadınız"
          required
          error={state?.errors?.lastName}
        />
      </div>

      {/* Business name */}
      <Input
        label="İşletme Adı"
        id="businessName"
        name="businessName"
        placeholder="İşletmenizin adı"
        required
        error={state?.errors?.businessName}
      />

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Telefon"
          id="phone"
          name="phone"
          type="tel"
          placeholder="05XX XXX XX XX"
          required
          error={state?.errors?.phone}
        />
        <Input
          label="E-posta"
          id="email"
          name="email"
          type="email"
          placeholder="ornek@email.com"
          required
          error={state?.errors?.email}
        />
      </div>

      {/* Select fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Sektör"
          id="sector"
          name="sector"
          options={SECTOR_OPTIONS}
          placeholder="Sektörünüzü seçin"
          required
          error={state?.errors?.sector}
        />
        <Select
          label="Aylık Reklam Bütçesi"
          id="budgetRange"
          name="budgetRange"
          options={BUDGET_OPTIONS}
          placeholder="Bütçe aralığı seçin"
          required
          error={state?.errors?.budgetRange}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm text-fg-muted mb-1.5"
        >
          Mesaj{" "}
          <span className="text-fg-subtle">(opsiyonel)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Eklemek istediğiniz bir şey varsa yazabilirsiniz..."
          className="w-full bg-surface border border-deep/50 rounded-[0.625rem] px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition resize-none"
        />
        {state?.errors?.message && (
          <p className="text-red-400 text-sm mt-1">{state.errors.message}</p>
        )}
      </div>

      {/* KVKK Consent */}
      <Checkbox
        id="kvkkConsent"
        name="kvkkConsent"
        required
        label={
          <span>
            <Link
              href="/kvkk"
              target="_blank"
              className="text-primary hover:underline"
            >
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
          </span>
        }
        error={state?.errors?.kvkkConsent}
      />

      {/* General error message */}
      {state && !state.success && !state.message.startsWith("__eventId:") && (
        <div
          className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm"
          role="alert"
        >
          {state.message}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Gönderiliyor…
          </span>
        ) : (
          "Ücretsiz Görüşme Al"
        )}
      </Button>
    </form>
  );
}
