# Design Notes

## Direction

ShopBoard uses a quiet, editorial retail style: an off-white canvas, forest-green structure, and restrained coral accents. Serif headings add a boutique feel, balanced by a sans-serif body face for controls and product details. The layout prioritizes product photography and quick catalog scanning rather than decorative panels.

## Reference

The basic layout takes inspiration from [Website Design for Industrial Designer Mirko Romanelli](https://dribbble.com/shots/27566031-Website-Design-for-Industrial-Designer-Mirko-Romanelli) on Dribbble. It is adapted for this storefront with a responsive product catalog, search and category controls, cart, and sign-up form; no claim is made that ShopBoard improves on the original design.

## Color tokens

| Name                                            | Value                 | Purpose                                     |
| ----------------------------------------------- | --------------------- | ------------------------------------------- |
| Background (`--paper`)                          | `#f7f8f4`             | Page background                             |
| Surface (`--white`)                             | `#fff`                | Header, fields, and toast surfaces          |
| Text (`--ink`)                                  | `#202c26`             | Primary body text                           |
| Muted (`--muted`)                               | `#66716a`             | Supporting text                             |
| Primary (`--forest`)                            | `#244337`             | Buttons, header accents, and register panel |
| Accent (`--accent`)                             | `#c85c43`             | Accent text and hover states                |
| Focus (`--accent`)                              | `#c85c43`             | Global `:focus-visible` outline             |
| Error (`--accent`)                              | `#c85c43`             | Error toast border                          |
| Border (`--line`)                               | `#dce3dd`             | Header divider                              |
| Button hover (`--color-button-hover`)           | `#315746`             | Default button hover state                  |
| Input border (`--color-input-border`)           | `#cbd4cc`             | Search, filter, and form control borders    |
| Image background (`--color-image-background`)   | `#e8ece6`             | Image placeholder background                |
| Cart surface (`--color-cart-background`)        | `#e9eee9`             | Cart panel background                       |
| Cart divider (`--color-cart-divider`)           | `#d2dbd3`             | Cart item separators                        |
| Clear-cart border (`--color-clear-cart-border`) | `#afbeb1`             | Clear-cart button border                    |
| Clear-cart hover (`--color-clear-cart-hover`)   | `#dfe8df`             | Clear-cart hover background                 |
| Control focus (`--color-control-focus`)         | `#b9cec0`             | Search and form control focus outline       |
| Form hint (`--color-form-hint`)                 | `#d4dfd6`             | Supporting copy in the dark sign-up panel   |
| Sign-up button (`--color-signup-button`)        | `#f1c67c`             | Sign-up button background                   |
| Sign-up hover (`--color-signup-button-hover`)   | `#f6d69d`             | Sign-up button hover background             |
| Toast shadow (`--color-toast-shadow`)           | `rgb(32 44 38 / 16%)` | Toast elevation                             |

## Typography

- Body and controls use `"Avenir Next", Avenir, "Segoe UI", sans-serif`, with a `1.5` line height. The stylesheet leaves the body font size at the browser default.
- Display and section headings use `Georgia, "Times New Roman", serif`, weight `400`. The display heading is `3.25rem` with `1.02` line height, increasing to `4.25rem` from `900px`. Section headings are `2rem`.
- Product-card headings use Georgia, `1.2rem`, weight `400`.
- Other font-size tokens are `1.35rem` logo, `1.1rem` cart total, `1.05rem` hero copy, `1rem` cart quantity, `0.9rem` navigation and buttons, `0.85rem` footer, `0.82rem` labels and form hints, `0.75rem` eyebrow, and `0.74rem` product categories.
- The weight tokens are `400` regular, `600` semibold, and `700` bold. Bold is used for the logo, eyebrow, cart count, prices, and cart item names; labels and buttons use semibold.
- Where no individual line height is set, text inherits the body line height.

## Spacing and corners

The `--space-*` tokens use `4`, `6`, `8`, `10`, `12`, `14`, `16`, `18`, `20`, `24`, `28`, `32`, `36`, `40`, `42`, `48`, `56`, and `68` pixels. The shared `--radius` token is `4px` and is used by buttons and form controls.

## Layout

- The product grid has one column below `640px`, two columns from `640px`, three from `900px`, and four from `1160px`.
- At `640px`, the search/category/sort controls form three columns and cart rows use five columns.
- At `900px`, the hero becomes two columns.
- The main content has a `1260px` maximum width; header content is padded relative to `1220px`.

## Components

- Default buttons and the hero link use a forest-green fill. The sign-up button uses a warm yellow fill; clear-cart is outlined/transparent; remove uses transparent styling and accent text. Disabled buttons use `50%` opacity.
- Product cards have no enclosing border; their images use a `4 / 3` aspect ratio and `object-fit: cover`.
- Fields have a white background, `44px` minimum height, `1px` border, and `4px` radius. Focus changes the border to forest and adds a `2px` pale-green outline.
- Global `:focus-visible` uses a `3px` accent outline with a `3px` offset.

## Layout and accessibility

- The hero becomes a two-column composition on wider screens.
- The product grid expands from one column on small screens to two, three, and four columns as space allows.
- Search, category, and sort controls use native labeled inputs; the sign-up form relies on native required, email, password-length, and checkbox validation.
- Product photos have descriptive alternative text, and focus-visible outlines support keyboard navigation.
- The page uses a single `h1`, labels associated with their inputs, and product image alternative text from each product name. Toast motion is disabled when `prefers-reduced-motion: reduce` is active.
- Color values are documented from the stylesheet; the stylesheet does not declare a WCAG contrast target, and contrast ratios have not been independently measured here.

## Image references

The hero photo is an Unsplash CDN image in `index.html`. Product image URLs are kept in `src/modules/products/products.data.ts` and include Unsplash and Pexels CDN images. The Unsplash image requests use `auto=format`, fixed widths, and quality settings to request appropriately sized, compressed files. Images are remote and require a network connection.

- [Unsplash image library](https://unsplash.com/)
- [Unsplash license](https://unsplash.com/license)
- [Pexels image library](https://www.pexels.com/)
