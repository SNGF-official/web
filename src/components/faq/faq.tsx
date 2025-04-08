import React, { JSX } from 'react';
import { Accordion } from '@radix-ui/react-accordion';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';

const faqData = [
  {
    question: "Quels types de graines proposez-vous ?",
    answer:
      "Nous proposons une large variété de graines : aromatiques, potagères, médicinales, exotiques, rares et biologiques."
  },
  {
    question: "Livrez-vous à l'international ?",
    answer:
      "Oui, nous livrons dans de nombreux pays avec des options d’expédition standard et express."
  },
  {
    question: "Comment conserver mes graines ?",
    answer:
      "Conservez-les dans un endroit sec, à l’abri de la lumière et de l’humidité pour prolonger leur durée de vie."
  },
  {
    question: "Avez-vous des conseils de plantation ?",
    answer:
      "Oui, chaque produit contient des instructions détaillées et notre blog regorge de tutoriels et de conseils pratiques."
  }
];

const FAQSection: React.FC = (): JSX.Element => {

  return (
    <section
      id="FAQ"
      className="w-full h-screen flex flex-col items-center justify-center min-h-auto bg-white py-24 sm:py-32 px-6 lg:px-8"
    >
      <div className="min-w-screen px-4 absolute sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex items-center justify-center">
          <h2 className="text-7xl sm:text-8xl font-extrabold text-[var(--base-green)] drop-shadow-xl">
            FAQ
          </h2>
        </div>

        <div className="max-w-2xl mx-auto ml-2">
          <h3 className="text-7xl font-bold relative text-gray-900 mb-6 text-center md:text-left">
            Des questions fréquentes ?
          </h3>
          <div className="divide-y divide-gray-200">
            {faqData.map((item, index) => (
              <Accordion type="single" collapsible>
                <AccordionItem value={index.toString()}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { FAQSection }