'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from './navigation/NavBar';
import MenuOverlay from './navigation/MenuOverlay';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setScrolled(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <NavBar hasBg={scrolled} pathname={pathname} onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} pathname={pathname} onClose={() => setMenuOpen(false)} />
    </>
  );
}
