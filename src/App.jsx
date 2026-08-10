import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeAbout from './pages/HomeAbout';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import FloatingDialButton from './components/FloatingDialButton';
import './styles/main.css';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home', 'menu', 'contact'

  return (
    <div className="app-root">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === 'home' && <HomeAbout setActivePage={setActivePage} />}
        {activePage === 'menu' && <MenuPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      <Footer setActivePage={setActivePage} />
      <FloatingDialButton />
    </div>
  );
}
