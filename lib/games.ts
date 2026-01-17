import { createClient } from "@/utils/supabase/server";

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  trailer?: string;
  category: string;
  releaseDate: string;
  platforms: {
    android?: string;
    ios?: string; // Kept for type compatibility, though currently unused
    web?: string;
  };
  features?: string[];
  gallery?: string[];
  privacy?: string;
}

// Helper to map DB row to App Game Interface
function mapGameData(row: any, locale: string): Game {
    const t = row.translations?.[locale] || row.translations?.['en'] || {};
    
    // Map features object "0", "1"... to array
    const features = t.features ? Object.values(t.features) as string[] : [];

    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: t.description || "",
        image: row.image_url,
        trailer: row.trailer_url,
        category: row.category,
        releaseDate: row.release_date,
        platforms: row.platforms || {},
        features: features,
        // Use real gallery if available and not empty, otherwise fallback to cover image
        gallery: (row.gallery && row.gallery.length > 0) ? row.gallery : [row.image_url], 
        privacy: t.privacy
    };
}

export async function getGames(locale: string = 'en'): Promise<Game[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('release_date', { ascending: false });

    if (error) {
        console.error("Error fetching games:", error);
        return [];
    }

    return data.map(row => mapGameData(row, locale));
}

export async function getGameBySlug(slug: string, locale: string = 'en'): Promise<Game | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        return null;
    }

    return mapGameData(data, locale);
}

export async function getRecentGames(locale: string = 'en', limit: number = 3): Promise<Game[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('release_date', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching recent games:", error);
        return [];
    }

    return data.map(row => mapGameData(row, locale));
}

export async function getLatestGame(locale: string = 'en'): Promise<Game | null> {
    const games = await getRecentGames(locale, 1);
    return games.length > 0 ? games[0] : null;
}
