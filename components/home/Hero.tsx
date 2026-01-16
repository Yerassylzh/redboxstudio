import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden">
      {/* Retro Grid Background - simplified with borders */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />
      
      <Container className="relative z-10 flex flex-col items-center text-center gap-8 md:gap-10">
        <div className="inline-flex items-center border border-white/20 bg-black px-4 py-2 text-[10px] font-heading text-primary uppercase tracking-widest shadow-retro-sm">
          <span className="size-2 bg-primary mr-3 animate-pulse" />
          {t('newRelease')}: Pixel Vanguard
        </div>
        
        <div className="relative inline-block my-4 md:my-8 text-balance">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[64px] font-heading text-white max-w-6xl mx-auto leading-[1.2] md:leading-[1.1] drop-shadow-md">
            <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl block mb-2">{t('titlePrefix')}</span> <span className="text-primary">{t('titleHighlight')}</span>
          </h1>
          {/* Decorative decorative elements */}
          <div className="absolute -top-12 -right-12 text-destructive animate-bounce hidden md:block opacity-50">
            <span className="text-6xl">👾</span>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto border-l-2 border-primary pl-6 py-2 text-left bg-white/5 mt-4 backdrop-blur-sm">
          <p className="text-sm md:text-xl text-muted-foreground font-sans leading-relaxed">
            {t('description')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 md:pt-10">
           <Button variant="default" size="default" asChild className="w-full sm:w-auto text-sm md:text-base shadow-retro-sm">
              <Link href="/games">{t('playBtn')}</Link>
           </Button>
           <Button variant="outline" size="default" asChild className="w-full sm:w-auto text-sm md:text-base border-white/50 hover:bg-white hover:text-black shadow-retro-sm">
              <Link href="/about">{t('aboutBtn')}</Link>
           </Button>
        </div>
      </Container>
    </section>
  )
}
