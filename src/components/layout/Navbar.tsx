
import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Logo from '../shared/Logo';
import Button from '../shared/Button';
import AuthModal from '../auth/AuthModal';
import NoFundsModal from '../modals/NoFundsModal';

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isNoFundsModalOpen, setIsNoFundsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setUserMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  // Navbar links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Deposit', path: '/deposit' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  const openModal = (view: 'login' | 'signup') => {
    setAuthView(view);
    setIsModalOpen(true);
  };

  const handleNavLinkClick = (path: string) => {
    if (path === '/dashboard' || path === '/deposit') {
      if (!isLoggedIn) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access this feature.",
          variant: "destructive",
        });
        openModal('login');
        return;
      }
    }
    
    if (path === '/withdraw') {
      if (!isLoggedIn) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access this feature.",
          variant: "destructive",
        });
        openModal('login');
        return;
      }
      setIsNoFundsModalOpen(true);
      return;
    }
    
    if (path !== '/' && path !== '/deposit' && path !== '/dashboard' && path !== '/faq' && path !== '/about') {
      toast({
        title: "Coming Soon",
        description: "This feature will be available soon.",
      });
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md shadow-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/">
            <Logo size="sm" className="scale-75 md:scale-100" />
          </Link>
          
          {/* Make navigation links always visible, even on mobile */}
          <nav className="flex items-center gap-2 sm:gap-6 overflow-x-auto whitespace-nowrap pb-1 hide-scrollbar">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path === '/deposit' || link.path === '/dashboard' || link.path === '/' || link.path === '/faq' || link.path === '/about'
                  ? link.path
                  : '#'}
                className={`text-xs sm:text-sm font-medium transition-colors hover:text-primary relative px-1 py-2
                  ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => handleNavLinkClick(link.path)}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<User size={16} />}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="py-1 px-2 sm:py-1.5 sm:px-3"
                >
                  <span className="hidden sm:inline">{user?.name || 'User'}</span>
                </Button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg z-50 py-1 border border-border">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium">{user?.name}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm hover:bg-background/50 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/deposit" 
                      className="block px-4 py-2 text-sm hover:bg-background/50 transition-colors"
                    >
                      Deposit
                    </Link>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-background/50 transition-colors flex items-center"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} className="mr-2" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openModal('login')}
                  className="py-1 px-2 sm:py-1.5 sm:px-3"
                >
                  <span className="hidden sm:inline">Log In</span>
                  <span className="sm:hidden">Log</span>
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => openModal('signup')}
                  className="py-1 px-2 sm:py-1.5 sm:px-3"
                >
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Sign</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        view={authView}
        switchView={() => setAuthView(authView === 'login' ? 'signup' : 'login')}
      />
      
      <NoFundsModal 
        isOpen={isNoFundsModalOpen}
        onClose={() => setIsNoFundsModalOpen(false)}
      />

      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}
      </style>
    </>
  );
};

export default Navbar;
