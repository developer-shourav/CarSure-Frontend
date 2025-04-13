import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import carGroup from '@/assets/carGroup.png';
import { WebsiteHeading } from "../WebsiteHeading/WebsiteHeading";
const faqs = [
  {
    question: "What is CarSure?",
    answer:
      "CarSure is your trusted platform for buying, selling, and managing cars with ease and confidence.",
  },
  {
    question: "How do I register an account?",
    answer:
      "Just click on the 'Sign Up' button on the homepage and fill in your details. It's quick and easy!",
  },
  {
    question: "Can I manage my orders online?",
    answer:
      "Yes! You can track, modify, and manage all your orders directly from your CarSure dashboard.",
  },
  {
    question: "Is there a return policy?",
    answer:
      "Yes, we offer a flexible return and refund policy within 7 days of purchase under certain conditions.",
  },
  {
    question: "Does CarSure offer any warranties?",
    answer:
      "We offer warranties on eligible vehicles. Look for the 'Certified with Warranty' badge when browsing listings.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out via our contact page or email us directly at support@carsure.com.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <WebsiteHeading title="Frequently Asked Questions" />
      <div className="w-full">
        <img src={carGroup} loading="lazy" alt="" />
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={cn(
                "rounded-xl border   bg-white dark:bg-zinc-900 hover:border-red-500 border-l-4  dark:hover:border-red-500 transition-all overflow-hidden",
                isOpen
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4  text-left text-gray-800 dark:text-gray-100  border-transparent "
              >
                <span className="text-base font-medium">{faq.question}</span>
                {isOpen ? (
                  <Minus className="w-5 h-5 text-red-500" />
                ) : (
                  <Plus className="w-5 h-5 text-red-500" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
