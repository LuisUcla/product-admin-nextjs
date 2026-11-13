# Project Memory

Last updated: 2026-11-12

## Project overview

- Next.js App Router project for a product-admin application.
- TypeScript, React, Tailwind CSS, Firebase Authentication.
- Package manager: pnpm (`pnpm@12.3.4`).
- Main scripts: `pnpm dev`, `pnpm build`, `pnpm lint`.

## Current authentication structure

- `app/(auth)/layout.tsx` provides the shared layout for authentication pages.
- `app/(auth)/page.tsx` renders the sign-in form at `/`.
- `app/(auth)/sign-up/page.tsx` renders account creation at `/sign-up`.
- `app/(auth)/forgot-password/page.tsx` is an informational placeholder; password reset is not implemented.
- `app/(auth)/components/login-form.tsx` handles sign-in.
- `app/(auth)/sign-up/components/sign-up.form.tsx` creates a Firebase Auth user, sets the display name, and navigates to `/`.
- `lib/firebase.ts` initializes Firebase and contains the authentication operations.
- `lib/toast.ts` exports reusable `showToast` and `showErrorToast` functions. Keep toast presentation centralized there.
- `app/layout.tsx` mounts the shared `react-hot-toast` `Toaster`.

## Recent decisions and conventions

- Form validation uses Zod with React Hook Form; keep schemas and inferred form types outside the component when practical.
- Use React Hook Form's `formState.isSubmitting` for submission state instead of maintaining duplicate local loading state.
- Keep form errors associated with their inputs using `aria-invalid` and `aria-describedby`.
- The sign-in route is `/`; do not link to a nonexistent `/sign-in` route.
- Commit messages follow the repository's existing `<type>: <description>` style (for example, `refactor: ...`).
- The last commit, `5342951`, refactored the authentication UI and reusable toast helpers and was pushed to `origin/develop`.

## Known gaps

- Password recovery is not implemented; the page explicitly explains that it is unavailable.
- Sign-in currently does not perform an explicit post-authentication redirect.
- Validation/build was not confirmed for the recent refactor; run `pnpm lint` and `pnpm build` when practical.

## Guidance for future changes

- Before changing Next.js code, read the relevant guide under `node_modules/next/dist/docs/`; this repository uses a version with project-specific breaking changes.
- Keep changes surgical and preserve existing user changes.
- Do not commit or push unless requested.
- Review the working tree before staging or committing.
- When requested to publish work, push it to `develop` and open a PR targeting `main`; never approve PRs. The user reviews and approves PRs.
