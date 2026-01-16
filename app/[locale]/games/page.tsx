import { useTranslations } from 'next-intl';
import { Container } from "@/components/ui/Container";
import { getGames } from '@/lib/games';
import { GamesGrid } from '@/components/game/GamesGrid';
import { getTranslations } from 'next-intl/server';

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const games = await getGames(locale);
  const t = await getTranslations('GamesList'); 

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-white/10 pb-8">
           <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-heading text-white text-balance">
                <span className="text-primary">{t('titlePrefix')}</span> {t('title')}
              </h1>
              <p className="text-muted-foreground font-sans max-w-md text-sm md:text-base">
                {t('subtitle')}
              </p>
           </div>
        </div>

        {/* Interactive Grid */}
        <GamesGrid games={games} />

      </Container>
    </div>
  )
}
