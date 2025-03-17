
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/shared/Card';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);

    // If opening a FAQ item (not closing), scroll to it
    if (openFaq !== index) {
      // Small delay to allow the DOM to update
      setTimeout(() => {
        const element = document.getElementById(`faq-item-${index}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const faqItems: FaqItem[] = [
    {
      question: "What is Bitcoin mining?",
      answer: "Bitcoin mining is the process by which new bitcoins are created and transactions are added to the blockchain. It involves powerful computers solving complex mathematical problems to validate and secure the Bitcoin network. In return for this work, miners receive rewards in the form of Bitcoin."
    },
    {
      question: "How does cloud mining work?",
      answer: "Cloud mining allows individuals to participate in Bitcoin mining without having to purchase, set up, and maintain mining hardware. Instead, you pay for mining power (hash rate) from our mining facilities, and we handle all the technical aspects. You receive mining rewards proportional to your purchased hash power."
    },
    {
      question: "What is the minimum deposit required?",
      answer: "The minimum deposit required to start mining with us is $250 worth of Bitcoin. This provides you with basic mining power to begin earning rewards."
    },
    {
      question: "How often are mining rewards paid out?",
      answer: "Mining rewards are calculated daily and distributed to your account every 24 hours. You can track your earnings in real-time on your dashboard."
    },
    {
      question: "How do I withdraw my earnings?",
      answer: "You can withdraw your mining earnings through the Withdraw page in your dashboard. Withdrawals are processed within 24 hours and sent to your designated Bitcoin wallet. The minimum withdrawal amount is 0.001 BTC."
    },
    {
      question: "Is there a contract duration?",
      answer: "Our mining contracts are lifetime contracts, meaning they continue as long as they are profitable. There's no fixed end date, allowing you to earn mining rewards indefinitely."
    },
    {
      question: "Can I upgrade my mining power?",
      answer: "Yes, you can upgrade your mining power at any time by making additional deposits. Increased mining power leads to higher daily rewards and better overall profitability."
    },
    {
      question: "What happens if Bitcoin price fluctuates?",
      answer: "Bitcoin mining profitability is affected by Bitcoin's price. When prices rise, your mining rewards become more valuable in fiat terms. Our system automatically adjusts to market conditions to maximize profitability."
    },
    {
      question: "Is my investment safe?",
      answer: "We employ advanced security measures to protect your funds and mining operations. Our facilities are monitored 24/7 with enterprise-grade security protocols. However, like all investments, cryptocurrency mining carries inherent risks related to market volatility and technology."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is simple: create an account, complete the verification process, make your first deposit of at least $250 in Bitcoin, and your mining will begin automatically. You can monitor your mining performance and earnings through your dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to the most common questions about our Bitcoin mining services
            </p>
          </div>
          
          <Card className="divide-y divide-border">
            {faqItems.map((faq, index) => (
              <div key={index} className="py-4" id={`faq-item-${index}`}>
                <button
                  className="w-full flex items-center justify-between text-left px-4 py-3 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="flex-shrink-0 text-primary" />
                  ) : (
                    <ChevronDown className="flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 py-3 text-muted-foreground">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </Card>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Didn't find the answer you were looking for?
            </p>
            <div className="inline-block">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onClick={(e) => {
                  e.preventDefault();
                  // Show toast instead of navigating
                  const { toast } = require('@/hooks/use-toast');
                  toast({
                    title: "Coming Soon",
                    description: "This feature will be available soon.",
                  });
                  
                  // Scroll to top
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
