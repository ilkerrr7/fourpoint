/* =============================================
   Fourpoint — Shared TypeScript Types
   ============================================= */

/** Contact form field values */
export interface ContactFormData {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  sector: string;
  budgetRange: string;
  message: string;
  kvkkConsent: boolean;
  /** Honeypot — must remain empty */
  _honey: string;
}

/** Server action response */
export interface FormActionResult {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string>>;
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
}

/** Service card data */
export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

/** Process step data */
export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

/** FAQ item data */
export interface FAQItem {
  question: string;
  answer: string;
}

/** Pain point card data */
export interface PainPoint {
  emoji: string;
  text: string;
}

/** Differentiator item */
export interface Differentiator {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** Pricing logic card */
export interface PricingCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** Sector select option */
export interface SelectOption {
  value: string;
  label: string;
}
