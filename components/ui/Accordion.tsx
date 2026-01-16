"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  question: string
  answer: string
  isOpen?: boolean
  onClick?: () => void
}

function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border border-white/20 bg-card shadow-retro-sm mb-4 last:mb-0 transition-transform hover:-translate-y-[2px] hover:shadow-retro">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 font-heading text-sm md:text-base leading-snug"
      >
        <span className="text-white mr-4">{question}</span>
        <ChevronDown
          className={cn(
            "size-5 text-primary transition-transform duration-200 shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="overflow-hidden" // Crucial for preventing overlap during collapse
          >
            <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t-2 border-white/10 font-sans text-sm md:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AccordionProps {
  items: { question: string; answer: string }[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
