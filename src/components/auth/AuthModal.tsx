
import React from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  view: 'login' | 'signup';
  switchView: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, view, switchView }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div 
          className="w-full max-w-md glass rounded-2xl shadow-xl animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6">
            <button
              className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">
                {view === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {view === 'login' 
                  ? 'Log in to access your mining dashboard' 
                  : 'Sign up to start mining Bitcoin today'}
              </p>
            </div>
            
            {view === 'login' ? <LoginForm /> : <SignupForm />}
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {view === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button 
                  className="ml-2 text-primary hover:text-primary/80 font-medium"
                  onClick={switchView}
                >
                  {view === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
