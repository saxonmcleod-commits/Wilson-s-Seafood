
import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Hours from './components/Hours';
import Footer from './components/Footer';
import AuthComponent from './components/Auth';
import { FISH_PRODUCTS, OPENING_HOURS, INITIAL_LOGO_URL } from './constants';
import { FishProduct } from './types';
import { supabase } from './src/supabaseClient';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [products, setProducts] = useState<FishProduct[]>([]);
  const [logoUrl, setLogoUrl] = useState<string>(INITIAL_LOGO_URL);

  const onAdminPage = window.location.pathname.startsWith('/admin');
  const isAdmin = onAdminPage && !!session;

  // Load products from localStorage on initial render
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('fishProducts');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(FISH_PRODUCTS);
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
      setProducts(FISH_PRODUCTS);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('fishProducts', JSON.stringify(products));
    }
  }, [products]);

  // Load logo from localStorage on initial render
  useEffect(() => {
    try {
      const storedLogo = localStorage.getItem('logoUrl');
      if (storedLogo) {
        setLogoUrl(storedLogo);
      }
    } catch (error) {
      console.error("Failed to load logo from localStorage", error);
    }
  }, []);

  // Check for and manage user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogoChange = (newLogoDataUrl: string) => {
    setLogoUrl(newLogoDataUrl);
    localStorage.setItem('logoUrl', newLogoDataUrl);
  };

  const handleAddProduct = (newProductData: Omit<FishProduct, 'id'>) => {
    const newProduct: FishProduct = {
      ...newProductData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: FishProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // If on the admin path but not logged in, show the login form
  if (onAdminPage && !session) {
    return <AuthComponent />;
  }

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 font-sans">
      <Header
        logoSrc={logoUrl}
        isAdmin={isAdmin}
        onLogoChange={handleLogoChange}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-12">
          <section id="products" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Fresh From The Ocean</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Proudly offering the freshest, locally sourced seafood in Tasmania. Check out today's catch!
            </p>
            <ProductList
              products={products}
              isAdmin={isAdmin}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </section>

          <section id="hours" className="text-center">
             <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Opening Hours</h2>
            <Hours hours={OPENING_HOURS} />
          </section>
        </div>
      </main>
      <Footer isAdmin={isAdmin} />
    </div>
  );
};

export default App;
