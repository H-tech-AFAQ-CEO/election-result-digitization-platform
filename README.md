# ResultDesk

ResultDesk is an election result slip review and data capture workspace developed by **Afaq Ahmad**.

## Overview

The application helps election operations teams upload scanned result slips, review OCR-captured vote values, monitor validation status, and maintain an auditable workflow before exporting approved results.

## Features

- Review queue for captured election result values
- File selection from the computer for PNG, JPG, and PDF result slips
- Upload endpoint for sending selected files to the live intake workflow
- Live database status and polling for current result rows
- Editable vote values during review
- Confidence and validation indicators
- Dedicated pages for every workspace menu:
  - `/review` — review queue
  - `/records` — all results
  - `/upload` — upload slips
  - `/exports` — exports
  - `/rules` — validation rules
  - `/audit` — audit log
  - `/admin` — administration
- Audit-oriented review and approval controls
- Responsive layout for desktop and smaller screens

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Neon Postgres
- Drizzle ORM
- Tailwind CSS
- Lucide icons

## Database

Database access is configured through the Neon integration. The application reads its database connection from the provisioned `DATABASE_URL` environment variable. Result records, vote rows, uploaded slip metadata, and audit information are designed to be stored in Neon rather than browser-only storage.

## Upload workflow

1. Open **Upload slips** from the sidebar or the top-right action.
2. Choose one or more PNG, JPG, or PDF files from the computer.
3. Confirm the selected files in the upload dialog.
4. Select **Upload selected files**.
5. The files are submitted to `/api/results` and the review workspace refreshes from the database.

Each file is validated server-side for supported type and size before it is accepted.

## Running locally

Install dependencies and start the development server with the project package manager:

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Production build

```bash
pnpm build
pnpm start
```

## Project structure

- `app/` — routes, layout, API handlers, and page entry points
- `components/resultdesk-app.tsx` — shared application shell and workspace UI
- `lib/db/` — Drizzle database client and schema
- `public/` — static assets

## Author

**Afaq Ahmad** — Developer of ResultDesk.
