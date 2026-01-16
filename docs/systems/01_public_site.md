# System: Public Website

## 1. Architecture
*   **Framework**: Next.js 15 (App Router).
*   **Styling**: Tailwind CSS.
*   **Data**: Fetched from Supabase via `lib/games.ts` (Server Components).

## 2. Page Structure

### Home Page (`/`)
*   **Hero**: Dynamic "New Release" teaser.
*   **Recent Releases**: Fetches top 3 newest games from DB.
*   **FAQ Section**: Accordion layout with localized Q&A.
*   **Footer**: Links to Games, About, YouTube, TikTok.

### Games Catalogue (`/games`)
*   **Layout**: Responsive Grid.
*   **Filtering**:
    *   **Client-Side**: Filters by Platform (All, Web, Android) without reloading.
    *   **Visuals**: Cards show categories, titles, and thumbnails.

### Game Detail Page (`/game/[slug]`)
*   **Dynamic Data**: Fetched by `slug` from Supabase.
*   **SEO**: Dynamic metadata (Title, Description) generated from game data.
*   **Content**:
    *   **Hero**: Cover art, localized title, download buttons.
    *   **Description**: Rich text (supports line breaks).
    *   **Trailer**: `YouTubeEmbed` component handles various URL formats.
    *   **Features**: List of key selling points.
    *   **Gallery**: Grid of screenshots (`GameGallery` component).
    *   **Sidebar**: Release date, specialized genre, version, privacy policy.
*   **Localization**: Content (Description, Features) switches automatically based on locale.

### About Page (`/about`)
*   **Purpose**: Studio mission statement and contacts.
*   **Visuals**: "Starfield" grid background.
*   **Contacts**: MailTO, YouTube (New Tab), TikTok (New Tab).

## 3. SEO Strategy
*   **Metadata**: `generateMetadata` function used on all dynamic pages.
*   **Sitemap**: Should be generated dynamically (Future Todo).
*   **Performance**: Images use `next/image` optimizations; Scripts loaded lazily.
