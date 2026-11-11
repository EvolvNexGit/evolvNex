'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

// Existing Google Apps Script endpoint, preserved from the previous site.
const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxCOLa0Nyg0JNQR5rM3tMTKMYE4oWx-q0HdYz5LCxwgtu72t2_-loblv3tegx6e9Vxj/exec'

const INTERESTS = [
  'Website development',
  'Branding',
  'Custom CRM / business system',
  'Food business CRM / POS',
  'Healthcare CRM',
  'WhatsApp / workflow automation',
  'Not sure yet',
]

const fieldClass =
  'w-full rounded-md border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 aria-[invalid=true]:border-destructive'

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-accent-text">
          {error}
        </p>
      )}
    </div>
  )
}

type Values = {
  name: string
  company: string
  email: string
  phone: string
  interest: string
  message: string
  consent: boolean
  website: string // honeypot
}

const empty: Values = {
  name: '',
  company: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
  consent: false,
  website: '',
}

export function ContactForm({ defaultInterest = '' }: { defaultInterest?: string }) {
  const [values, setValues] = useState<Values>({ ...empty, interest: defaultInterest })
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  function validate() {
    const e: Partial<Record<keyof Values, string>> = {}
    if (!values.name.trim()) e.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) e.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10)
      e.message = 'Please tell us a little about what you need (at least a sentence).'
    return e
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (values.website) return // honeypot filled: silently drop
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`field-${Object.keys(e)[0]}`)?.focus()
      return
    }

    setSubmitting(true)
    try {
      const message = [
        values.interest && `Interested in: ${values.interest}`,
        values.message.trim(),
        values.phone.trim() &&
          `Phone: ${values.phone.trim()} (WhatsApp follow-up consent: ${values.consent ? 'yes' : 'no'})`,
      ]
        .filter(Boolean)
        .join('\n\n')

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          budget: '',
          message,
          phone: values.phone.trim(),
          interest: values.interest,
          whatsappConsent: values.consent,
        }),
      })
      const text = await response.text()
      let data: { status?: string }
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('Invalid response from server')
      }
      if (data.status !== 'success') throw new Error('Script error')

      setSent(true)
      setValues(empty)
      toast.success('Message sent. We will get back to you soon.')
    } catch (err) {
      console.error('Submission error:', err)
      toast.error('Could not send your message. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-card p-8"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Thanks, we have your message.</h2>
        <p className="mt-3 text-muted-foreground">
          We will review your requirement and reply by email
          {values.phone ? ' or phone' : ''}. If it is urgent, message us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-accent-text hover:text-foreground"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={submitting}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="field-name" label="Name" error={errors.name}>
          <input
            id="field-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'field-name-error' : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="field-company" label="Business" optional>
          <input
            id="field-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="field-email" label="Email" error={errors.email}>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'field-email-error' : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="field-phone" label="Phone / WhatsApp" optional>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="field-interest" label="What do you need?" optional>
        <select
          id="field-interest"
          name="interest"
          value={values.interest}
          onChange={(e) => set('interest', e.target.value)}
          className={fieldClass}
        >
          <option value="">Select an option</option>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="field-message"
        label="Your requirement"
        error={errors.message}
        hint="A few lines is enough: what you do and what you want to build or fix."
      >
        <textarea
          id="field-message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'field-message-error' : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="field-website">Website</label>
        <input
          id="field-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <input
          id="field-consent"
          type="checkbox"
          checked={values.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className="mt-1 size-5 shrink-0 accent-[#DC2626]"
        />
        <label htmlFor="field-consent" className="text-sm leading-relaxed text-muted-foreground">
          I agree to be contacted on WhatsApp about this enquiry. I can ask to stop at any time by
          replying STOP. Optional; email follow-up does not depend on it.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {submitting ? 'Sending…' : 'Send enquiry'}
      </button>

      <p className="text-xs text-muted-foreground">
        Your details are used only to respond to this enquiry. See our{' '}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy notice
        </Link>
        .
      </p>
    </form>
  )
}
