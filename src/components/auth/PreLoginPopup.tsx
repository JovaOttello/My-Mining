
import React, { useState, useEffect } from 'react';
import { Apple, Facebook, Loader2, Mail } from 'lucide-react';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Button from '../shared/Button';
import Logo from '../shared/Logo';
import { useAuth } from '@/context/AuthContext';

interface PreLoginPopupProps {
  onLoginSuccess: () => void;
}

const PreLoginPopup: React.FC<PreLoginPopupProps> = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  
  const handleSocialLogin = (provider: string) => {
    // Validate name
    if (!fullName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name before logging in.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(provider);
    
    // Simulate API call with loading state
    setTimeout(() => {
      // Create email based on provider
      const generatedEmail = `${fullName.toLowerCase().replace(/\s+/g, '.')}@${provider.toLowerCase()}.com`;
      
      // Use the login function from context
      login(generatedEmail, fullName, provider);
      
      setIsLoading(null);
      toast({
        title: "Login Successful",
        description: `Welcome to BitMine Social, ${fullName}!`,
      });
      
      onLoginSuccess();
    }, 1500);
  };
  
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name
    if (!fullName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name before logging in.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading('Email');
    
    // Validate email
    if (!email.includes('@') || password.length < 6) {
      toast({
        title: "Login Failed",
        description: "Please enter a valid email and password (min 6 characters).",
        variant: "destructive",
      });
      setIsLoading(null);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Use the login function from context
      login(email, fullName, 'Email');
      
      setIsLoading(null);
      toast({
        title: "Login Successful",
        description: `Welcome to BitMine Social, ${fullName}!`,
      });
      
      onLoginSuccess();
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"></div>
      
      {/* Login modal */}
      <div className="relative w-full max-w-md p-8 animate-scale-in glass-card rounded-2xl">
        <div className="mb-8 text-center">
          <Logo size="lg" />
          <h2 className="mt-6 text-2xl font-bold text-gradient">Welcome to BitMine Social</h2>
          <p className="mt-2 text-muted-foreground">
            Log in to start mining Bitcoin today
          </p>
        </div>
        
        {/* Full Name field (shown in both views) */}
        <div className="mb-6 space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-3 py-2 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        {showEmailLogin ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 py-2 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading === 'Email'}
            >
              {isLoading === 'Email' ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In with Email"
              )}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowEmailLogin(false)}
                className="text-sm text-primary hover:underline"
              >
                Back to social login options
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid gap-4">
              <Button
                fullWidth
                variant="outline"
                className="bg-white/10 hover:bg-white/20 py-3"
                leftIcon={<FaGoogle className="text-[#4285F4]" size={18} />}
                disabled={!!isLoading}
                onClick={() => handleSocialLogin('Google')}
              >
                {isLoading === 'Google' ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Connecting to Google...
                  </>
                ) : (
                  "Continue with Google"
                )}
              </Button>
              
              <Button
                fullWidth
                variant="outline"
                className="bg-white/10 hover:bg-white/20 py-3"
                leftIcon={<Apple className="text-[#A2AAAD]" size={18} />}
                disabled={!!isLoading}
                onClick={() => handleSocialLogin('Apple')}
              >
                {isLoading === 'Apple' ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Connecting to Apple...
                  </>
                ) : (
                  "Continue with Apple"
                )}
              </Button>
              
              <Button
                fullWidth
                variant="outline"
                className="bg-white/10 hover:bg-white/20 py-3"
                leftIcon={<Facebook className="text-[#3b5998]" size={18} />}
                disabled={!!isLoading}
                onClick={() => handleSocialLogin('Facebook')}
              >
                {isLoading === 'Facebook' ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Connecting to Facebook...
                  </>
                ) : (
                  "Continue with Facebook"
                )}
              </Button>
              
              <Button
                fullWidth
                variant="outline"
                className="bg-white/10 hover:bg-white/20 py-3"
                leftIcon={<FaMicrosoft className="text-[#00A4EF]" size={18} />}
                disabled={!!isLoading}
                onClick={() => handleSocialLogin('Microsoft')}
              >
                {isLoading === 'Microsoft' ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Connecting to Microsoft...
                  </>
                ) : (
                  "Continue with Microsoft"
                )}
              </Button>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowEmailLogin(true)}
            >
              Continue with Email
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PreLoginPopup;
