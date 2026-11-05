# Design Notes

## Direction

ShopBoard uses a quiet, editorial retail style: an off-white canvas, forest-green structure, and restrained coral accents. Serif headings add a boutique feel, balanced by a sans-serif body face for controls and product details. The layout prioritizes product photography and quick catalog scanning rather than decorative panels.

## Color tokens

| Name                   | Value     | Purpose                                                           |
| ---------------------- | --------- | ----------------------------------------------------------------- |
| Background (`--paper`) | `#f7f8f4` | Page background                                                   |
| Surface (`--white`)    | `#fff`    | Header, fields, and toast surfaces                                |
| Text (`--ink`)         | `#202c26` | Primary body text                                                 |
| Muted (`--muted`)      | `#66716a` | Supporting text                                                   |
| Primary (`--forest`)   | `#244337` | Primary buttons, header accents, and register panel               |
| Accent (`--accent`)    | `#c85c43` | Accent text and hover states                                      |
| Border (`--line`)      | `#dce3dd` | Header divider                                                    |
| Focus                  | `#c85c43` | Global `:focus-visible` outline; form controls also use `#b9cec0` |
| Error                  | `#c85c43` | Error toast border                                                |

Other component colors are literal CSS values: `#315746` button hover, `#cbd4cc` field border, `#e8ece6` image background, `#e9eee9` cart surface, `#d2dbd3` cart divider, `#afbeb1` clear-cart border, `#dfe8df` clear-cart hover, `#d4dfd6` form hint, `#f1c67c` sign-up button, and `#f6d69d` sign-up button hover. The toast shadow uses `rgb(32 44 38 / 16%)`.

## Typography

- Body and controls use `"Avenir Next", Avenir, "Segoe UI", sans-serif`, with a `1.5` line height. The stylesheet leaves the body font size at the browser default.
- Display and section headings use `Georgia, "Times New Roman", serif`, weight `400`. The display heading is `3.25rem` with `1.02` line height, increasing to `4.25rem` from `900px`. Section headings are `2rem`.
- Product-card headings use Georgia, `1.2rem`, weight `400`.
- Supporting type includes `1.05rem` hero copy; `0.9rem` navigation and buttons; `0.82rem` labels and form hints; `0.75rem` eyebrow text; and `0.74rem` product categories. Bold text uses weight `700` where specified, including the logo, eyebrow, cart count, prices, and cart item names. Labels and buttons use weight `600`.
- Where no individual line height is set, text inherits the body line height.

## Spacing and corners

The stylesheet uses these spacing values in pixels: `4`, `6`, `8`, `10`, `12`, `14`, `16`, `18`, `20`, `24`, `28`, `32`, `36`, `42`, `48`, `56`, and `68`. These are direct CSS values rather than a declared spacing-token scale. The shared `--radius` token is `4px` and is used by buttons and form controls.

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
