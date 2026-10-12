# Development and deployment

This portfolio uses HTML, CSS, and JavaScript with no framework or build dependencies. Node.js runs the local preview server only.

## Local preview

Run `npm run dev`, then open http://127.0.0.1:4173.
Run `npm run check` to check JavaScript syntax.

## Files

- `dist/index.html`: portfolio content.
- `dist/professional.css`: responsive styling.
- `dist/professional.js`: certificate popups and copyright year.
- `dist/assets/`: resumes, certificate originals, certificate previews, and favicon.

## Vercel deployment

Import this GitHub repository into Vercel. Select Other as the framework preset and use `dist` as the output directory. No install or build command is needed; these settings are included in `vercel.json`.

The site is static and needs no environment variables or backend. Certificate popups include original-file downloads. Contact links open the visitor's email application.
