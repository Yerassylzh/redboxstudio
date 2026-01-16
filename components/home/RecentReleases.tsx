import { Link } from '@/i18n/routing';
import { getTranslations, getLocale } from 'next-intl/server';
import { Container } from "@/components/ui/Container";
import { GameCard } from "@/components/game/GameCard";
import { ChevronRight } from "lucide-react";
import { getRecentGames } from '@/lib/games';

export async function RecentReleases() {
  const t = await getTranslations('Home');
  const locale = await getLocale();
  const recentGames = await getRecentGames(locale, 3);

  return (
    <section className="py-20">
      <Container>
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <h2 className="text-lg md:text-3xl font-heading text-white">{t('recentReleases')}</h2>
          <Link href="/games" className="group flex items-center text-primary font-heading text-[10px] md:text-xs hover:text-primary/80 transition-colors uppercase tracking-widest">
            {t('viewAll')} <ChevronRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentGames.map((game) => (
            <GameCard key={game.slug} {...game} />
          ))}
        </div>
      </Container>
    </section>
  )
}
