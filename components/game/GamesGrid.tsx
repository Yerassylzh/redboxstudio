"use client"

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GameCard } from "@/components/game/GameCard";
import { Button } from "@/components/ui/Button";
import { Game } from '@/lib/games';
import { cn } from '@/lib/utils';
import { Monitor, Smartphone, LayoutGrid } from 'lucide-react';

type FilterType = 'all' | 'web' | 'android';

export function GamesGrid({ games }: { games: Game[] }) {
  const t = useTranslations('GamesList'); 
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredGames = games.filter(game => {
    if (filter === 'all') return true;
    if (filter === 'web') return game.platforms.web;
    if (filter === 'android') return game.platforms.android;
    return true;
  });

  return (
    <>
        {/* Filter Bar (Absolutely positioned or injected adjacent to header in a real layout, here effectively top of grid area) */}
        <div className="flex justify-center md:justify-end mb-8 relative -top-20 md:-top-24 pointer-events-none">
           <div className="flex flex-wrap justify-center gap-3 p-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg pointer-events-auto shadow-lg">
              <Button 
                variant={filter === 'all' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('all')}
                className={cn("gap-2", filter !== 'all' && "text-muted-foreground hover:text-white")}
              >
                <LayoutGrid className="size-4" /> {t('filterAll')}
              </Button>
               <Button 
                variant={filter === 'android' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('android')}
                className={cn("gap-2", filter !== 'android' && "text-muted-foreground hover:text-white")}
              >
                <Smartphone className="size-4" /> {t('filterAndroid')}
              </Button>
              <Button 
                variant={filter === 'web' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('web')}
                className={cn("gap-2", filter !== 'web' && "text-muted-foreground hover:text-white")}
              >
                <Monitor className="size-4" /> {t('filterWeb')}
              </Button>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameCard key={game.slug} {...game} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-muted-foreground font-heading text-sm">
                 {t('empty')}
              </div>
            )}
        </div>
    </>
  )
}
