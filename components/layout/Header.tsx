import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"
import Image from "next/image";

export function Header() {
  const t = useTranslations('Navigation');

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-background/95 backdrop-blur-md transition-all">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative size-8 md:size-10 shrink-0 group-hover:-translate-y-[2px] transition-transform">
             <Image 
               src="/logo.png" 
               alt="RedBoxStudio" 
               fill 
               className="object-contain drop-shadow-sm" 
               priority
             />
          </div>
          <span className="text-sm md:text-base font-heading tracking-tight text-white group-hover:text-primary transition-colors">
            RedBoxStudio
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-4 items-center">
          <Link href="/" className="px-3 py-1 text-[10px] font-heading text-white border border-transparent hover:border-white/50 hover:bg-white/5 transition-all uppercase tracking-widest rounded-sm">{t('home')}</Link>
          <Link href="/games" className="px-3 py-1 text-[10px] font-heading text-white border border-transparent hover:border-white/50 hover:bg-white/5 transition-all uppercase tracking-widest rounded-sm">{t('games')}</Link>
          <Link href="/about" className="px-3 py-1 text-[10px] font-heading text-white border border-transparent hover:border-white/50 hover:bg-white/5 transition-all uppercase tracking-widest rounded-sm">{t('about')}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="premium" size="sm" asChild className="hidden md:inline-flex">
             <Link href="/games">{t('playGames')}</Link>
          </Button>
        </div>
      </Container>
    </header>
  )
}
