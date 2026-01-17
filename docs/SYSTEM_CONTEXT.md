# RedBoxStudio System Context
> **Single Source of Truth for AI & Developers**
> **Last Updated**: 2026-01-17

## 1. High-Level Overview
**RedBoxStudio** is a high-performance, retro-themed game studio portfolio built with **Next.js 15**. It prioritizes a distinct **8-bit/Pixel Art aesthetic**, full **Internationalization (EN/RU)**, and a robust **Supabase** backend for managing game data and content.

## 2. Tech Stack
*   **Framework**: Next.js 15 (App Router, Server Actions)
*   **Database & Auth**: Supabase (PostgreSQL, RLS)
*   **Styling**: Tailwind CSS (with specific retro tokens)
*   **Localization**: `next-intl` (Routing: `/[locale]/...`)
*   **Icons**: Lucide React + Custom SVGs
*   **Formatting**: `Press Start 2P` (Headings), `Inter` (Body)
*   **UX Enhancements**: `nprogress` (Retro Loading Bar), `framer-motion` (Micro-interactions)

## 3. Architecture & File Structure
The project uses strict **file-system based routing** with locale prefixes.

```
/app
  /[locale]           # Public Storefront (en/ru)
    layout.tsx        # Main Layout (Providers, Header, Footer)
    page.tsx          # Home Page
    /games            # Games Catalogue
    /game/[slug]      # Game Details (Dynamic)
    /about            # Studio Information
  /admin              # Admin Panel (Protected)
    layout.tsx        # Admin-specific Layout (Sidebar-less, utilitarian)
    page.tsx          # Dashboard (List Games)
    /games/new        # Create Game
    /games/[id]       # Edit Game
    actions.ts        # Server Actions (CRUD)
/components
  /admin              # Admin Forms & UI
  /layout             # Header, Footer
  /game               # GameCard, GameHero, GameGallery
  /ui                 # Primitives (Button, Container, YouTubeEmbed, AnimateInView)
/lib
  games.ts            # Data Adapter (Supabase Fetching helpers)
/utils/supabase       # Supabase Clients (Server, Client, Middleware)
/messages             # i18n JSON translation files (en.json, ru.json)
```

## 4. Key Systems
### A. Data & Backend (Supabase)
*   **Single Source of Truth**: The `games` table in Supabase stores all metadata.
*   **Localization Strategy**: Hybrid approach. High-level UI strings in `messages/*.json`. Dynamic game content (Descriptions, Features) stored in `jsonb` columns within the database or fetched dynamically.
*   **Security**: RLS Policies ensure only authenticated Admins can write data. Public users have read-only access.

### B. Admin Panel
*   **CRUD Operations**: Full Create/Read/Update/Delete capabilities via Server Actions.
*   **Features**:
    *   **Gallery Management**: Add multi-screenshot support.
    *   **Platform Links**: Toggle Android/Web availability by providing URLs.
    *   **Localization Editor**: Input separate descriptions for EN and RU directly in the form.

### C. Retro Design System
*   **Visuals**: Hard shadows (`box-shadow`), strict 2px borders, pixelated fonts.
*   **Media**: 
    *   **YouTube Embeds**: Retro-framed video player for trailers.
    *   **Galleries**: Responsive grids for screenshots.

## 5. Development Guidelines
1.  **Strict Typing**: No `any`. Use `interface Game` in `lib/games.ts`.
2.  **Server First**: Fetch data in Server Components (`page.tsx`), pass to Client Components only for interactivity.
3.  **Localization**: Always use `t()` keys for UI. Hardcode generic content only in fallback scenarios.
4.  **Images**: Always use `next/image` with `fill` or explicit dimensions.
