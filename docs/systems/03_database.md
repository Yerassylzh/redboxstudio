# System: Database (Supabase)

## 1. Tables

### `games`
The core table storing all game metadata.

*   `id`: UUID (Primary Key, Default: `gen_random_uuid()`)
*   `created_at`: Timestamp (Default: `now()`)
*   `slug`: Text (Unique, Indexed) - Used for URLs.
*   `title`: Text - Internal/Fallback title.
*   `image_url`: Text - Main Cover Art URL.
*   `trailer_url`: Text - YouTube Link (Watch/Embed format).
*   `release_date`: Date - Displayed on storefront.
*   `category`: Text - Standardized genre code (e.g., "Action RPG").
*   `platforms`: JSONB
    *   Structure: `{ "android": "url", "web": "url", "ios": "url" }`
*   `translations`: JSONB
    *   Structure: 
        ```json
        {
          "en": { 
            "description": "...", 
            "privacy": "...", 
            "features": { "0": "..." },
            "gallery": ["url1", "url2", ...]
          },
          "ru": { 
            "description": "...", 
            "privacy": "...", 
            "features": { "0": "..." },
            "gallery": ["url1", "url2", ...]
          }
        }
        ```
*   `gallery`: Text Array (`text[]`) - Legacy field, kept for backward compatibility.
*   `app_ads_txt`: Text (Nullable) - App-ads.txt file content for advertising platform verification.
    *   Accessible at: `/[locale]/game/[slug]/app-ads.txt`
    *   Format: Standard app-ads.txt format (domain, publisher_id, relationship, certification_authority_id)

### `analytics`
Stores raw event logs for user interactions.
*   `id`: UUID
*   `created_at`: Timestamp
*   `event_type`: Text (`page_view`, `click_android`, `click_web`)
*   `game_slug`: Text
*   `locale`: Text
*   `meta`: JSONB (Optional payload)

## 2. Policies (Row Level Security)
*   **Public Access**: `SELECT` allowed for `public` role (Anonymous).
*   **Admin Access**: `INSERT/UPDATE/DELETE` allowed for `authenticated` role.
    *   *Note*: Currently assumes all authenticated users are admins (Registration disabled).

## 3. Storage (`assets` bucket) - *Planned*
*   Currently, images are hosted externally or in a general bucket. Future optimization: Organize by `/games/{slug}/`.
