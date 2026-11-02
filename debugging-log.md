## Bug 1

- **What I saw:** The page loaded with no products and no search box response. The Console showed a red error: `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`.
- **Type:** runtime
- **How I found it:** Console error. It pointed to `ui.js:34`, so I opened that line and hovered over the variable.
- **Cause:** In `ui.js` I wrote `document.querySelector("#search-box")`, but the input in `index.html` has `id="search"`. `querySelector` returned `null` because no element matched, and calling `.addEventListener` on `null` crashed the script.
- **Fix:** Changed the selector to `#search` so it matches the id in the HTML.
- **Did I use AI? For what?** No. The error message gave the file and line, and checking the HTML id was enough.

## Bug 2

- **What I saw:** I sorted by "Low to high", then picked "Default" again, but the products stayed in price order instead of going back to the original order.
- **Type:** logic
- **How I found it:** Tested the "think about these" question from the homework, then put a breakpoint in `getVisibleProducts()` and looked at the order of `products` in the Scope panel.
- **Cause:** In `catalog.js` I called `products.sort(...)` directly. `sort()` changes the array it is called on, so the original `products` array was permanently reordered and there was no original order left to return to.
- **Fix:** Sort only the array returned by `filter()`, which is a new copy. For "Default" I skip the sort.
- **Did I use AI? For what?** Yes, after 10 minutes of trying. I asked why `sort()` affects the original array, and I added a rule to `CLAUDE.md` about never changing the original array.
