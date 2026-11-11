/**
 * Launch articles. Each answers one buyer question and links to one service page.
 * Content is general guidance only: no client results, statistics or medical advice.
 * TODO (business): review and approve each article before promoting it.
 */
export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type Post = {
  slug: string
  title: string
  description: string
  category: string // slug of CATEGORIES
  published: string // ISO date
  updated?: string
  readMinutes: number
  service: { label: string; href: string }
  body: Block[]
}

export const CATEGORIES = [
  { slug: 'websites', name: 'Websites', description: 'Practical guidance on business websites.' },
  { slug: 'food-business', name: 'Food business', description: 'Billing, inventory and customers for cafés and restaurants.' },
  { slug: 'automation', name: 'Automation', description: 'WhatsApp, reminders and workflow automation.' },
]

export const POSTS: Post[] = [
  {
    slug: 'what-should-a-business-website-include',
    title: 'What Should a Business Website Include in 2026?',
    description:
      'A practical checklist of what a small or growing business website needs: clear offer, contact path, trust signals, mobile layout and search basics.',
    category: 'websites',
    published: '2026-11-12',
    readMinutes: 4,
    service: { label: 'Business website development', href: '/services/website-development' },
    body: [
      { type: 'p', text: 'A business website does one job before any other: it helps a visitor understand what you do and what to do next. Everything else supports that. Here is what is worth including.' },
      { type: 'h2', text: '1. A clear statement of what you offer' },
      { type: 'p', text: 'Within a few seconds a visitor should know what the business does, who it is for and where it operates or serves. Put this at the top of the homepage in plain language, not slogans.' },
      { type: 'h2', text: '2. One obvious next step' },
      { type: 'p', text: 'Decide the main action you want: enquire, book, call or buy. Make that action easy to find on every page, and keep forms short. Ask only for what you need to reply.' },
      { type: 'h2', text: '3. Pages for each thing you sell' },
      { type: 'p', text: 'If you offer several services, give each one its own page. Visitors can find the right one, and search engines can understand each offer separately.' },
      { type: 'h2', text: '4. Real proof' },
      { type: 'ul', items: ['Photos of real work or products', 'Testimonials you have permission to publish', 'Clear contact details and how you work'] },
      { type: 'p', text: 'Avoid invented numbers or vague claims. A few honest, specific details build more trust than big promises.' },
      { type: 'h2', text: '5. A layout that works on phones' },
      { type: 'p', text: 'Many visitors will arrive on a phone. Text should be readable without zooming, buttons easy to tap and pages quick to load.' },
      { type: 'h2', text: '6. Search basics' },
      { type: 'ul', items: ['A unique title and description for each page', 'One main heading per page', 'Descriptive link text', 'A sitemap and fast-loading pages'] },
      { type: 'p', text: 'These foundations help search engines understand your site. They do not guarantee rankings, but without them it is harder to be found at all.' },
    ],
  },
  {
    slug: 'cafe-billing-inventory-customer-records',
    title: 'How a Café Can Organize Billing, Inventory and Customer Records',
    description:
      'Billing, stock and customer details often live in separate places. Here is how a café can bring them together and what to look for in a system.',
    category: 'food-business',
    published: '2026-11-12',
    readMinutes: 5,
    service: { label: 'Food business CRM and POS systems', href: '/crm/food' },
    body: [
      { type: 'p', text: 'Many cafés start with a basic billing machine, a notebook for stock and a phone full of regular customers’ numbers. It works until it does not: stock runs out unexpectedly, you cannot tell which items sell best, and you have no way to reward repeat customers.' },
      { type: 'h2', text: 'Start with billing and products' },
      { type: 'p', text: 'Every sale should record what was sold and for how much. When your product list and prices live in one place, billing is faster and your records are consistent.' },
      { type: 'h2', text: 'Connect stock to what you sell' },
      { type: 'p', text: 'Inventory is easiest to manage when it is linked to products. If selling an item reduces its stock, you can see what is running low without a manual count every day. Decide early which items you want to track closely.' },
      { type: 'h2', text: 'Keep a simple customer record' },
      { type: 'p', text: 'Even a basic record of who bought what, and how often, helps you recognise regulars and plan offers. Collect only the details you need, and tell customers how you will use them.' },
      { type: 'h2', text: 'Add memberships or loyalty only when ready' },
      { type: 'ul', items: ['Decide what a regular customer earns', 'Keep rules simple enough for staff to explain', 'Make sure the system can track it without manual work'] },
      { type: 'h2', text: 'What to look for in a system' },
      { type: 'ul', items: ['Billing that staff can use quickly at the counter', 'Products and stock in the same place', 'Customer history you can search', 'Clarity on which features exist today and which are custom work'] },
      { type: 'p', text: 'If a ready-made tool covers your needs, use it. If your workflow is specific, a purpose-built system may be worth discussing.' },
    ],
  },
  {
    slug: 'whatsapp-integration-reminders-follow-ups-consent',
    title: 'WhatsApp Integration for Businesses: Reminders, Follow-Ups and Consent',
    description:
      'WhatsApp can handle reminders and follow-ups, but consent and opt-out matter. A plain-language overview for business owners.',
    category: 'automation',
    published: '2026-11-12',
    readMinutes: 4,
    service: { label: 'WhatsApp and workflow automation', href: '/services#automation' },
    body: [
      { type: 'p', text: 'Customers read WhatsApp messages, so it is a natural channel for appointment reminders and follow-ups. Used carelessly, though, it can annoy people or break platform rules. This is a general overview, not legal advice.' },
      { type: 'h2', text: 'Good uses for WhatsApp messaging' },
      { type: 'ul', items: ['Appointment reminders', 'Follow-up after an enquiry or visit', 'Order or booking updates the customer expects'] },
      { type: 'h2', text: 'Get consent first' },
      { type: 'p', text: 'Only message people who have agreed to be contacted on WhatsApp. Collect that agreement clearly, for example with a tick box on your enquiry form that explains what you will send.' },
      { type: 'h2', text: 'Make opting out easy' },
      { type: 'p', text: 'Tell people how to stop receiving messages, such as replying STOP, and honour that request promptly. Keep a record of who has opted out so automation never messages them again.' },
      { type: 'h2', text: 'Know how the integration works' },
      { type: 'p', text: 'WhatsApp business messaging has its own rules, including approved message templates for messages sent outside an ongoing conversation. Ask whoever builds your integration how it is connected, what templates are needed and how opt-outs are handled.' },
      { type: 'h2', text: 'Keep messages useful' },
      { type: 'p', text: 'Short, relevant messages that help the customer, such as a time, place or next step, are more welcome than promotional broadcasts.' },
    ],
  },
]

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug)
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
