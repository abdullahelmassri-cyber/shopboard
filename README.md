# ShopBoard

ShopBoard is a responsive storefront demo built with Vite, TypeScript, semantic HTML, and CSS. It includes a searchable product catalog, category filtering, price sorting, and a shopping cart saved in browser local storage.

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
  main.ts                    Application wiring and catalog choices
  modules/
    products/
      products.types.ts      Product and catalog types
      products.data.ts       Product catalog data
      products.logic.ts      Pure catalog search, filter, and sort
      products.api.ts        Product API validation and mapping
      products.ui.ts         Catalog rendering and controls
    cart/
      cart.types.ts          Cart types
      cart.logic.ts          Pure cart calculations and validation
      cart.state.ts          Cart state and local-storage persistence
      cart.ui.ts             Cart rendering and controls
    signup/
      signup.ui.ts           Sign-up form events and submission feedback
  shared/
    api/
      client.ts              Shared fetch client and API errors
    dom.ui.ts                Shared DOM lookup helper
    toast.ui.ts              Shared toast messages
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

The hero photo is served from Unsplash; product photos use Unsplash and Pexels. All images are remote and require an internet connection. See [DESIGN.md](DESIGN.md) for design decisions and image-source references.
