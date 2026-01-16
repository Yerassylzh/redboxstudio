import { Container } from "@/components/ui/Container";
import { Game } from "@/lib/games";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';

interface GameHeroProps {
  game: Game;
}

export async function GameHero({ game }: GameHeroProps) {
  const t = await getTranslations('GameHero');
  const tCats = await getTranslations('Categories');

  return (
    <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] flex items-end pb-12 overflow-hidden border-b-2 border-white/20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-primary/50 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-heading text-primary uppercase tracking-widest shadow-retro-sm">
              <span className="size-2 bg-primary animate-pulse" />
              {tCats(game.category)}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white drop-shadow-md text-balance">
              {game.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-white/80 font-sans">
              <span>{t('released')}: <span className="text-white font-bold">{game.releaseDate}</span></span>
            </div>
          </div>
          
          {/* We could place the primary download/play button here or in a separate bar */}
        </div>
      </Container>
    </section>
  );
}
