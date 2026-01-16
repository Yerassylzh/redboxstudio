'use server';

import { createClient } from "@/utils/supabase/server";

export async function logEvent(eventType: string, gameSlug: string, locale?: string) {
  try {
    const supabase = await createClient();
    
    // We use simple INSERT. No need to await or block UI for this ideally, 
    // but in Server Actions we must wait to ensure execution before closure often.
    // However, for fire-and-forget, we can just trigger it.
    
    await supabase.from('analytics').insert({
        event_type: eventType,
        game_slug: gameSlug,
        locale: locale
    });

  } catch (err) {
    console.error("Analytics Error:", err);
    // Be silent about errors to not disrupt user experience
  }
}
