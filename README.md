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
3. In the Vercel dashboard, go to **Storage** and add **Neon** (recommended)
4. Connect the database to your project — Vercel will inject `POSTGRES_URL`
5. Add environment variable: `ADMIN_PASSWORD=your-secret-password`
6. Deploy

The app auto-creates the `messages` table on first request when `POSTGRES_URL` is set.

**Alternative:** connect **Vercel Blob** instead — Vercel injects `BLOB_READ_WRITE_TOKEN` and messages are stored in blob storage.

Without Postgres or Blob, messages cannot be saved on Vercel (local file storage only works in development).

## Environment variables

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Neon/Postgres connection string (recommended; auto-set by Vercel Storage) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (alternative storage; auto-set when Blob is connected) |
| `ADMIN_PASSWORD` | Password for `/admin` dashboard |

## Tech stack

- Next.js 16 (App Router)
- Tailwind CSS
- Framer Motion
- Drizzle ORM + Neon Postgres
- Zod validation

---

Made with love for Younes and family.
