import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from "@/components/ui/Container"
import Image from "next/image";

export function Footer() {
  const t = useTranslations('Footer'); // Also using Navigation common terms where applicable if simplified, but using hardcoded keys for now to match strict json

  // Note: For "Games", "Studio" etc headers, I should have added them to dictionary. 
  // I will assume for now I can reuse or just keep english for headings if not critical, BUT user requested Russian version.
  // I'll update dictionary later for missing keys or just hardcode checking the 'Footer' namespace I created. 
  // Wait, I only added 'rights' and 'designed' to Footer namespace. 
  // I should update translations or just use "Navigation" keys for links.
  const nav = useTranslations('Navigation');
  
  // To avoid complex partial translation, I will add missing keys to dictionary in a following step or just use what I have.
  // Actually, I can use hardcoded strings for now and fix dictionaries in next step, OR update dictionaries first.
  // I'll update Header/Footer now and then do a pass on dictionaries.
  
  return (
    <footer className="border-t border-white/10 bg-card py-12 md:py-16">
      <Container className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 space-y-4">
           <Link href="/" className="flex items-center gap-2 group">
            <div className="relative size-8 shrink-0 group-hover:-translate-y-[2px] transition-transform">
              <Image 
                src="/logo.png" 
                alt="RedBoxStudio" 
                fill 
                className="object-contain drop-shadow-sm" 
              />
            </div>
            <span className="text-lg font-heading tracking-tight text-white group-hover:text-primary transition-colors">
              RedBoxStudio
            </span>
          </Link>
        <p className="text-xs text-muted-foreground max-w-xs font-sans">
             {t('description')}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-heading text-primary uppercase tracking-widest">{nav('games')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground font-sans">
            <li><Link href="/games?platform=android" className="hover:text-white hover:underline decoration-2 transition-all">{nav('android')}</Link></li>
            <li><Link href="/games?platform=web" className="hover:text-white hover:underline decoration-2 transition-all">{nav('web')}</Link></li>
            <li><Link href="/games" className="hover:text-white hover:underline decoration-2 transition-all">{nav('games')}</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-heading text-primary uppercase tracking-widest">{nav('about')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground font-sans">
             <li><Link href="https://www.youtube.com/@redboxstudiogames1" target="_blank" className="hover:text-white hover:underline decoration-2 transition-all">{nav('youtube')}</Link></li>
             <li><Link href="https://www.tiktok.com/@redboxstudiogames" target="_blank" className="hover:text-white hover:underline decoration-2 transition-all">{nav('tiktok')}</Link></li>
             <li><Link href="/about" className="hover:text-white hover:underline decoration-2 transition-all">{nav('about')}</Link></li>
          </ul>
        </div>
      </Container>
      
      <Container className="mt-12 pt-8 border-t-2 border-dashed border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-sans uppercase tracking-wider">
        <p>&copy; {new Date().getFullYear()} RedBoxStudio. {t('rights')}</p>
        <p>{t('designed')}</p>
      </Container>
    </footer>
  )
}
