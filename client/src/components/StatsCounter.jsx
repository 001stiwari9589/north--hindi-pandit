import React, { useState, useEffect, useRef } from 'react';

function CounterItem({ target, suffix = '+', label }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is available, trigger when in viewport
    if (typeof IntersectionObserver !== 'undefined' && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(elementRef.current);
      return () => observer.disconnect();
    } else {
      // Fallback: start immediately
      setStarted(true);
    }
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 2200; // 2.2 seconds animation
    let animationFrameId;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * target);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [started, target]);

  return (
    <div ref={elementRef} className="stat-item">
      <div className="stat-num">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-divider"></div>
    </div>
  );
}

export default function StatsCounter() {
  const stats = [
    { target: 15000, suffix: '+', label: 'North Indian Families Blessed' },
    { target: 20000, suffix: '+', label: 'Vedic Pujas & Hawan Conducted' },
    { target: 50, suffix: '+', label: 'Gurukul Certified Pandits' },
    { target: 20, suffix: '+', label: 'Years of Sacred Tradition' }
  ];

  return (
    <section id="stats">
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <CounterItem
            key={idx}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
