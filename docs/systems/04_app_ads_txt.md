# System: App-Ads.txt Management

## 1. Overview
The app-ads.txt system allows game developers and publishers to manage advertising platform verification files directly through the admin panel. This feature enables authorized digital sellers to be publicly declared for each game.

## 2. Purpose
**App-ads.txt** (Authorized Digital Sellers for Apps) is an IAB Tech Lab initiative that helps ensure brand safety and helps fight against fraud in mobile in-app programmatic advertising. Publishers can use app-ads.txt to publicly declare who is authorized to sell their mobile app inventory.

## 3. Implementation

### A. Database Schema
*   **Table**: `games`
*   **Column**: `app_ads_txt` (TEXT, NULLABLE)
*   **Purpose**: Stores the raw app-ads.txt file content for each game.

### B. Admin Interface
*   **Location**: `/admin/games/[id]` or `/admin/games/new`
*   **Component**: `GameForm.tsx`
*   **Section**: "App-Ads.txt Configuration"
*   **Input**: Multi-line textarea (8 rows)
*   **Features**:
    *   Monospace font for better readability
    *   Placeholder with example format
    *   Helper text explaining the format
    *   Optional field (not required)

### C. Public Route
*   **Path**: `/[locale]/game/[slug]/app-ads.txt`
*   **Handler**: `app/[locale]/game/[slug]/app-ads.txt/route.ts`
*   **Method**: GET
*   **Response Type**: `text/plain; charset=utf-8`
*   **Caching**: 1 hour (browser and CDN)
*   **Behavior**:
    *   Returns 404 if game doesn't exist
    *   Returns 404 if app_ads_txt field is null or empty
    *   Returns plain text content if available

## 4. App-Ads.txt Format
Standard format according to IAB specification:
```
domain.com, publisher-account-id, RELATIONSHIP, certification-authority-id
```

### Example:
```
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
subdomain.example.com, pub-1111111111111111, RESELLER, f08c47fec0942fa0
```

### Field Definitions:
1. **Domain**: The canonical domain of the advertising system
2. **Publisher Account ID**: The publisher's account ID within that system
3. **Relationship**: Either DIRECT or RESELLER
4. **Certification Authority ID**: An ID from a certification authority (optional)

## 5. Usage Workflow

### For Admins:
1. Navigate to game editor in admin panel
2. Scroll to "App-Ads.txt Configuration" section
3. Paste app-ads.txt content into textarea
4. Save the game
5. Verify accessibility at `/{locale}/game/{slug}/app-ads.txt`

### For Ad Platforms:
1. Crawlers access the file at the published URL
2. Parse the content to verify authorized sellers
3. Use the data to validate ad inventory

## 6. Technical Details

### Route Handler Logic:
```typescript
1. Extract slug from URL parameters
2. Query Supabase for game's app_ads_txt field
3. Validate:
   - Game exists
   - app_ads_txt is not null
   - app_ads_txt is not empty (after trim)
4. Return 404 if validation fails
5. Return plain text with appropriate headers if validation passes
```

### Security Headers:
*   `Content-Type: text/plain; charset=utf-8` - Ensures proper content type
*   `Cache-Control: public, max-age=3600, s-maxage=3600` - Enables CDN caching
*   `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing

### Data Flow:
```
Admin Panel → Server Action → Supabase → Database
↓
Public Route Request → Supabase Query → Plain Text Response
```

## 7. Migration
To enable this feature on existing databases, run the following SQL:
```sql
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS app_ads_txt text null;
```

Migration file available at: `migrations/add_app_ads_txt.sql`

## 8. Future Enhancements
*   **Validation**: Add format validation in the admin form
*   **Syntax Highlighting**: Improve textarea with syntax highlighting
*   **Preview**: Add a preview button to see how the file will be served
*   **Templates**: Provide common templates for popular ad networks
