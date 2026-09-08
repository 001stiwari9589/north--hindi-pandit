import React, { useState, useEffect, useRef } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳', label: 'HI' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', label: 'TE' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳', label: 'BN' }
];

export function applyLanguage(code) {
  const domain = window.location.hostname;
  localStorage.setItem('site_lang', code);

  // Set Google Translate cookie
  if (code === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
  } else {
    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=${domain};`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=.${domain};`;
  }

  // Trigger Google Translate dropdown change event
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = code;
    select.dispatchEvent(new Event('change'));
  }
}

export default function LanguageSwitcher({ currentLang = 'en', onSelectLang, isMobileDrawer = false }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (code) => {
    applyLanguage(code);
    if (onSelectLang) {
      onSelectLang(code);
    }
    setOpen(false);
  };

  // If rendered inside mobile drawer: clean button grid
  if (isMobileDrawer) {
    return (
      <div className="mobile-lang-drawer-wrap" style={{ marginTop: '6px', marginBottom: '8px' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#8c6b38', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
          🌐 Select Language / भाषा चुनें
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
          {LANGUAGES.map((l) => {
            const isSelected = l.code === currentLang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '7px 4px',
                  borderRadius: '10px',
                  border: isSelected ? '1.5px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.25)',
                  background: isSelected ? 'linear-gradient(135deg, #4A0B16 0%, #2A040C 100%)' : '#FFFDF9',
                  color: isSelected ? '#FEF08A' : '#4A0B16',
                  fontWeight: isSelected ? '700' : '600',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(74, 11, 22, 0.25)' : 'none'
                }}
              >
                <span style={{ fontSize: '12px' }}>{l.flag}</span>
                <span style={{ marginTop: '2px', lineHeight: '1.2' }}>{l.native}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Header Dropdown Pill Button
  return (
    <div className="lang-switcher-container" ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        className="lang-switcher-btn"
        onClick={() => setOpen(!open)}
        aria-label="Select Language"
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 253, 248, 0.95)',
          border: '1.5px solid #D4AF37',
          borderRadius: '100px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '12.5px',
          fontWeight: '700',
          color: '#3B0813',
          boxShadow: '0 2px 6px rgba(42, 4, 12, 0.06)',
          transition: 'all 0.2s ease'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>{activeLang.flag}</span>
          <span>{activeLang.native}</span>
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8c6b38"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Floating Divine Dropdown */}
      {open && (
        <div
          className="lang-dropdown-menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '160px',
            background: '#FFFDF9',
            border: '1.5px solid #D4AF37',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(42, 4, 12, 0.15)',
            padding: '6px',
            zIndex: 99999,
            animation: 'fadeIn 0.18s ease-out'
          }}
        >
          <div style={{ padding: '4px 8px 6px', fontSize: '10.5px', fontWeight: '800', color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: '1px solid #f3e8d2', marginBottom: '4px' }}>
            Choose Language
          </div>

          {LANGUAGES.map((l) => {
            const isSelected = l.code === currentLang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(212, 175, 55, 0.18)' : 'transparent',
                  border: 'none',
                  color: isSelected ? '#831843' : '#1f2937',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  fontWeight: isSelected ? '700' : '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>{l.flag}</span>
                  <span>{l.native}</span>
                  {l.code !== 'en' && (
                    <span style={{ fontSize: '10.5px', color: '#9ca3af', fontWeight: '400' }}>({l.name})</span>
                  )}
                </div>
                {isSelected && (
                  <span style={{ color: '#b45309', fontWeight: '900', fontSize: '14px' }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
