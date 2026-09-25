"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitContactForm } from "@/actions/contact-form";
import { Input, Select, Checkbox, Button } from "@/components/ui";
import { SECTOR_OPTIONS, BUDGET_OPTIONS } from "@/lib/validations";
import { trackLead } from "@/lib/meta-pixel-events";
import type { FormActionResult } from "@/types";

const SERVICE_OPTIONS = [
  { value: "instagram", label: "Instagram Reklam Yönetimi" },
  { value: "facebook", label: "Facebook Reklam Yönetimi" },
  { value: "retargeting", label: "Retargeting" },
  { value: "raporlama", label: "Raporlama ve Analiz" },
  { value: "icerik", label: "İçerik Çekimi / Prodüksiyon" },
  { value: "emin-degilim", label: "Emin değilim / Görüşelim" },
];

const STEP_LABELS = ["İşletme", "İhtiyaç", "Bütçe", "İletişim"];
const TOTAL_STEPS = STEP_LABELS.length;

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormActionResult | null, FormData>(
    submitContactForm,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [note, setNote] = useState("");

  // Derived from server response, not synced via effect — see set-state-in-effect lint rule.
  const isSuccess = Boolean(state?.success && state.message.startsWith("__eventId:"));

  useEffect(() => {
    if (isSuccess && state) {
      const eventId = state.message.replace("__eventId:", "");
      trackLead(eventId);
    }
  }, [isSuccess, state]);

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
        <h3 className="font-heading text-22 font-bold text-fg mb-3">
          Mesajınız İletildi
        </h3>
        <p className="text-fg-muted max-w-md mx-auto">
          En kısa sürede sizinle iletişime geçeceğiz. Genellikle 24 saat
          içinde dönüş yapıyoruz.
        </p>
      </div>
    );
  }

  const serviceLabel = SERVICE_OPTIONS.find((opt) => opt.value === service)?.label ?? "";
  const message = serviceLabel
    ? `İlgilenilen hizmet: ${serviceLabel}${note.trim() ? ` — Not: ${note.trim()}` : ""}`
    : "";

  const goToStep = (target: number) => setStep(Math.min(TOTAL_STEPS, Math.max(1, target)));

  const goNext = () => {
    const stepEl = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
    const invalid = stepEl?.querySelector<HTMLInputElement | HTMLSelectElement>(":invalid");
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    goToStep(step + 1);
  };

  const goBack = () => goToStep(step - 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === "Enter" && step < TOTAL_STEPS && target.tagName !== "TEXTAREA") {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onKeyDown={handleKeyDown}
      className="rounded-[1rem] bg-surface border border-deep/50 p-6 md:p-8 space-y-6"
      id="contact-form"
      noValidate={false}
    >
      {/* Honeypot — invisible to users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_honey">Lütfen doldurmayın</label>
        <input type="text" id="_honey" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-12 font-medium uppercase tracking-[0.14em] text-fg-subtle">
            0{step} / 0{TOTAL_STEPS} — {STEP_LABELS[step - 1]}
          </span>
        </div>
        <div className="h-px bg-deep relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-500 ease-[var(--ease-out-expo)]"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1 — İşletme */}
      <div data-step={1} hidden={step !== 1} className="space-y-5">
        <Input
          label="İşletme Adı"
          id="businessName"
          name="businessName"
          placeholder="İşletmenizin adı"
          required
          error={state?.errors?.businessName}
        />
        <Select
          label="Sektör"
          id="sector"
          name="sector"
          options={SECTOR_OPTIONS}
          placeholder="Sektörünüzü seçin"
          required
          error={state?.errors?.sector}
        />
      </div>

      {/* Step 2 — İhtiyaç */}
      <div data-step={2} hidden={step !== 2} className="space-y-3">
        <p className="text-14 text-fg-muted mb-1">İhtiyacınız ne?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="relative block border border-deep rounded-[var(--radius-button)] p-4 cursor-pointer transition-colors has-checked:border-fg has-checked:bg-elevated"
            >
              <input
                type="radio"
                name="service"
                value={opt.value}
                checked={service === opt.value}
                onChange={() => setService(opt.value)}
                required
                className="absolute inset-0 w-full h-full appearance-none bg-transparent border-0 m-0 p-0 cursor-pointer"
              />
              <span className="text-14 text-fg">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Step 3 — Bütçe */}
      <div data-step={3} hidden={step !== 3} className="space-y-5">
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

      {/* Step 4 — İletişim */}
      <div data-step={4} hidden={step !== 4} className="space-y-5">
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

        <div>
          <label htmlFor="note" className="block text-14 text-fg-muted mb-1.5">
            Not <span className="text-fg-subtle">(opsiyonel)</span>
          </label>
          <textarea
            id="note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir şey varsa yazabilirsiniz..."
            className="w-full bg-surface border border-deep rounded-[var(--radius-button)] px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition resize-none"
          />
        </div>
        <input type="hidden" name="message" value={message} readOnly />

        <Checkbox
          id="kvkkConsent"
          name="kvkkConsent"
          required
          label={
            <span>
              <Link href="/kvkk" target="_blank" className="text-primary hover:underline">
                KVKK Aydınlatma Metni
              </Link>
              ’ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
            </span>
          }
          error={state?.errors?.kvkkConsent}
        />

        {/* General error message */}
        {state && !state.success && !state.message.startsWith("__eventId:") && (
          <div
            className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-14"
            role="alert"
          >
            {state.message}
          </div>
        )}
      </div>

      {/* Step navigation */}
      <div className="flex items-center justify-between pt-2">
        {step > 1 ? (
          <Button type="button" variant="ghost" size="md" onClick={goBack}>
            ← Geri
          </Button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <Button type="button" variant="secondary" size="md" onClick={goNext}>
            İleri →
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="lg" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
        )}
      </div>
    </form>
  );
}
