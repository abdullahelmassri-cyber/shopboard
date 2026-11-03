# ShopBoard

ShopBoard is a responsive storefront demo built with Vite, TypeScript, semantic HTML, and CSS. It includes a searchable product catalog, category and price filters, and a shopping cart saved in browser local storage.

The sign-up form demonstrates native browser validation. Account creation is not connected to a service, and the form reports that when submitted.

## Requirements

Use Node.js 20.19+ or 22.12+.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Project structure

```text
index.html       Semantic page structure and sign-up form
style.css        Responsive storefront styles
src/
  cart.ts        Cart operations and local-storage persistence
  catalog.ts     Product category, search, and sort logic
  main.ts        Application state and event wiring
  products.ts    Product catalog data
  types.ts       Shared TypeScript types
  ui.ts          DOM rendering and event listeners
DESIGN.md        Visual decisions and image references
CLAUDE.md        Project-specific development rules
debugging-log.md Notes on bugs found and their fixes
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

`npm run format` applies Prettier to project files. Husky runs lint-staged before commits. ESLint checks JavaScript configuration files; strict TypeScript and unused declarations are checked by `npm run typecheck`.

Product and hero photos are served from Unsplash and require an internet connection. See [DESIGN.md](DESIGN.md) for design decisions and image-source references.
