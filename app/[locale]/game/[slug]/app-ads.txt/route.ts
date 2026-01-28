import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /[locale]/game/[slug]/app-ads.txt
 * 
 * Serves the app-ads.txt file for a specific game.
 * The app-ads.txt file is used by advertising platforms to verify authorized sellers.
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing slug and locale
 * @returns Plain text response with app-ads.txt content or 404 if not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; locale: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the game's app_ads_txt content
  const { data: game, error } = await supabase
    .from('games')
    .select('app_ads_txt')
    .eq('slug', slug)
    .single();

  // Return 404 if game doesn't exist, has no app-ads.txt content, or content is empty
  if (error || !game || !game.app_ads_txt || game.app_ads_txt.trim() === '') {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Return the app-ads.txt content as plain text
  return new NextResponse(game.app_ads_txt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache for 1 hour in browser and CDN
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      // Prevent content sniffing
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
