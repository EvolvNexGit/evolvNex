/** Constants shared by the contact form (client) and /api/contact (server). No dependencies. */

export const INTERESTS = [
  'Website development',
  'Branding',
  'Custom CRM / business system',
  'Food business CRM / POS',
  'Healthcare CRM',
  'WhatsApp / workflow automation',
  'Not sure yet',
] as const

export const LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 30,
  message: 4000,
  token: 2048,
  /** Max request body in bytes. A full-length message is ~4 KB, so 16 KB is generous. */
  body: 16 * 1024,
} as const
