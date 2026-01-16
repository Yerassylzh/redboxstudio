# PROJECT MANDATE

**Status**: Active
**Last Updated**: 2026-01-16

## 1. Core Objective
Create a professional, high-performance portfolio website for **RedBoxStudio** to showcase mobile and web games. The site serves two primary purposes:
1.  **Portfolio**: A centralized hub for users to find and play/download games (Yandex Games & Google Play).
2.  **Brand Promotion**: A destination to drive traffic from YouTube shorts, enhancing brand authority and SEO.

## 2. High-Level System Goals

### A. Public Website (The Storefront)
*   **Aesthetic**: "Premium", dynamic, and professional. Must wow the user.
*   **Performance**: SPA with Server-Side Rendering (Next.js) for instant loads and maximum SEO.
*   **Content**: Home page with studio context, efficient game catalogue, and dedicated game detail pages.
*   **Simplicity**: No unnecessary fluff (no carousels, no heavy background videos on home).

### B. Admin System (The Control Room)
*   **Goal**: Zero-maintenance content management.
*   **Implementation**: Secure area to add/edit games without code changes.
*   **Auth**: Simple, secure email/password authentication via Supabase.

### C. Database (The Backend)
*   **Choice**: Supabase (PostgreSQL).
*   **Reasoning**: Relational data integrity, generous free tier (500MB+), built-in Auth, and intuitive Table Editor.
*   **Constraint**: No complex backend logic or custom servers. Heavy lifting done by Supabase APIs.

## 3. The "Anti-Features" List (Constraints)
*   **DO NOT BUILD**:
    *   User Forums or Comment Sections (Maintenance nightmare).
    *   Multiplayer Game Servers (Out of scope).
    *   Complex User Profiles for players (Not needed yet).
    *   E-commerce/Payment processing (Monetization happens on Yandex/Google Play).
