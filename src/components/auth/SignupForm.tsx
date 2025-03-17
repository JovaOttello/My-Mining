import React, { useState } from 'react';
import { Mail, Lock, User, Facebook, Apple, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Button from '../shared/Button';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      
      // Simulate signup API call
      setTimeout(() => {
        // Store login state in localStorage (for demo purposes)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', formData.name);
        
        setIsLoading(false);
        
        toast({
          title: "Account Created",
          description: "Welcome to BitMine Social! Redirecting to deposit page...",
        });
        
        // Close modal and redirect to deposit page
        setTimeout(() => {
          navigate('/deposit');
          window.location.reload();
        }, 1000);
      }, 1500);
    }
  };

  const handleSocialSignup = (provider: string) => {
    toast({
      title: `${provider} Signup`,
      description: "Social signup will be available soon.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <User size={18} />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full pl-10 py-2 bg-secondary/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.name ? 'border-red-500' : 'border-input'
            }`}
          />
          {errors.name && (
            <div className="flex items-center mt-1 text-xs text-red-500">
              <AlertCircle size={12} className="mr-1" />
              {errors.name}
            </div>
          )}
        </div>
      </div>
      
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
            className={`w-full pl-10 py-2 bg-secondary/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.email ? 'border-red-500' : 'border-input'
            }`}
          />
          {errors.email && (
            <div className="flex items-center mt-1 text-xs text-red-500">
              <AlertCircle size={12} className="mr-1" />
              {errors.email}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
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
            className={`w-full pl-10 py-2 bg-secondary/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.password ? 'border-red-500' : 'border-input'
            }`}
          />
          {errors.password && (
            <div className="flex items-center mt-1 text-xs text-red-500">
              <AlertCircle size={12} className="mr-1" />
              {errors.password}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock size={18} />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full pl-10 py-2 bg-secondary/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.confirmPassword ? 'border-red-500' : 'border-input'
            }`}
          />
          {errors.confirmPassword && (
            <div className="flex items-center mt-1 text-xs text-red-500">
              <AlertCircle size={12} className="mr-1" />
              {errors.confirmPassword}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-start space-x-2">
        <input
          id="agreeTerms"
          name="agreeTerms"
          type="checkbox"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className={`h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary ${
            errors.agreeTerms ? 'border-red-500' : ''
          }`}
        />
        <label htmlFor="agreeTerms" className="text-sm text-muted-foreground">
          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>
      {errors.agreeTerms && (
        <div className="flex items-center -mt-2 ml-6 text-xs text-red-500">
          <AlertCircle size={12} className="mr-1" />
          {errors.agreeTerms}
        </div>
      )}
      
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
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
          onClick={() => handleSocialSignup('Facebook')}
        >
          Facebook
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          fullWidth 
          leftIcon={<Apple size={18} />}
          onClick={() => handleSocialSignup('Apple')}
        >
          Apple
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        By signing up, you agree to deposit a minimum of $250 in BTC to start mining.
      </p>
    </form>
  );
};

export default SignupForm;
