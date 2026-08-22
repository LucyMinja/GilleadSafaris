'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from './navigation/NavBar';
import MenuOverlay from './navigation/MenuOverlay';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  // Pages built around a full-bleed hero want a transparent nav until you
  // scroll past it — but a page like the booking success screen has no
  // hero at all, so a scroll-driven transparent nav would render pale text
  // on the plain page background with nothing dark behind it to read
  // against. Those pages fire 'gillead:force-nav-solid' on mount instead
  // of relying on scroll position.
  const [forcedSolid, setForcedSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    const onForceSolid = () => setForcedSolid(true);
    window.addEventListener('gillead:force-nav-solid', onForceSolid);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('gillead:force-nav-solid', onForceSolid);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setScrolled(false);
    setForcedSolid(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <NavBar hasBg={scrolled || forcedSolid} pathname={pathname} onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} pathname={pathname} onClose={() => setMenuOpen(false)} />
    </>
  );
}
