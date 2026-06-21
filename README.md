# Saini Handicrafts

A modern handmade craft storefront concept built from scratch after reviewing three open-source ecommerce references:

- `refs/gocart` for marketplace structure and vendor/admin direction
- `refs/commerce` for polished commerce patterns
- `refs/supply` for lightweight creator-shop simplicity

The app is intentionally a clean new project so it can become its own brand instead of a direct copy of any template.

## Run

```bash
npm install
npm run dev
```

## Live Demo

https://pankaj2816.github.io/saini-handicrafts/

## Current Features

- Creative handmade storefront homepage
- Product collection with quantity steppers
- Advanced cart drawer with coupon code `SAINI10`
- Admin-gated owner panel to add products with image, category, price, stock, and description
- Admin edit/delete for owner-added products
- Demo user account form saved in the browser
- Wishlist collection counts
- Personalized discovery quiz
- Craft Your Room space-based recommender
- Color mood shopping with product recommendations
- Festival collection mode for Diwali, Wedding, Rakhi, and Corporate gifting
- Before/after styling preview
- Interactive maker/workshop map
- Surprise Me recommendation in the gift finder
- Creative shopping lab with style board
- Craft drop countdown and reminder
- Budget curator
- Handwritten gift note preview
- Product comparison table
- Gift finder and gift box builder
- Packaging preview inside the gift box builder
- Product quick-view story drawer with gallery, care, rating, and add-to-cart
- Custom order form with material, size, and reference image upload
- Checkout demo with live order journey, authenticity certificate, invoice print, and WhatsApp order handoff
- Maker story section
- Category browsing blocks
- Custom order request form
- Original generated hero asset in `public/assets/artisan-hero.png`
- Client-readiness pass removed older duplicate visible sections in favor of cart drawer, maker map, product stories, and advanced discovery flows.

## Easy Owner Workflow

1. Open the website.
2. Go to `Admin`.
3. Enter the demo owner ID and password:
   - Owner ID: `owner@sainihandicrafts.com`
   - Password: `SAINI-ADMIN`
4. Upload a product image.
5. Add product name, price, category, stock status, and short description.
6. Press `Save product`.

For now this is a front-end demo and saves in browser storage for testing. A real store should later connect this to secure backend authentication, a database, and image storage so customers cannot bypass owner permissions.

## Demo Interactions

- Search icon opens a product search bar.
- Cart icon opens the checkout dialog.
- `Continue to checkout` opens the same checkout dialog.
- `Rooms` opens the room-based styling recommender.
- `Colors` opens color mood shopping.
- `Lab` opens style board, drop countdown, budget curator, gift note preview, and product comparison.
- `Gift Box` lets users select products, packaging, and greeting note.
- `Surprise me` opens a random product story from the gift finder.
- `Send request` saves a custom-order request confirmation.

## Verification

- `npm run build`
- Local response check at `http://127.0.0.1:5173`
- Static smoke check for all major feature labels
- Stale duplicate selector check for removed sections
