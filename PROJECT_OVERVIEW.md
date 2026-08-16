# Project Overview & Architecture

## 1. Framework
* **Astro v7** (ES Modules, Node >=22.12.0)
* **Tailwind CSS v4** (`@tailwindcss/vite`)

## 2. Concept
* Personal static site and travel photo stories for `filiptepper`.

## 3. Project Layout
* `src/layouts/Layout.astro` – Primary page layout wrapper (header, footer, accessibility skip link, Open Graph tags, toast notification).
* `src/components/TravelCard.astro` – Reusable card for index page travel log entries.
* `src/content.config.ts` – Astro Content Collections loader & schema (`travel` collection).
* `src/content/travel/` – JSON data entries for travel stories (e.g. `germany-scotland-iceland-2026.json`).
* `src/pages/` – Routes:
  * `index.astro` – Main home page.
  * `travel/index.astro` – Redirects to default story (avoids file-vs-folder route collisions).
  * `travel/[slug].astro` – Dynamic template rendering story maps & photos.
* `src/styles/global.css` – Tailwind `@theme` configuration, scrollbars, and Leaflet pin styles.

## 4. Working with Travel Stories

### Adding a New Travel Log
1. **Create Data Entry**: Create a new `.json` file in `src/content/travel/<slug>.json`.
   ```json
   {
     "title": "Story Title",
     "description": "Short subtitle description.",
     "subtitle": "Region",
     "date": "Month Year",
     "badge": "COUNTRY · DISTANCE",
     "center": [46.55, 7.85],
     "zoom": 10,
     "locations": [
       {
         "id": "photo-1",
         "title": "Location Name",
         "lat": 46.6242,
         "lng": 8.0414,
         "imageSrc": "/images/<slug>/IMG_1234.jpg",
         "imageAlt": "Alt text",
         "caption": "Photo caption text.",
         "aspect": "landscape"
       }
     ]
   }
   ```
2. **Aspect Types**:
   * `landscape`: 16:10 ratio full-width card.
   * `portrait`: 9:16 portrait phone photo centered.
   * `grid-2up-1` / `grid-2up-2`: Pair of side-by-side vertical photos.
   * `isPlaceOnly: true`: Text-only pass note with map dot (no photo required).
   * `aspect: "video"` (or `youtubeId: "<id_or_url>"`): Responsive embedded YouTube video at a map location or at the story root.
3. **Add Home Link**: Add `<TravelCard>` in `src/pages/index.astro` with `href="/travel/<slug>"`.

## 5. Local Photo Processing Workflow

### Image Conversion & EXIF Extraction
* **HEIC to JPG Conversion**: Use macOS `sips` to create web-optimized 1600px JPEGs:
  `sips -s format jpeg -Z 1600 input.HEIC --out output.jpg`
* **EXIF Metadata**: Use macOS `mdls` to extract coordinates, creation dates, and dimensions without external dependencies:
  `mdls -name kMDItemLatitude -name kMDItemLongitude -name kMDItemContentCreationDate photo.HEIC`
* **Content Collection Routing Tip**:
  * In Astro `glob` loaders, `entry.id` retains the `.json` extension (`"my-trip.json"`).
  * In `getStaticPaths()`, strip the `.json` extension (`entry.id.replace(/\.json$/, '')`) so dynamic URLs match cleanly as `/travel/<slug>`.

## 6. Key Commands
* `npm run dev` or `astro dev --background`
* `ASTRO_TELEMETRY_DISABLED=1 npm run build`
* `npm run preview`
