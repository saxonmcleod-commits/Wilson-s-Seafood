
import React from 'react';

interface FooterProps {
  isAdmin: boolean;
}

const Footer: React.FC<FooterProps> = ({ isAdmin }) => {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Wilson's Seafoods. All Rights Reserved.</p>
        <p className="mt-1 text-sm">Freshness you can taste, from our shores to your table.</p>
        {!isAdmin && (
           <div className="mt-4 text-xs text-slate-400">
             <a href="/admin" className="hover:underline">Admin Panel</a>
           </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
