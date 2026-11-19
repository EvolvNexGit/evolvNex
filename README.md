# v0-evolvnex

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_0DJKpmfHxCgRPLpjuaVSg4PX9MlV)

## Contact form

The form posts to `/api/contact` (`app/api/contact/route.ts`), which validates the input, rate-limits it
and forwards it server-side to the Google Apps Script. All environment variables are optional:

| Variable | Purpose |
|---|---|
| `CONTACT_WEBHOOK_URL` | Apps Script URL. Falls back to the legacy URL in the route until set. Set it, then rotate the old deployment. |
| `CONTACT_WEBHOOK_SECRET` | Sent to the Apps Script as `secret`; make the script reject requests without it. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | Enable Cloudflare Turnstile CAPTCHA (set both). |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Shared rate-limit store. Without it limits are per server instance only. |

Limits: 5 submissions per IP per 10 minutes, 100 per hour site-wide, 16 KB request body.

## Security headers

Set in `next.config.mjs` (production only). Frame protection, HSTS and `nosniff` are enforced.
The full Content-Security-Policy is **report-only**: watch the browser console for violations, then
move it to an enforced `Content-Security-Policy` header.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/Avishek-works/v0-evolvnex" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
