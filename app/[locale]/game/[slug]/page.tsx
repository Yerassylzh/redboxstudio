import { notFound } from 'next/navigation';
import { getGameBySlug } from '@/lib/games';
import { GameHero } from '@/components/game/GameHero';
import { GameGallery } from '@/components/game/GameGallery';
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from '@/i18n/routing';
import { ArrowLeft, Monitor, Smartphone, Download, ShieldCheck, PlayCircle } from "lucide-react";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { GameActions } from "@/components/game/GameActions";


import { getTranslations } from 'next-intl/server';

interface GamePageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata(props: GamePageProps) {
  const params = await props.params;
  const game = await getGameBySlug(params.slug, params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'GamePage' });

  if (!game) {
    return {
      title: 'Game Not Found'
    }
  }

  return {
    title: `${game.title} - ${t('aboutGame')}`,
    description: game.description.slice(0, 160)
  };
}

export default async function GamePage(props: GamePageProps) {
  const params = await props.params;
  const game = await getGameBySlug(params.slug, params.locale);

  if (!game) {
    notFound();
  }

  // helper for features
  const features = game.features || [];
  
  // UI Translations
  const tPage = await getTranslations('GamePage');
  const tCats = await getTranslations('Categories');

  return (
    <article className="min-h-screen pb-20">
      <GameHero game={game} />
      
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <Link href="/games" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="size-4 mr-2" /> {tPage('back')}
            </Link>
          
            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-base md:text-2xl font-heading text-white border-b border-white/10 pb-4 mb-4 md:mb-6">{tPage('aboutGame')}</h2>
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed font-sans whitespace-pre-wrap">
                {game.description}
              </p>
            </div>

            {/* Trailer (Placeholder) */}
            <div>
               <h2 className="text-base md:text-xl font-heading text-white mb-3 md:mb-6 flex items-center gap-2">
                <PlayCircle className="size-4 md:size-5 text-primary" /> {tPage('trailer')}
              </h2>
              {game.trailer ? (
                 <YouTubeEmbed url={game.trailer} />
              ) : (
                 <div className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground font-mono text-[10px] md:text-xs">
                    NO TRAILER AVAILABLE
                 </div>
              )}
            </div>

            {/* Key Features */}
             <div>
               <h2 className="text-base md:text-xl font-heading text-white mb-3 md:mb-6 flex items-center gap-2">
                <ShieldCheck className="size-4 md:size-5 text-primary" /> {tPage('features')}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-white/5 border border-white/10 rounded-sm">
                    <span className="size-1 md:size-1.5 bg-primary mt-1.5 md:mt-2 shrink-0" />
                    <span className="text-[10px] md:text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
             </div>
          </div>
          
          {/* Sidebar - Actions & Info */}
          <div className="space-y-6 md:space-y-8">
            <div className="p-4 md:p-6 bg-white/5 border border-white/10 shadow-retro-sm">
              <h3 className="text-base md:text-xl font-heading text-white mb-4 md:mb-6 flex items-center gap-2">
                <Download className="size-4 md:size-5 text-primary" /> {tPage('play')}
              </h3>
              
                <GameActions 
                    slug={game.slug}
                    platforms={game.platforms}
                    locale={params.locale}
                    labels={{
                        googlePlay: tPage('googlePlay'),
                        playOnWeb: tPage('playOnWeb'),
                        comingSoon: tPage('comingSoon')
                    }}
                />
            </div>
            
            {/* Additional Info Block */}
             <div className="p-6 border border-white/10 bg-black/20 space-y-6">
               <ul className="space-y-4 text-sm font-sans">
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-muted-foreground">{tPage('releaseDate')}</span>
                   <span className="text-white">{game.releaseDate}</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-muted-foreground">{tPage('genre')}</span>
                   <span className="text-white">{tCats(game.category as any)}</span>
                 </li>
                 <li className="flex justify-between pb-2">
                   <span className="text-muted-foreground">{tPage('version')}</span>
                   <span className="text-white">v1.0.0</span>
                 </li>
               </ul>

               {/* Privacy Summary */}
               <div className="pt-4 border-t border-white/10">
                 <h4 className="text-xs font-heading text-primary uppercase mb-2">{tPage('privacy')}</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                   {game.privacy}
                 </p>
               </div>
             </div>
          </div>
        </div>
      </Container>
      
      <GameGallery images={game.gallery as string[]} />
      
    </article>
  );
}
