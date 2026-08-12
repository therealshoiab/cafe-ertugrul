import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeAbout from './pages/HomeAbout';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import FloatingDialButton from './components/FloatingDialButton';
import './styles/main.css';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home', 'menu', 'contact', 'admin'
  const [menuKey, setMenuKey] = useState(0); // Force refresh menu pages when admin makes edits

  const handleMenuUpdate = () => {
    setMenuKey(prev => prev + 1);
  };

  return (
    <div className="app-root">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === 'home' && <HomeAbout setActivePage={setActivePage} key={`home-${menuKey}`} />}
        {activePage === 'menu' && <MenuPage key={`menu-${menuKey}`} />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'admin' && <AdminPage onMenuUpdate={handleMenuUpdate} />}
      </main>

      <Footer setActivePage={setActivePage} />
      <FloatingDialButton />
    </div>
  );
}
