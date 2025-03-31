import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Faq } from "@shared/schema";
import { Loader2, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const FAQ = () => {
  const { data: faqs, isLoading } = useQuery<Faq[]>({
    queryKey: ['/api/faqs'],
  });
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 bg-light flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Часто задаваемые вопросы</h2>
          <p className="text-lg">Ответы на популярные вопросы о кондиционерах и нашей работе</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs?.map((faq, index) => (
              <Card key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="flex items-center justify-between w-full p-4 text-left font-medium bg-white hover:bg-secondary transition"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-primary transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`} 
                  />
                </button>
                <div
                  id={`faq-content-${index}`}
                  className={`p-4 border-t border-gray-200 bg-white transition-all duration-300 ease-in-out ${
                    openIndex === index ? "block" : "hidden"
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    {faq.answer.split('\n').map((paragraph, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
