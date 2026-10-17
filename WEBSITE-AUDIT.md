# Website audit — 17 October 2026

## Scope and baseline

Reviewed the complete React storefront, stylesheet, product assets, metadata, build setup, and every implemented interaction. Existing uncommitted work is the starting point. This is a static Vite/React application: there is no order API, payment verification service, live inventory, trade inbox, or production certificate registry. The initial production build passes outside the filesystem sandbox.

## Findings and implementation priorities

| Area | Finding | Improvement |
| --- | --- | --- |
| Visual hierarchy | Seven navigation destinations compete with a long wordmark; dense cards repeat batch, material, dimensions, stock and actions. | Simplify primary navigation, use an editorial hero, larger photography, concise product cards and consistent spacing. |
| Responsive layout | The navigation only collapses below 820px; wide dialogs, lookbook rows and controls can overflow narrow screens. | Earlier menu breakpoint; mobile layouts for every section and dialog; touch-sized controls. |
| Basket | Starts with an unsolicited product; contents disappear on refresh. | Empty first visit; validated browser storage with graceful fallback. |
| Hamper pricing | Builder includes per-box packaging, plaques and tier discounts; basket instead adds plain products and one different wrap fee. | Preserve hampers as configured bundles and use one pricing calculation throughout. |
| Checkout | Prefilled personal details, hard-coded order and certificate IDs, and unverified UPI QR; local submit claims a confirmed order. | Blank validated delivery fields, explicit order-review stage, INR settlement, and user-driven WhatsApp handoff. No fabricated payment/order confirmation. |
| Trade inquiry | Submit only displays success; contact and project notes are not delivered. | Prepare a complete inquiry and provide an explicit WhatsApp send link. |
| Discovery | Header search changes results far below the viewport without taking the shopper there. No persistent saved collection. | Visible collection search, result count, clear filters, working header search navigation and saved pieces. |
| Accessibility | Clickable divs/headings, unlabeled icon buttons/inputs, no dialog focus trap or background scroll lock. | Semantic buttons, input names, dialog labels, focus containment/restoration, skip link, reduced-motion support and live status messages. |
| Content integrity | Product photos labeled as real customer interiors; sample certificate records presented as official verification; delivery estimates sound guaranteed. | Clearly label styling ideas, sample records and estimates; remove fabricated customer quotations. |
| Printing | Checkout is hidden by print rules, so its receipt button cannot print the receipt. | Dedicated print rules for visible review, lookbook and sample certificate. |
| Performance | Duplicate Google Fonts loading and repeated below-fold images without lazy loading. | Single font request, lazy loading below the fold, stable image proportions. |
| Documentation | README describes admin, room planner and other features absent from the current source. | Document actual features and remaining service integrations. |

## Verification plan

- Build production assets and verify base-path asset references.
- Test shared pricing, configured hampers, coupon eligibility and malformed stored state.
- Review desktop and narrow layouts where browser tooling permits.
- Exercise filtering, search, saved pieces, product details, basket, hamper pricing, checkout validation, trade preparation and dialog keyboard handling.
- Record any verification limits and service integrations still required; do not imply a static application can accept or confirm payments.
