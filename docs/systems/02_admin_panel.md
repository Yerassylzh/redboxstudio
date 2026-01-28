# System: Admin Panel

## 1. Access Control
*   **Route**: `/admin`
*   **Authentication**: Supabase Auth (Email/Password).
*   **Protection**: Middleware checks session; redirects unauthenticated users to `/admin/login`.

## 2. Interface
*   **Dashboard (`/admin`)**:
    *   Grid/List view of all games.
    *   Quick actions: "Create New Game", "Edit", "View Live".
*   **Game Editor (`/admin/games/[id]`)**:
    *   **Core Metadata**: Title, Slug, Category, Release Date.
    *   **Media**:
        *   Cover Image URL.
        *   Trailer URL (YouTube).
        *   **Gallery**: Inputs for up to 4 screenshot URLs.
    *   **Platforms**:
        *   Android URL (Inputting URL enables platform on public site).
        *   Web URL (Yandex).
    *   **Localization**:
        *   Tabbed Interface (English / Russian).
        *   Fields: Description, Privacy Policy, Key Features (1-3).
    *   **App-Ads.txt**:
        *   Textarea for app-ads.txt content.
        *   Accessible at `/[locale]/game/[slug]/app-ads.txt`.
    *   **Feedback**: `NProgress` bar and inline error messages for validation.

## 3. Data Flow (Server Actions)
*   `saveGame`: Handles both Insert and Update (Upsert).
    *   Validates required fields.
    *   Maps form data to `jsonb` structures (`translations`, `platforms`).
    *   Revalidates public cache (`/games`, `/game/[slug]`) upon success.
