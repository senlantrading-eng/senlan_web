# SENLAN TRADING demo

Tesla-style minimal bilingual homepage demo.

## Run locally
From this folder:

```bash
python3 -m http.server 5173
```

Then open:

- http://localhost:5173

## News structure

- Root news landing page: `daily.html`
- Canonical news article pages: `news/articles/`
- Legacy JS-era news files: `news/legacy/`
- Root-level historical article URLs are kept as lightweight redirect wrappers so old links do not break.

## Replace images
Edit `styles.css` and replace the `.hero__slide[data-slide="X"]{background-image:...}` rules with real image URLs.

## Inquiry improvements — 2026-10-08

- Product hero and lower quote buttons preselect the corresponding product on `contact.html`.
- Contact form adds product, company, destination country/region and port, permits a laycan range, and validates a positive quantity when provided.
- `js/inquiry.js` uses the existing FormSubmit recipient through its AJAX API, retaining the native POST as the no-JavaScript fallback. Do not change recipient without confirming ownership and activation.
- Success means the form service accepted the request; it is not proof of email delivery or a qualified lead. Network/API errors preserve the input. The `submitted=1` return URL does not create a conversion.
- Before going live, perform an authorized end-to-end inquiry from the production domain and verify the Outlook inbox. No real email was sent during local validation.
- No Google/Meta tag or new tracking cookie has been installed. The local `dataLayer` exposes `quote_click`, `whatsapp_click`, `email_click`, and `inquiry_accepted`; event payloads contain only product and, on acceptance, confirmation source. Connect these to the approved tag/account setup before using campaign reports. Treat clicks as secondary interactions, never qualified leads.
- UTM labels are carried between the updated homepage, product pages and contact page and included with the inquiry. They are length/character limited and not stored persistently. Use campaign labels only, never personal data. Other pages do not currently preserve campaign attribution on onward navigation.
- Annual shipment figures were removed from homepage copy pending a confirmed reporting period. Existing WhatsApp page routing is retained pending confirmation.
- Review tracking consent requirements for target markets when adding actual vendor tags. This change itself adds no analytics network calls.
