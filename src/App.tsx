
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PreLoginPopup from "./components/auth/PreLoginPopup";
import Index from "./pages/Index";
import Deposit from "./pages/Deposit";
import Dashboard from "./pages/Dashboard";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import ChatbotButton from "./components/shared/ChatbotButton";
import WhatsAppButton from "./components/shared/WhatsAppButton";
import LiveMiningSimulation from "./pages/LiveMiningSimulation";
import DemoMiningDashboard from "./pages/DemoMiningDashboard";
import ScrollToTopButton from "./components/shared/ScrollToTopButton";

const queryClient = new QueryClient();

// Create a component to handle the login popup and app content
const AppContent = () => {
  const { isLoggedIn, loading } = useAuth();
  const [showingLoginPopup, setShowingLoginPopup] = useState(true);
  
  useEffect(() => {
    // If user is logged in, hide the login popup
    if (isLoggedIn) {
      setShowingLoginPopup(false);
    }
  }, [isLoggedIn]);
  
  const handleLoginSuccess = () => {
    setShowingLoginPopup(false);
  };
  
  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <>
      {/* Pre-login popup - only show if not logged in */}
      {!isLoggedIn && showingLoginPopup && (
        <PreLoginPopup onLoginSuccess={handleLoginSuccess} />
      )}
      
      {/* Only show main content when logged in or popup is dismissed */}
      <div className={!isLoggedIn && showingLoginPopup ? "blur-sm pointer-events-none" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<About />} />
          <Route path="/live-mining" element={<LiveMiningSimulation />} />
          <Route path="/demo-mining" element={<DemoMiningDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Add chatbot and WhatsApp buttons with improved spacing */}
        <div className="fixed-button-container">
          <ChatbotButton />
          <WhatsAppButton phoneNumber="+19132385319" />
        </div>

        {/* Add the scroll to top button */}
        <ScrollToTopButton />
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
