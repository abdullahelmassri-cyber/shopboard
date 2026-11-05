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

All application TypeScript modules are in `src/`: `data.ts`, `logic.ts`, `state.ts`, `ui.ts`, `main.ts`, and `types.ts`. The global stylesheet is `style.css` in the repository root.

## Architecture

- `data.ts` may define and export the ordered product data. It may not contain application logic, DOM access, or storage access.
- `logic.ts` may contain pure catalog and cart functions, including validation of saved cart data. It may not access the DOM, browser globals, or storage, and must not mutate input data.
- `state.ts` may own the current cart and load or save it with local storage by calling `logic.ts`. It may not access the DOM or render content.
- `ui.ts` may access and update the DOM, render content, show toasts, and bind event listeners once. It may not own catalog or cart state or implement catalog and cart calculations.
- `main.ts` may connect the other modules and own catalog choices in its state object. It may not access the DOM or storage or implement catalog and cart calculations.
- `types.ts` contains shared type declarations only.

## Project rules

- Keep `products` in its original order. Filter to a copy before sorting so the default order can be restored.
- Bind DOM events once in `ui.ts`; keep catalog choices in the `state` object in `main.ts` and render through the UI functions.
- Keep DOM access and rendering in `ui.ts`. Catalog and cart operations in `logic.ts` and `state.ts` should not query or update the page.
- Adding an existing product increases its quantity. Decreasing quantity to zero removes the line; quantities must stay positive.
- Treat local-storage data as untrusted: validate each cart item and fall back to an empty cart if reading or parsing fails.
- Use semantic HTML, one `h1`, associated form labels, and native input validation.
- Keep TypeScript strict and do not use `any`, type assertions, or non-null assertions.
