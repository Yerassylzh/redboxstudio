"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { saveGame } from "@/app/admin/games/actions";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Helper to safely access deep properties
const get = (obj: any, path: string, defaultValue = "") => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
}

export function GameForm({ game }: { game?: any }) { // Type this better ideally
  const [state, formAction, isPending] = useActionState(saveGame, { error: '' });
  const [activeTab, setActiveTab] = useState<'en' | 'ru'>('en');

  return (
    <form action={formAction} className="space-y-8 max-w-4xl">
      {/* Hidden ID for updates */}
      {game?.id && <input type="hidden" name="id" value={game.id} />}
      
      {state.error && (
        <div className="p-4 bg-red-900/50 border border-red-500 text-red-200">
            Error: {state.error}
        </div>
      )}

      {/* Main Metadata Section */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-6">
        <h2 className="text-xl font-heading text-primary border-b border-white/10 pb-4">Core Metadata</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Internal Title</label>
                <input name="title" defaultValue={game?.title} required className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
            
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Slug (URL ID)</label>
                <input name="slug" defaultValue={game?.slug} required className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>

             <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Comparison Category</label>
                <select 
                    name="category" 
                    defaultValue={game?.category} 
                    className="w-full bg-black/50 border border-white/10 p-2 text-white font-mono focus:border-primary focus:ring-1 focus:ring-primary [&>option]:bg-black [&>option]:text-white"
                >
                    <option value="Action">Action</option>
                    <option value="Action RPG">Action RPG</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Battle Royale">Battle Royale</option>
                    <option value="Casual">Casual</option>
                    <option value="Card Game">Card Game</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Horror">Horror</option>
                    <option value="Idle">Idle</option>
                    <option value="Metroidvania">Metroidvania</option>
                    <option value="MOBA">MOBA</option>
                    <option value="Music/Rhythm">Music/Rhythm</option>
                    <option value="Open World">Open World</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Racing">Racing</option>
                    <option value="Roguelike">Roguelike</option>
                    <option value="RPG">RPG</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Sports">Sports</option>
                    <option value="Stealth">Stealth</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Survival">Survival</option>
                    <option value="Tower Defense">Tower Defense</option>
                    <option value="Trivia">Trivia</option>
                    <option value="Visual Novel">Visual Novel</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Release Date</label>
                <input name="release_date" type="date" defaultValue={game?.release_date} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>

            <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Cover Image URL</label>
                <input name="image_url" defaultValue={game?.image_url} required className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>

            <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Trailer URL (YouTube)</label>
                <input name="trailer_url" defaultValue={game?.trailer_url} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
        </div>
      </div>

        {/* Platform Links */}
       <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-6">
        <h2 className="text-xl font-heading text-primary border-b border-white/10 pb-4">Platform Links</h2>
        <p className="text-xs text-muted-foreground font-mono -mt-4">
            * Leave empty if the game is not available on that platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Android Store URL</label>
                <input name="platforms.android" defaultValue={game?.platforms?.android} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono placeholder:text-white/20" placeholder="https://play.google.com/..." />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Web URL</label>
                <input name="platforms.web" defaultValue={game?.platforms?.web} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono placeholder:text-white/20" placeholder="https://yandex.com/games/..." />
            </div>
        </div>
      </div>

       {/* Gallery / Screenshots */}
       <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-6">
        <h2 className="text-xl font-heading text-primary border-b border-white/10 pb-4">Gallery (Screenshots)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Screenshot 1</label>
                <input name="gallery.0" defaultValue={game?.gallery?.[0]} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" placeholder="https://..." />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Screenshot 2</label>
                <input name="gallery.1" defaultValue={game?.gallery?.[1]} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" placeholder="https://..." />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Screenshot 3</label>
                <input name="gallery.2" defaultValue={game?.gallery?.[2]} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" placeholder="https://..." />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Screenshot 4</label>
                <input name="gallery.3" defaultValue={game?.gallery?.[3]} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" placeholder="https://..." />
            </div>
        </div>
      </div>

      {/* Localization Tabs */}
       <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-heading text-primary">Localization</h2>
            <div className="flex gap-2">
                <button type="button" onClick={() => setActiveTab('en')} className={cn("px-4 py-1 font-mono text-xs uppercase", activeTab === 'en' ? "bg-primary text-black" : "bg-white/10 text-white")}>English</button>
                <button type="button" onClick={() => setActiveTab('ru')} className={cn("px-4 py-1 font-mono text-xs uppercase", activeTab === 'ru' ? "bg-primary text-black" : "bg-white/10 text-white")}>Russian</button>
            </div>
        </div>

        {/* English Fields */}
        <div className={cn("space-y-6", activeTab === 'en' ? 'block' : 'hidden')}>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Description (EN)</label>
                <textarea rows={5} name="translations.en.description" defaultValue={get(game, 'translations.en.description')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
             <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Privacy Policy (EN)</label>
                <textarea rows={3} name="translations.en.privacy" defaultValue={get(game, 'translations.en.privacy')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
            {/* Features (limited to 3 for now) */}
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Feature 1 (EN)</label>
                <input name="translations.en.features.0" defaultValue={get(game, 'translations.en.features.0')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Feature 2 (EN)</label>
                <input name="translations.en.features.1" defaultValue={get(game, 'translations.en.features.1')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
             <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Feature 3 (EN)</label>
                <input name="translations.en.features.2" defaultValue={get(game, 'translations.en.features.2')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
        </div>

        {/* Russian Fields */}
         <div className={cn("space-y-6", activeTab === 'ru' ? 'block' : 'hidden')}>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Description (RU)</label>
                <textarea rows={5} name="translations.ru.description" defaultValue={get(game, 'translations.ru.description')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
             <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Privacy Policy (RU)</label>
                <textarea rows={3} name="translations.ru.privacy" defaultValue={get(game, 'translations.ru.privacy')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
             {/* Features (limited to 3 for now) */}
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Feature 1 (RU)</label>
                <input name="translations.ru.features.0" defaultValue={get(game, 'translations.ru.features.0')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Feature 2 (RU)</label>
                <input name="translations.ru.features.1" defaultValue={get(game, 'translations.ru.features.1')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
             <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-muted-foreground">Feature 3 (RU)</label>
                <input name="translations.ru.features.2" defaultValue={get(game, 'translations.ru.features.2')} className="w-full bg-black/20 border border-white/10 p-2 text-white font-mono" />
            </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="default" className="font-mono w-48" disabled={isPending}>
            {isPending ? 'SAVING...' : 'SAVE DATA'}
        </Button>
        <Button type="button" variant="outline" className="font-mono" onClick={() => window.location.href='/admin'}>
            CANCEL
        </Button>
      </div>

    </form>
  )
}
