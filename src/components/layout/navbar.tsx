
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Home, Plus, User } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: <Home size={22} />, 
      label: 'Home', 
      path: '/',
    },
    { 
      icon: <Book size={22} />, 
      label: 'Library', 
      path: '/library',
    },
    { 
      icon: <BookOpen size={22} />, 
      label: 'Stacks', 
      path: '/stacks',
    },
    { 
      icon: <Plus size={22} />, 
      label: 'Add', 
      path: '/add',
    },
    { 
      icon: <User size={22} />, 
      label: 'Profile', 
      path: '/profile',
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
