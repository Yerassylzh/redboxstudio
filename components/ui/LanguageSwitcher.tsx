"use client"

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex gap-2 items-center">
       <button
          onClick={() => switchLocale('en')}
          className={cn(
             "text-[10px] font-heading uppercase p-1 hover:text-primary transition-colors",
             locale === 'en' ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground"
          )}
       >
          EN
       </button>
       <span className="text-muted-foreground text-[10px] select-none">/</span>
       <button
          onClick={() => switchLocale('ru')}
          className={cn(
             "text-[10px] font-heading uppercase p-1 hover:text-primary transition-colors",
             locale === 'ru' ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground"
          )}
       >
          RU
       </button>
    </div>
  );
}
