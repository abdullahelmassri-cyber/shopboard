# CLAUDE.md

## Project

ShopBoard is a responsive storefront demo with a searchable catalog, cart, and sign-up form. Registration is not connected to a backend.

## Stack

- Vite, semantic HTML, TypeScript, and CSS. No UI framework.
- Prettier formats the project. ESLint checks JavaScript configuration files, and TypeScript checks application code.
- Husky and lint-staged run on each commit.

## Commands

- `npm run dev`: start the dev server
- `npm run typecheck`: check TypeScript
- `npm run lint`: run ESLint
- `npm run format`: format project files
- `npm run format:check`: check formatting without changes
- `npm run build`: build for production

## Project structure

All application TypeScript modules are in `src/`. The global stylesheet is `style.css` in the repository root.

## Project rules

- Keep `products` in its original order. Filter to a copy before sorting so the default order can be restored.
- Bind DOM events once in `ui.ts`; keep catalog choices in the `state` object in `main.ts` and render through the UI functions.
- Keep DOM access and rendering in `ui.ts`. Catalog and cart operations should not query or update the page.
- Adding an existing product increases its quantity. Decreasing quantity to zero removes the line; quantities must stay positive.
- Treat local-storage data as untrusted: validate each cart item and fall back to an empty cart if reading or parsing fails.
- Use semantic HTML, one `h1`, associated form labels, and native input validation.
- Keep TypeScript strict and do not use `any`, type assertions, or non-null assertions.
