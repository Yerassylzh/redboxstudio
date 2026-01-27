'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// Type definition matches our DB schema structure roughly
interface GameData {
  id?: string
  slug: string
  title: string
  image_url: string
  trailer_url: string
  category: string
  release_date: string
  platforms: {
    android?: string
    web?: string
  }
  translations: {
    en: { description: string; features: Record<string, string>; privacy: string; gallery?: string[] }
    ru: { description: string; features: Record<string, string>; privacy: string; gallery?: string[] }
  }
}

export async function saveGame(prevState: any, formData: FormData) {
  const supabase = await createClient()

  // Extract basic fields
  const id = formData.get('id') as string
  const slug = formData.get('slug') as string
  const title = formData.get('title') as string
  const image_url = formData.get('image_url') as string
  const trailer_url = formData.get('trailer_url') as string
  const category = formData.get('category') as string
  const release_date = formData.get('release_date') as string

  // Extract Helper for nested objects
  const platforms = {
    android: formData.get('platforms.android') as string || undefined,
    web: formData.get('platforms.web') as string || undefined,
  }

  // VALIDATION: Basic Server-Side Check
  if (!slug || !title || !image_url) {
      return { error: 'MISSING REQUIRED FIELDS: Title, Slug, and Image URL are mandatory.' };
  }

  // Construct Translations JSON object with locale-specific galleries
  const translations = {
    en: {
        description: formData.get('translations.en.description') as string,
        features: {
            "0": formData.get('translations.en.features.0') as string,
            "1": formData.get('translations.en.features.1') as string,
            "2": formData.get('translations.en.features.2') as string,
        },
        privacy: formData.get('translations.en.privacy') as string,
        gallery: [
            formData.get('translations.en.gallery.0') as string,
            formData.get('translations.en.gallery.1') as string,
            formData.get('translations.en.gallery.2') as string,
            formData.get('translations.en.gallery.3') as string,
        ].filter(url => url && url.length > 0)
    },
    ru: {
        description: formData.get('translations.ru.description') as string,
        features: {
            "0": formData.get('translations.ru.features.0') as string,
            "1": formData.get('translations.ru.features.1') as string,
            "2": formData.get('translations.ru.features.2') as string,
        },
        privacy: formData.get('translations.ru.privacy') as string,
        gallery: [
            formData.get('translations.ru.gallery.0') as string,
            formData.get('translations.ru.gallery.1') as string,
            formData.get('translations.ru.gallery.2') as string,
            formData.get('translations.ru.gallery.3') as string,
        ].filter(url => url && url.length > 0)
    }
  }

  // Legacy gallery field (kept null for backward compatibility)
  const gallery = null;

  const dataToUpsert = {
    slug,
    title,
    image_url,
    trailer_url,
    category,
    release_date: release_date || null,
    platforms,
    translations,
    gallery
  }

  let error;

  if (id) {
    // Update
    const { error: updateError } = await supabase
      .from('games')
      .update(dataToUpsert)
      .eq('id', id)
    error = updateError
  } else {
    // Insert
    const { error: insertError } = await supabase
      .from('games')
      .insert(dataToUpsert)
    error = insertError
  }

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/(en)/games', 'page')
  revalidatePath('/(ru)/games', 'page')
  redirect('/admin')
}

export async function deleteGame(id: string) {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', id)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/admin')
}
