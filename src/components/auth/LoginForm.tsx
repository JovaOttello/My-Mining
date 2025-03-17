
import React, { useState } from 'react';
import { Mail, Lock, Facebook, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Button from '../shared/Button';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      // Store login state in localStorage (for demo purposes)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      
      setIsLoading(false);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to BitMine Social!",
      });
      
      // Close modal and redirect
      window.location.reload();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: "Social login will be available soon.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Mail size={18} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full pl-10 py-2 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <div className="flex justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <button 
            type="button"
            onClick={() => toast({
              title: "Password Reset",
              description: "Password reset functionality coming soon.",
            })}
            className="text-xs text-primary hover:text-primary/80"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock size={18} />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 py-2 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="rememberMe" className="text-sm text-muted-foreground">
          Remember me
        </label>
      </div>
      
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log In"}
      </Button>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          fullWidth 
          leftIcon={<Facebook size={18} />}
          onClick={() => handleSocialLogin('Facebook')}
        >
          Facebook
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          fullWidth 
          leftIcon={<Apple size={18} />}
          onClick={() => handleSocialLogin('Apple')}
        >
          Apple
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
