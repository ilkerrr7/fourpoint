import { z } from 'zod';

export const SECTOR_OPTIONS = [
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

export const BUDGET_OPTIONS = [
  { value: '5000-alti', label: '₺5.000 ve altı' },
  { value: '5000-15000', label: '₺5.000 – ₺15.000' },
  { value: '15000-30000', label: '₺15.000 – ₺30.000' },
  { value: '30000-50000', label: '₺30.000 – ₺50.000' },
  { value: '50000-ustu', label: '₺50.000 ve üstü' },
  { value: 'bilmiyorum', label: 'Henüz belirlemedim' },
];

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'Adınız en az 2 karakter olmalı').max(50),
  lastName: z.string().min(2, 'Soyadınız en az 2 karakter olmalı').max(50),
  businessName: z.string().min(2, 'İşletme adı en az 2 karakter olmalı').max(100),
  phone: z.string().regex(/^(?:\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, 'Geçerli bir telefon numarası girin'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  sector: z.string().min(1, 'Sektörünüzü seçin'),
  budgetRange: z.string().min(1, 'Bütçe aralığını seçin'),
  message: z.string().max(1000).optional(),
  kvkkConsent: z.boolean().refine((val) => val === true, { message: 'KVKK onayı zorunludur' }),
  _honey: z.string().max(0),
});
