import React from 'react';

export default function StatsCounter() {
  const stats = [
    { num: '15,000+', label: 'North Indian Families Blessed' },
    { num: '20,000+', label: 'Vedic Pujas & Hawan Conducted' },
    { num: '50+', label: 'Gurukul Certified Pandits' },
    { num: '20+', label: 'Years of Sacred Tradition' }
  ];

  return (
    <section id="stats">
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-item">
            <div className="stat-num">{stat.num}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-divider"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
