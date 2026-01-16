import { Container } from "@/components/ui/Container";
import { getTranslations } from 'next-intl/server';
import { Mail, Github, Twitter, Youtube } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'About' });
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-black relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <Container className="relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-heading text-white mb-6 uppercase tracking-wider">
               <span className="text-primary">{t('titlePrefix')}</span> {t('titleSuffix')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-sans max-w-xl">
              {t('heroText')}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <Container className="py-16 md:py-24 border-b border-white/10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-2xl font-heading text-white mb-6">{t('missionTitle')}</h2>
                 <p className="text-lg text-muted-foreground leading-relaxed font-sans mb-6">
                    {t('missionText1')}
                 </p>
                 <p className="text-lg text-muted-foreground leading-relaxed font-sans">
                    {t('missionText2')}
                 </p>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-transparent border border-white/10 rounded-lg relative overflow-hidden flex items-center justify-center">
                 {/* Abstract visual or logo placeholder */}
                 <div className="text-9xl">👾</div>
            </div>
        </div>
      </Container>
      
      {/* Contact / Socials */}
      <Container className="py-16 md:py-24 text-center">
        <h2 className="text-2xl font-heading text-white mb-8">{t('connectTitle')}</h2>
        
        <div className="flex justify-center gap-8">
            <a href="mailto:zhasulanov.erasyl@mail.ru" target="_blank" className="p-4 border border-white/10 bg-white/5 hover:border-primary hover:text-primary transition-colors">
                <Mail className="size-6" />
                <span className="sr-only">Email</span>
            </a>
            <a href="https://www.youtube.com/@redboxstudiogames1" target="_blank" className="p-4 border border-white/10 bg-white/5 hover:border-primary hover:text-primary transition-colors">
                <Youtube className="size-6" />
                <span className="sr-only">YouTube</span>
            </a>
            <a href="https://www.tiktok.com/@redboxstudiogames" target="_blank" className="p-4 border border-white/10 bg-white/5 hover:border-primary hover:text-primary transition-colors">
                {/* Custom TikTok Icon since Lucide doesn't have one */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-6"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                <span className="sr-only">TikTok</span>
            </a>
        </div>
      </Container>
    </div>
  );
}
