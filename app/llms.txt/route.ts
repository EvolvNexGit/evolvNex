import { SITE } from '@/lib/site'
import { POSTS } from '@/lib/blog'

export const dynamic = 'force-static'

export function GET() {
  const body = `# ${SITE.name}

> ${SITE.shortDescription} Remote-first; works with clients online.

## Services
- [Website development](${SITE.url}/services/website-development): responsive, SEO-ready business websites
- [Branding](${SITE.url}/branding): brand identity, logo direction, guidelines
- [CRM & business systems](${SITE.url}/crm): custom CRM for customers, appointments, billing and reporting
- [Food & Beverage CRM/POS](${SITE.url}/crm/food): billing, inventory, memberships and loyalty for cafés and restaurants
- [Healthcare CRM](${SITE.url}/crm/healthcare): appointments, follow-ups and patient records for clinics
- [All services](${SITE.url}/services): includes WhatsApp and workflow automation, SEO foundations

## Work
- [Website showcase](${SITE.url}/work/websites)

## Articles
${POSTS.map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.description}`).join('\n')}

## Company
- [About](${SITE.url}/about)
- [Contact](${SITE.url}/contact): ${SITE.email}, ${SITE.phoneDisplay}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
