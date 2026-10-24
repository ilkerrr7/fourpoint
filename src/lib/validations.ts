import { z } from 'zod';

// Re-exported so existing imports of the option lists keep working; they are
// defined without zod so the client bundle can take them alone.
export { SECTOR_OPTIONS, BUDGET_OPTIONS } from '@/lib/form-options';

/**
 * Names and the business name end up in an email subject and in a WhatsApp
 * message, one field per line. Newlines and control characters have no place
 * in any of them, so they are rejected at the edge rather than stripped
 * later: the visitor gets told, and every downstream consumer gets a value it
 * can trust. Letters stay unrestricted — Turkish, accents and apostrophes all
 * belong in real names.
 */
const NO_CONTROL_CHARS = /^[^\r\n\t\u0000-\u001F\u007F]+$/;
const CONTROL_CHAR_MESSAGE = 'Bu alanda satır sonu veya özel karakter kullanılamaz';

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'Adınız en az 2 karakter olmalı').max(50).regex(NO_CONTROL_CHARS, CONTROL_CHAR_MESSAGE),
  lastName: z.string().min(2, 'Soyadınız en az 2 karakter olmalı').max(50).regex(NO_CONTROL_CHARS, CONTROL_CHAR_MESSAGE),
  businessName: z.string().min(2, 'İşletme adı en az 2 karakter olmalı').max(100).regex(NO_CONTROL_CHARS, CONTROL_CHAR_MESSAGE),
  phone: z.string().regex(/^(?:\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, 'Geçerli bir telefon numarası girin'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  sector: z.string().min(1, 'Sektörünüzü seçin'),
  budgetRange: z.string().min(1, 'Bütçe aralığını seçin'),
  message: z.string().max(1000).optional(),
  kvkkConsent: z.boolean().refine((val) => val === true, { message: 'KVKK onayı zorunludur' }),
  _honey: z.string().max(0),
});
