
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Card from './Card';
import Button from './Button';

interface ChatQuestion {
  id: string;
  question: string;
  answer: string;
}

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const { toast } = useToast();

  const questions: ChatQuestion[] = [
    {
      id: 'q1',
      question: 'How do I start mining Bitcoin?',
      answer: 'To start mining with us, create an account, complete verification, and make your first deposit of at least $250 in Bitcoin. Your mining will begin automatically, and you can monitor performance through your dashboard.'
    },
    {
      id: 'q2',
      question: 'What are the minimum hardware requirements?',
      answer: 'None! Our cloud mining service handles all the hardware. You purchase hash power from our mining farms, and we maintain the equipment while you earn the rewards.'
    },
    {
      id: 'q3',
      question: 'How often will I receive mining rewards?',
      answer: 'Mining rewards are calculated daily and distributed to your account every 24 hours. You can track your earnings in real-time on your dashboard.'
    },
    {
      id: 'q4',
      question: 'Is there a contract lock-in period?',
      answer: 'No, our mining contracts are lifetime contracts that continue as long as they remain profitable. There\'s no fixed end date, allowing you to earn rewards indefinitely.'
    },
    {
      id: 'q5',
      question: 'How do I withdraw my earnings?',
      answer: 'You can withdraw your mining earnings through the Withdraw page in your dashboard. Withdrawals are processed within 24 hours and sent to your designated Bitcoin wallet.'
    },
    {
      id: 'q6',
      question: 'What happens if Bitcoin price drops?',
      answer: 'Bitcoin mining profitability is affected by Bitcoin\'s price. Our system automatically adjusts to market conditions to maximize profitability, though extended price drops may impact returns.'
    }
  ];

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestion(questionId);
  };

  const handleBackToQuestions = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-[90vw] sm:w-80 md:w-96 max-h-[70vh] overflow-hidden flex flex-col shadow-lg animate-fade-in">
          <div className="bg-primary p-3 md:p-4 flex justify-between items-center">
            <h3 className="text-primary-foreground font-medium text-sm md:text-base">Mining Assistant</h3>
            <button 
              onClick={toggleChatbot}
              className="text-primary-foreground hover:text-white/80 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-3 md:p-4 max-h-[50vh]">
            {selectedQuestion === null ? (
              <>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  Hi there! I'm your mining assistant. How can I help you today?
                </p>
                <div className="space-y-2">
                  {questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionClick(q.id)}
                      className="w-full text-left p-2 md:p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-xs md:text-sm transition-colors"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-3 md:space-y-4">
                <div className="bg-secondary p-2 md:p-3 rounded-lg text-xs md:text-sm">
                  {questions.find(q => q.id === selectedQuestion)?.question}
                </div>
                <div className="p-2 md:p-3 border border-border rounded-lg text-xs md:text-sm">
                  {questions.find(q => q.id === selectedQuestion)?.answer}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToQuestions}
                >
                  Back to questions
                </Button>
              </div>
            )}
          </div>
          
          <div className="border-t border-border p-3 md:p-4">
            <Button 
              fullWidth
              onClick={() => {
                toast({
                  title: "Live Support",
                  description: "Our support team will be with you shortly.",
                });
              }}
            >
              Talk to a Human
            </Button>
          </div>
        </Card>
      )}
      
      <button
        onClick={toggleChatbot}
        className={cn(
          "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        )}
      >
        <MessageCircle size={20} className="md:w-6 md:h-6" />
      </button>
    </div>
  );
};

export default ChatbotButton;
