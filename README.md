# RedBoxStudio 🎮

RedBoxStudio is a modern, retro-themed portfolio website for a game design studio. It showcases mobile and web games with a distinct 8-bit aesthetic while providing high-performance, SEO-optimized content delivery.

Built with **Next.js 15**, **Supabase**, and **Tailwind CSS**.

## ✨ Features

*   **Public Storefront**: 
    *   **Home Page**: Featured new releases and FAQ.
    *   **Games Catalogue**: Filterable grid of games with platform indicators (Android/Web).
    *   **Game Details**: Dynamic pages with rich descriptions, key features, and gallery.
    *   **About Page**: Studio mission and social contacts.
    *   **Localization**: Full English and Russian (RU) support via `next-intl`.
*   **Admin Panel**:
    *   Secure Dashboard (`/admin`) protected by Supabase Auth.
    *   Create, Edit, and Manage games.
    *   **Analytics**: Internal tracking for page views and store clicks.
    *   **Media**: Management for Covers, Trailers (YouTube Embeds), and Screenshot Galleries.
*   **Tech & UX**:
    *   **Retro UI**: Custom Tailwind design system (hard shadows, pixel fonts).
    *   **Performance**: Server Components, Image Optimization, and fast transitions (`nprogress`).
    *   **Analytics**: Custom event logging for "Google Play" and "Yandex Games" clicks.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
*   **Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/redboxstudio.git
cd redboxstudio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.
Access Admin at [http://localhost:3000/admin](http://localhost:3000/admin).

## 🗄️ Database Setup (Supabase)

The project requires the following tables in Supabase:
*   `games`: Generic metadata, JSONB for translations/platforms.
*   `analytics`: Event logs.

Run the contents of `supabase_schema.sql` in your Supabase SQL Editor to verify the schema.

##  License

Proprietary software. All rights reserved by **RedBoxStudio**.
