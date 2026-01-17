import { useTranslations } from 'next-intl';
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { AnimateInView } from "@/components/ui/AnimateInView";

export function FAQ() {
  const t = useTranslations('FAQ');

  return (
    <section className="bg-white/5 py-24 mb-20 border-y border-white/10">
      <Container className="max-w-4xl">
        <AnimateInView>
            <h2 className="text-3xl md:text-4xl font-heading text-white mb-12 text-center drop-shadow-sm">{t('title')}</h2>
            <Accordion items={[
            {
                question: t('q1'),
                answer: t('a1')
            },
            {
                question: t('q2'),
                answer: t('a2')
            },
            {
                question: t('q3'),
                answer: t('a3')
            }
            ]} />
        </AnimateInView>
      </Container>
    </section>
  )
}
