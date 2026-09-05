import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Phone, MessageSquare, Database, Search, Calendar, MapPin } from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error('Error fetching bookings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      (b.devoteeName && b.devoteeName.toLowerCase().includes(q)) ||
      (b.phoneNumber && b.phoneNumber.includes(q)) ||
      (b.pujaType && b.pujaType.toLowerCase().includes(q)) ||
      (b.bookingId && b.bookingId.toLowerCase().includes(q)) ||
      (b.cityArea && b.cityArea.toLowerCase().includes(q))
    );
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(20, 3, 6, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          maxHeight: '88vh',
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '2px solid #D4AF37',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            background: 'linear-gradient(135deg, #2A040C 0%, #4E0A17 50%, #2A040C 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F7DC6F'
              }}
            >
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#F7DC6F',
                  margin: 0,
                  lineHeight: '1.2'
                }}
              >
                Devotee Inquiries &amp; Bookings
              </h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255, 255, 255, 0.75)' }}>
                Persistent Database Records ({bookings.length} total entries)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={fetchBookings}
              disabled={loading}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'white',
                cursor: 'pointer'
              }}
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'white',
                cursor: 'pointer'
              }}
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div
          style={{
            padding: '14px 20px',
            background: '#FDFBF7',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              style={{
                width: '16px',
                height: '16px',
                color: '#997312',
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            <input
              type="text"
              placeholder="Search by devotee name, phone, booking ID, or puja..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 36px',
                borderRadius: '10px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                background: 'white',
                fontSize: '13px',
                outline: 'none',
                fontFamily: "'Inter', sans-serif"
              }}
            />
          </div>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#7A3D48', whiteSpace: 'nowrap' }}>
            Showing {filtered.length} of {bookings.length}
          </span>
        </div>

        {/* Bookings List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px', background: '#FAF7F2' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: '#7A3D48' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📭</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px' }}>No Bookings Found</h4>
              <p style={{ fontSize: '13px', margin: 0, opacity: 0.8 }}>
                {search ? 'Try adjusting your search query.' : 'New inquiries from the website will appear here in real-time.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filtered.map((b, idx) => (
                <div
                  key={b.bookingId || idx}
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    border: '1px solid rgba(212, 175, 55, 0.28)',
                    padding: '16px 20px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          color: '#4E0A17',
                          border: '1px solid #D4AF37',
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {b.bookingId}
                      </span>
                      <strong style={{ fontSize: '16px', color: '#2A040C' }}>
                        {b.devoteeName}
                      </strong>
                    </div>

                    <span
                      style={{
                        background: '#E8F5E9',
                        color: '#107C41',
                        border: '1px solid rgba(16, 124, 65, 0.3)',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 10px',
                        borderRadius: '100px'
                      }}
                    >
                      ✓ {b.status || 'Active Inquiry'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12.5px', color: '#4A1A22' }}>
                    <div>
                      <strong>Puja:</strong> <span style={{ color: '#4E0A17', fontWeight: '600' }}>{b.pujaType}</span>
                    </div>
                    {b.cityArea && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin className="w-3.5 h-3.5 text-amber-700" />
                        <span>{b.cityArea}</span>
                      </div>
                    )}
                    {b.pujaDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{b.pujaDate}</span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontSize: '11.5px', color: '#7A3D48' }}>
                      Received: {b.createdAt ? new Date(b.createdAt).toLocaleString() : 'Recent'}
                    </span>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a
                        href={`tel:${b.phoneNumber}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(78, 10, 23, 0.08)',
                          color: '#4E0A17',
                          border: '1px solid rgba(78, 10, 23, 0.25)',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{b.phoneNumber}</span>
                      </a>
                      <a
                        href={`https://wa.me/91${b.phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Namaste ${b.devoteeName} Ji! We received your booking request for ${b.pujaType}. Our senior Pandit Ji is ready to discuss the shubh muhurat.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#25D366',
                          color: 'white',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
