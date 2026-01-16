import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface GameGalleryProps {
  images: string[];
}

export async function GameGallery({ images }: GameGalleryProps) {
  if (!images || images.length === 0) return null;
  const t = await getTranslations('GameGallery');

  return (
    <section className="py-16 bg-white/5 border-t border-white/10">
      <Container>
        <h2 className="text-2xl md:text-3xl font-heading text-white mb-8 border-l-4 border-primary pl-4">
          {t('title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} className="group relative aspect-video border-2 border-white/20 overflow-hidden shadow-retro-sm hover:border-white hover:shadow-retro transition-all duration-300">
              <Image
                src={img}
                alt={`Screenshot ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
