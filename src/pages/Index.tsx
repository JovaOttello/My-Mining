
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AuthModal from '../components/auth/AuthModal';
import WatchMiningButton from '../components/shared/WatchMiningButton';
import MiningProfitsCalculator from '../components/calculators/MiningProfitsCalculator';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

const Index = () => {
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('signup');
  
  const openModal = (view: 'login' | 'signup') => {
    setAuthView(view);
    setIsModalOpen(true);
  };
  
  const toggleView = () => {
    setAuthView(authView === 'login' ? 'signup' : 'login');
  };

  // FAQs data
  const faqItems = [
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
      question: "Is there a contract duration?",
      answer: "Our mining contracts are lifetime contracts, meaning they continue as long as they are profitable. There's no fixed end date, allowing you to earn mining rewards indefinitely."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Add Watch Mining Button Section */}
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Watch Our Mining Operation Live</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Get an exclusive look at our state-of-the-art Bitcoin mining facility in action. 
            See real-time hash rates, mining rewards, and more in our interactive dashboard.
          </p>
          <WatchMiningButton />
        </div>
        
        {/* Mining Profits Calculator Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-3">
              <Calculator size={16} />
              <span className="text-sm font-medium">Profit Estimation</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">Calculate Your Mining Profits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced profit calculator helps you estimate potential returns based on your investment. 
              Higher investments unlock more efficient mining hardware and better profit rates.
            </p>
          </div>
          
          <MiningProfitsCalculator />
        </div>
        
        <FeaturesSection />
        <HowItWorksSection />
        
        {/* FAQ Section */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our Bitcoin mining services
              </p>
            </div>
            
            <Accordion type="single" collapsible className="bg-card rounded-lg border">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-8">
              <a href="/faq" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                View all FAQs <ChevronDown size={16} className="mt-0.5" />
              </a>
            </div>
          </div>
        </div>
        
        <TestimonialsSection />
      </main>
      <Footer />
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        view={authView}
        switchView={toggleView}
      />
    </div>
  );
};

export default Index;
