# Debugging notes

## DOM selector mismatch

A selector in the UI code did not match the search input's `id`, so the query returned `null` and event setup failed. Keep element IDs and selectors in sync. `ui.ts` now uses `getElement()` to fail immediately with the missing selector when required markup is absent.

## Sorting changed the source order

Calling `sort()` on the product data changed the original array, so selecting the default sort could not restore its initial order. `catalog.ts` filters to a new array before sorting; the source catalog remains unchanged.
