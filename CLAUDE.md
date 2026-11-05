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

The application modules are organized by feature in `src/`:

```text
src/
  main.ts
  modules/
    products/
      products.types.ts
      products.data.ts
      products.logic.ts
      products.api.ts
      products.ui.ts
    cart/
      cart.types.ts
      cart.logic.ts
      cart.state.ts
      cart.ui.ts
    signup/
      signup.ui.ts
  shared/
    api/
      client.ts
    dom.ui.ts
    toast.ui.ts
```

The global stylesheet is `style.css` in the repository root.

## Where a new feature goes

- Put product catalog types, data, pure operations, and DOM rendering in the corresponding `modules/products/` files.
- Put cart types, pure calculations, persistence, and DOM rendering in the corresponding `modules/cart/` files.
- Give a new feature with UI its own `modules/<feature>/` folder, with only the files needed for real code and the same `<feature>.<role>.ts` naming pattern.
- Put sign-up form behavior in `modules/signup/`.
- Put cross-feature utilities in `shared/` only when more than one module uses them; the API transport client belongs in `shared/api/`, and browser DOM helpers belong in `*.ui.ts`.
- Connect modules and keep catalog choices in `main.ts`; do not put feature logic there.

## Architecture

- `modules/products/products.types.ts` may define product and catalog types, including the `Category` union. It may not contain runtime logic or browser access.
- `modules/products/products.data.ts` may define and export the ordered product data. It may not contain functions, DOM access, or storage access.
- `modules/products/products.logic.ts` may contain pure search, category-filter, and sort functions. It may not contain cart logic, access browser APIs, or mutate the original product list.
- `modules/products/products.api.ts` may validate API product data and map it to app product types. It may not call `fetch` directly or render UI.
- `modules/products/products.ui.ts` may render the catalog and bind its controls. It may not own catalog state, perform catalog calculations, access storage, or import another feature's UI.
- `modules/cart/cart.types.ts` may define cart types. It may not contain runtime logic or browser access.
- `modules/cart/cart.logic.ts` may contain pure cart calculations and saved-cart validation. It may not access browser APIs or mutate its inputs.
- `modules/cart/cart.state.ts` may own the current cart and load or save it with local storage by calling cart logic. It may not access the DOM or render content.
- `modules/cart/cart.ui.ts` may render the cart and bind its controls. It may not own cart state, calculate cart values, access storage, or import another feature's UI.
- `modules/signup/signup.ui.ts` may bind the sign-up form and present its submission result. It may not access storage or import another feature's UI.
- `shared/*.ui.ts` may contain UI helpers used by more than one module. DOM and window access belongs only in `*.ui.ts` files; shared helpers may not own catalog or cart state.
- `shared/api/client.ts` may define the API base URL, API errors, and typed JSON requests. It is the only file allowed to call `fetch`.
- `main.ts` may connect modules and own catalog choices in its state object. It may not access the DOM or storage or implement catalog and cart calculations.

## Project rules

- Keep `products` in its original order. Filter to a copy before sorting so the default order can be restored.
- Bind DOM events once in the feature UI files; keep catalog choices in the state object in `main.ts` and render through UI functions.
- Keep DOM access and rendering in `*.ui.ts` files. Catalog and cart operations in logic and state files should not query or update the page.
- Adding an existing product increases its quantity. Decreasing quantity to zero removes the line; quantities must stay positive.
- Treat local-storage data as untrusted: validate each cart item and fall back to an empty cart if reading or parsing fails.
- Use semantic HTML, one `h1`, associated form labels, and native input validation.
- Keep TypeScript strict and do not use `any`, `as` type assertions, or non-null assertions.

## Rules from mistakes I saw

-
-
-
