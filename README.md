# Younes Celebration App

A bilingual (Arabic/English) celebration website for baby **Younes (يونس)**, born July 9, 2026.

Features:
- Beautiful hero section with baby icon and confetti
- Infinite scrolling message cards from family and friends
- Guestbook form — messages appear instantly
- Admin dashboard at `/admin` to view all messages
- Ready for Vercel deployment

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server — **no database required for local testing**:

```bash
npm run dev
```

Messages are saved automatically to `data/messages.json` on your machine when no Postgres URL is configured.

3. **Optional — for production on Vercel**, set up Postgres:
   - Create a database at [neon.tech](https://neon.tech)
   - Copy the connection string into `POSTGRES_URL` in `.env.local`
   - Set `ADMIN_PASSWORD` to your chosen dashboard password

4. Push the database schema:

```bash
npm run db:push
```

5. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the celebration page.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the messages dashboard.

## Deploy to Vercel

1. Push this project to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. In the Vercel dashboard, go to **Storage** and add **Neon** (or Postgres)
4. Connect the database to your project — Vercel will inject `POSTGRES_URL`
5. Add environment variable: `ADMIN_PASSWORD=your-secret-password`
6. Deploy
7. After first deploy, run the schema push from your machine (with production `POSTGRES_URL`):

```bash
npm run db:push
```

Or run it once via Vercel CLI / a one-off command.

## Environment variables

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Neon/Postgres connection string (auto-set by Vercel Storage) |
| `ADMIN_PASSWORD` | Password for `/admin` dashboard |

## Tech stack

- Next.js 16 (App Router)
- Tailwind CSS
- Framer Motion
- Drizzle ORM + Neon Postgres
- Zod validation

---

Made with love for Younes and family.
