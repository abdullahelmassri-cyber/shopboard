# CLAUDE.md

## Project

ShopBoard: a shop landing page with a product list and a sign-up form.

## Stack

- Vite (vanilla template), plain HTML, CSS and JavaScript. No frameworks.
- Prettier formats the code. ESLint checks it.
- husky + lint-staged run both on every commit.

## Commands

- `npm run dev`: start the dev server
- `npm run lint`: check the JavaScript
- `npm run format`: format every file
- `npm run build`: build for production

## Rules

1. Semantic HTML first: header, nav, main, section, article, footer. One h1 per page.
2. Buttons are `<button>`, links are `<a href>`. Never a clickable div.
3. Every input has a `<label>`. Use native validation (required, type, minlength) before JavaScript.
4. Mobile-first CSS: base styles are for phones, then `min-width` media queries only. No `!important`.
5. Use `===`, `const` by default, `let` only when the value changes. Never `var`.
6. No magic numbers: give them a name (`TAX_RATE`, not `1.2`).
7. Reuse existing functions. Don't duplicate logic.
8. Explain every new file and function in one line.
9. Don't change what I didn't ask for.

## Project structure

- `index.html`: the page
- `src/style.css`: all styles
- `src/products.js`: the product data
- `src/main.js`: JavaScript entry point

## My rules

- Never change the original `products` array. Search, filter and sort must always work on a copy (`filter`, or `[...array].sort(...)`), so "Default" can restore the original order.
- Attach event listeners once, outside any render function. A listener inside a function that runs on every render stacks up, and one click ends up adding several items.
- Keep the app's choices (search text, category, sort) in one `state` object, and redraw the page only by calling `render()`. Don't change the page piece by piece from different places.
- Adding a product that is already in the cart must increase its quantity, not create a second line. Decreasing a quantity of 1 removes the product, and the quantity must never show 0 or a negative number.
- Always check that data read from localStorage is valid (wrapped in `try/catch`) before using it, and fall back to an empty cart if it isn't.
- Only one file may touch the page (`document.querySelector`, `innerHTML`, `addEventListener`). All other files contain plain logic and data.
