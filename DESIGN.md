# Design Notes

## Direction

ShopBoard uses a quiet, editorial retail style: an off-white canvas, forest-green structure, and restrained coral accents. Serif headings add a boutique feel, balanced by a sans-serif body face for controls and product details. The layout prioritizes product photography and quick catalog scanning rather than decorative panels.

## Layout and accessibility

- The hero becomes a two-column composition on wider screens.
- The product grid expands from one column on small screens to two, three, and four columns as space allows.
- Search, category, and sort controls use native labeled inputs; the sign-up form relies on native required, email, password-length, and checkbox validation.
- Product photos have descriptive alternative text, and focus-visible outlines support keyboard navigation.

## Image references

The hero and product photos are Unsplash CDN images. Their URLs are kept with the page and product data in `index.html` and `src/products.ts`. The image requests use `auto=format`, fixed widths, and quality settings to request appropriately sized, compressed files. Images are remote and require a network connection.

- [Unsplash image library](https://unsplash.com/)
- [Unsplash license](https://unsplash.com/license)
