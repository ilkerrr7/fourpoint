import type { SelectOption } from '@/types';

/**
 * The contact form's select options.
 *
 * These live apart from the zod schema in `@/lib/validations` on purpose.
 * ContactForm is a client component and needs nothing but these two arrays;
 * importing them from the schema module pulled the whole zod runtime into the
 * browser bundle, where its JIT feature probe (`Function("")`) also tripped
 * the Content Security Policy. Validation stays on the server, which is the
 * only place it is trusted anyway.
 */

export const SECTOR_OPTIONS: SelectOption[] = [
  { value: 'e-ticaret', label: 'E-Ticaret' },
  { value: 'restoran-kafe', label: 'Restoran / Kafe' },
  { value: 'saglik', label: 'Sağlık' },
  { value: 'egitim', label: 'Eğitim' },
  { value: 'emlak', label: 'Emlak' },
  { value: 'guzellik', label: 'Güzellik & Bakım' },
  { value: 'hizmet', label: 'Hizmet Sektörü' },
  { value: 'uretim', label: 'Üretim' },
  { value: 'diger', label: 'Diğer' },
];

export const BUDGET_OPTIONS: SelectOption[] = [
  { value: '5000-alti', label: '₺5.000 ve altı' },
  { value: '5000-15000', label: '₺5.000 – ₺15.000' },
  { value: '15000-30000', label: '₺15.000 – ₺30.000' },
  { value: '30000-50000', label: '₺30.000 – ₺50.000' },
  { value: '50000-ustu', label: '₺50.000 ve üstü' },
  { value: 'bilmiyorum', label: 'Henüz belirlemedim' },
];
