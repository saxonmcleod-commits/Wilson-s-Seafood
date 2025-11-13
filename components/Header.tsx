
import React, { useRef, useCallback } from 'react';
import { CameraIcon } from './icons/CameraIcon';

interface HeaderProps {
  logoSrc: string;
  isAdmin: boolean;
  onLogoChange: (dataUrl: string) => void;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, isAdmin, onLogoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onLogoChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onLogoChange]);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <header className="bg-white shadow-md">
      {isAdmin && (
        <div className="w-full bg-yellow-300 border-b border-yellow-400 text-yellow-900 text-center p-2 font-semibold text-sm">
          You are in Admin Mode. | <a href="/" className="underline hover:text-blue-600">View Public Site</a>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
        <div className="relative group w-64 h-48 md:w-80 md:h-64 flex items-center justify-center mb-4">
          <img
            src={logoSrc}
            alt="Wilson's Seafoods Logo"
            className="max-w-full max-h-full object-contain"
          />
          {isAdmin && (
            <>
              <button
                onClick={handleButtonClick}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                aria-label="Change logo"
              >
                <CameraIcon className="w-8 h-8 text-white" />
                <span className="ml-2 text-white font-semibold">Change Logo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 tracking-tight">
          Wilson's Seafoods
        </h1>
        <p className="mt-2 text-lg text-slate-600">Your Local Tasmanian Fishmonger</p>
      </div>
    </header>
  );
};

export default Header;
