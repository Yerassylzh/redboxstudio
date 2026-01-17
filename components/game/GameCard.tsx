  import Image from "next/image"
import { Link } from '@/i18n/routing';
import { ArrowRight } from "lucide-react";

import { useTranslations } from "next-intl";

interface GameCardProps {
  title: string
  category: string
  image: string
  slug: string
  platforms: {
    android?: string
    web?: string
  }
}

export function GameCard({ title, category, image, slug }: GameCardProps) {
  const tCats = useTranslations('Categories');

  return (
    <Link href={`/game/${slug}`} className="group relative block h-full"> 
      <div className="bg-card border-2 border-white/90 shadow-retro h-full flex flex-col transition-colors duration-300">
        {/* Image Container */}
        <div className="aspect-[4/3] relative border-b-2 border-white/90 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 image-pixelated"
          />
          {/* Hover Overlay - simplified */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-heading text-sm text-white group-hover:text-primary transition-colors leading-tight">{title}</h3>
            <div className="inline-block px-2 py-1 bg-white/10 text-[8px] text-white uppercase tracking-widest font-heading border border-white/20">
              {tCats(category)}
            </div>
          </div>
          
          {/* Right Icon */}
          <div className="size-8 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-colors">
             <ArrowRight className="size-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
