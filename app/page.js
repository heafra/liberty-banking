'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ACCOUNT_ID = '9337910';
const PASSWORD = 'mycheckings';

/* ─── MOBILE-RESPONSIVE STYLES ─── */
const mobileStyles = `
  @media (max-width: 768px) {
    .lb-nav-links { display: none !important; }
    .lb-hero-buttons { flex-direction: column !important; }
    .lb-hero-buttons a, .lb-hero-buttons button { width: 100% !important; justify-content: center !important; }
    .lb-hero-stats { grid-template-columns: 1fr 1fr !important; max-width: 100% !important; gap: 20px !important; }
    .lb-about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .lb-about-img-wrap { padding-bottom: 32px !important; }
    .lb-services-grid { grid-template-columns: 1fr !important; }
    .lb-why-grid { grid-template-columns: 1fr !important; }
    .lb-testimonials-grid { grid-template-columns: 1fr !important; }
    .lb-digital-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .lb-contact-grid { grid-template-columns: 1fr !important; }
    .lb-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    .lb-section { padding: 60px 20px !important; }
    .lb-hero { padding: 60px 20px !important; }
    .lb-hero-title { font-size: 32px !important; }
    .lb-nav-inner { padding: 14px 20px !important; }
    .lb-login-box { padding: 32px 24px !important; }
  }
  @media (max-width: 480px) {
    .lb-hero-stats { grid-template-columns: 1fr !important; }
    .lb-footer-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function HomePage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (accountId === ACCOUNT_ID && password === PASSWORD) {
      router.push('/dashboard');
    } else {
      setError('Invalid Account ID or Password. Please try again.');
    }
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', margin: 0, padding: 0 }}>
      <style>{mobileStyles}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        background: '#0a2240', color: '#fff', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}>
        <div className="lb-nav-inner" style={{
          maxWidth: 1200, margin: '0 auto', padding: '18px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"
                stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 1 }}>Liberty Banking</div>
              <div style={{ fontSize: 9, color: '#d4af37', letterSpacing: 3, textTransform: 'uppercase' }}>
                Trusted Since 1952
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {/* Nav links — hidden on mobile via CSS */}
            <div className="lb-nav-links" style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 600 }}>
              {['About', 'Services', 'Why Us', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`}
                  style={{ color: '#fff', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#d4af37'}
                  onMouseLeave={e => e.target.style.color = '#fff'}
                >{link}</a>
              ))}
            </div>

            {/* Login button — always visible, mobile-safe */}
            <button
              onClick={() => setShowLogin(true)}
              style={{
                background: '#d4af37', color: '#0a2240', padding: '10px 24px',
                border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 14,
                cursor: 'pointer', letterSpacing: 1, whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                position: 'relative', zIndex: 10,
              }}
            >Login</button>
          </div>
        </div>
      </nav>

      {/* ─── LOGIN MODAL ─── */}
      {showLogin && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          overflowY: 'auto',
        }}>
          <div className="lb-login-box" style={{
            background: '#fff', borderRadius: 20, padding: '44px 40px', width: '100%',
            maxWidth: 440, position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
            margin: 'auto',
          }}>
            <button onClick={() => { setShowLogin(false); setError(''); setAccountId(''); setPassword(''); }}
              style={{
                position: 'absolute', top: 16, right: 20, background: 'none', border: 'none',
                fontSize: 28, cursor: 'pointer', color: '#888', lineHeight: 1,
              }}>×</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"
                  stroke="#0a2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div style={{ fontSize: 21, fontWeight: 800, color: '#0a2240' }}>Liberty Banking</div>
                <div style={{ fontSize: 10, color: '#888', letterSpacing: 2, textTransform: 'uppercase' }}>
                  Secure Online Banking
                </div>
              </div>
            </div>
            <p style={{ color: '#555', fontSize: 13, marginBottom: 28, marginTop: 6 }}>
              Sign in to access your accounts and services.
            </p>

            <form onSubmit={handleLogin}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6 }}>
                Account ID
              </label>
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: 13, opacity: 0.4 }}
                  width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="9" cy="7" r="4" stroke="#333" strokeWidth="2" />
                </svg>
                <input
                  type="text"
                  value={accountId}
                  onChange={e => { setAccountId(e.target.value); setError(''); }}
                  placeholder="Enter your Account ID"
                  required
                  style={{
                    width: '100%', padding: '12px 14px 12px 44px', border: '1.5px solid #ddd',
                    borderRadius: 10, fontSize: 15, outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#0a2240'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: 13, opacity: 0.4 }}
                  width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#333" strokeWidth="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter your Password"
                  required
                  style={{
                    width: '100%', padding: '12px 14px 12px 44px', border: '1.5px solid #ddd',
                    borderRadius: 10, fontSize: 15, outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#0a2240'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>

              {error && (
                <div style={{
                  background: '#fff0f0', border: '1px solid #f5c6cb', color: '#c62828',
                  borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16,
                }}>
                  {error}
                </div>
              )}

              <button type="submit" style={{
                width: '100%', background: '#0a2240', color: '#fff', padding: '14px',
                border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 800,
                cursor: 'pointer', marginBottom: 12,
              }}>
                Sign In to Your Account
              </button>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa', margin: 0 }}>
                🔒 Secured by 256-bit SSL Encryption
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '88vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0a2240 0%, #0f3060 50%, #1a4080 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.12,
          backgroundImage: 'url(https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div className="lb-hero" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px', position: 'relative', color: '#fff', width: '100%', boxSizing: 'border-box' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37',
            color: '#d4af37', padding: '8px 18px', borderRadius: 999,
            fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24,
          }}>
            🛡 FDIC Insured Institution
          </div>
          <h1 className="lb-hero-title" style={{ fontSize: 'clamp(30px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 24px' }}>
            Banking Built On<br />
            <span style={{ color: '#d4af37' }}>Trust & Freedom</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(200,220,255,0.9)', maxWidth: 600, lineHeight: 1.8, margin: '0 0 36px' }}>
            Liberty Banking has served American families for over 70 years. Experience banking that puts your financial freedom first — industry-leading security, competitive rates, and unmatched personal service.
          </p>
          <div className="lb-hero-buttons" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => setShowLogin(true)} style={{
              background: '#d4af37', color: '#0a2240', padding: '15px 32px',
              border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 15,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            }}>
              Access Online Banking →
            </button>
            <a href="#services" style={{
              border: '2px solid #fff', color: '#fff', padding: '15px 32px',
              borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="lb-hero-stats" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28,
            marginTop: 56, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 36, maxWidth: 520,
          }}>
            {[['$48B+', 'Assets Under Management'], ['3.2M+', 'Satisfied Customers'], ['70+', 'Years of Service']].map(
              ([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#d4af37' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(200,220,255,0.8)', marginTop: 4 }}>{label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="lb-section" style={{ padding: '88px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lb-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Our Story</div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#0a2240', lineHeight: 1.2, margin: '0 0 20px' }}>
                America's Most Trusted Community Bank
              </h2>
              <p style={{ color: '#555', lineHeight: 1.9, marginBottom: 18, fontSize: 15 }}>
                Founded in 1952, Liberty Banking was built on the principle that every citizen deserves access to fair, transparent, and dignified banking. We believe financial freedom is not a privilege — it's a right.
              </p>
              <p style={{ color: '#555', lineHeight: 1.9, marginBottom: 32, fontSize: 15 }}>
                Today, we serve millions across all 50 states with everything from everyday checking to sophisticated wealth management, while maintaining the personal touch that has defined us for seven decades.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['🛡', 'FDIC Insured'], ['🌐', 'Nationwide Access'], ['⭐', 'Award Winning'], ['👥', '3.2M+ Customers']].map(
                  ([icon, label]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#f8f9fa', borderRadius: 12 }}>
                      <div style={{ background: '#0a2240', padding: 9, borderRadius: 10, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
                      <span style={{ fontWeight: 700, color: '#0a2240', fontSize: 13 }}>{label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="lb-about-img-wrap" style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                alt="Liberty Banking branch"
                style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: -20, left: 20, background: '#d4af37',
                color: '#0a2240', padding: '18px 24px', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}>
                <div style={{ fontSize: 26, fontWeight: 900 }}>70+</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="lb-section" style={{ padding: '88px 32px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Our Services</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#0a2240', margin: '0 0 14px' }}>Comprehensive Financial Solutions</h2>
            <p style={{ color: '#666', maxWidth: 560, margin: '0 auto', lineHeight: 1.8, fontSize: 15 }}>
              From everyday banking to sophisticated wealth management, Liberty Banking has you covered.
            </p>
          </div>
          <div className="lb-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '💳', title: 'Personal Checking & Savings', desc: 'Flexible accounts with no hidden fees, competitive APY, and instant access to your money.', features: ['Free online banking', 'Zero maintenance fees', 'ATM fee reimbursements'] },
              { icon: '📈', title: 'Investment & Wealth Management', desc: 'Grow your wealth with expertly managed portfolios, retirement planning, and market-leading products.', features: ['Diversified portfolios', 'Retirement planning', 'Expert advisors'] },
              { icon: '🏠', title: 'Home Loans & Mortgages', desc: 'Competitive rates on home loans, refinancing, and construction loans with flexible terms.', features: ['Low fixed rates', 'Fast approval', 'Expert guidance'] },
              { icon: '🏢', title: 'Business Banking', desc: 'Tailored solutions including merchant services, business loans, and cash flow management.', features: ['Business accounts', 'Merchant services', 'Business credit lines'] },
              { icon: '🪙', title: 'Crypto & Digital Assets', desc: 'Enter the future of finance with our regulated digital asset services — secure and compliant.', features: ['Regulated platform', 'Multiple currencies', 'Cold storage security'] },
              { icon: '🎧', title: '24/7 Customer Support', desc: 'Phone, chat, email, or in-branch. Real people, real help, always available for you.', features: ['24/7 availability', 'Dedicated advisors', 'Multi-language support'] },
            ].map(({ icon, title, desc, features }) => (
              <div key={title} style={{
                background: '#fff', borderRadius: 18, padding: 28, border: '1px solid #eee',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ background: '#0a2240', width: 46, height: 46, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 18 }}>{icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0a2240', margin: '0 0 10px' }}>{title}</h3>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>{desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
                      <span style={{ color: '#d4af37' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section id="why-us" className="lb-section" style={{ padding: '88px 32px', background: '#0a2240', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Why Liberty Banking</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, margin: '0 0 14px' }}>Security You Can Count On</h2>
            <p style={{ color: 'rgba(200,220,255,0.8)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8, fontSize: 15 }}>
              Your financial security is our top priority — every feature is designed with your protection in mind.
            </p>
          </div>
          <div className="lb-why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { icon: '🛡', title: 'Bank-Level Security', desc: '256-bit SSL encryption, multi-factor authentication, and real-time fraud monitoring protect every transaction.' },
              { icon: '🌐', title: 'Global Accessibility', desc: 'Access your accounts from anywhere. Our network spans 180+ countries with competitive foreign exchange rates.' },
              { icon: '📊', title: 'Competitive Rates', desc: 'Industry-leading APY on savings, competitive mortgage rates, and transparent fee structures with no hidden charges.' },
              { icon: '⭐', title: 'Award-Winning Service', desc: 'Rated #1 in Customer Satisfaction by J.D. Power for five consecutive years. Our people make all the difference.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', gap: 18, padding: 28, background: 'rgba(255,255,255,0.05)',
                borderRadius: 18, border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{ background: '#d4af37', width: 50, height: 50, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>{title}</h3>
                  <p style={{ color: 'rgba(200,220,255,0.8)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ marginTop: 72 }}>
            <h3 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, color: '#d4af37', marginBottom: 36 }}>What Our Customers Say</h3>
            <div className="lb-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { name: 'Margaret Thompson', role: 'Small Business Owner', text: 'Liberty Banking helped me get my business off the ground. Their team was there every step of the way.' },
                { name: 'James & Sarah Holloway', role: 'Homeowners', text: "We got our dream home thanks to Liberty's mortgage team. The rate was incredible and the process was seamless." },
                { name: 'Dr. Michael Reeves', role: 'Physician & Investor', text: 'Their wealth management service is top-notch. My portfolio has grown significantly. Exceptional service.' },
              ].map(({ name, role, text }) => (
                <div key={name} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 18, padding: 24 }}>
                  <div style={{ color: '#d4af37', fontSize: 18, marginBottom: 12 }}>★★★★★</div>
                  <p style={{ color: 'rgba(220,235,255,0.9)', fontSize: 14, lineHeight: 1.9, fontStyle: 'italic', marginBottom: 18 }}>"{text}"</p>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{name}</div>
                  <div style={{ color: '#d4af37', fontSize: 12, marginTop: 2 }}>{role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIGITAL BANKING HIGHLIGHT ─── */}
      <section className="lb-section" style={{ padding: '88px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Digital Banking</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#0a2240', margin: '0 0 20px', lineHeight: 1.2 }}>
            Your Bank, Everywhere You Go
          </h2>
          <p style={{ color: '#555', lineHeight: 1.9, marginBottom: 32, fontSize: 15 }}>
            Experience the future of banking with our state-of-the-art online platform. Transfer funds, pay bills, and manage your wealth — all from your device, 24/7.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 40px', marginBottom: 36 }}>
            {['Instant wire, local & internal transfers', 'Bill payment & management', 'Loan applications & management', 'Real-time alerts & notifications', 'Secure investment portal', '24/7 account access'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#d4af37', fontSize: 18, flexShrink: 0 }}>✓</span>
                <span style={{ color: '#444', fontSize: 15 }}>{item}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowLogin(true)} style={{
            background: '#0a2240', color: '#fff', padding: '15px 36px',
            border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}>
            Get Started Today →
          </button>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="lb-section" style={{ padding: '88px 32px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Contact Us</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#0a2240', margin: 0 }}>We're Here to Help</h2>
          </div>
          <div className="lb-contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '📞', title: 'Call Us', info: '1-800-LIBERTY\nMon–Fri, 8am–8pm EST' },
              { icon: '✉️', title: 'Email Us', info: 'support@libertybanking.com\nResponse within 24 hours' },
              { icon: '📍', title: 'Visit a Branch', info: 'Over 2,400 branches\nacross all 50 states' },
            ].map(({ icon, title, info }) => (
              <div key={title} style={{ background: '#fff', borderRadius: 18, padding: 36, textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
                <div style={{ background: '#0a2240', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 18px' }}>{icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0a2240', margin: '0 0 10px' }}>{title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#0a2240', color: '#fff', padding: '56px 32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lb-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>🏛</span>
                <span style={{ fontWeight: 800, fontSize: 17 }}>Liberty Banking</span>
              </div>
              <p style={{ color: 'rgba(200,220,255,0.7)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
                Serving American families with integrity and dedication since 1952.
              </p>
            </div>
            {[
              { title: 'Personal', links: ['Checking Accounts', 'Savings Accounts', 'Credit Cards', 'Home Loans'] },
              { title: 'Business', links: ['Business Checking', 'Business Loans', 'Merchant Services', 'Commercial Banking'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press Room', 'Investor Relations'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 style={{ fontWeight: 800, color: '#d4af37', marginBottom: 14, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {links.map(link => (
                    <li key={link} style={{ fontSize: 13, color: 'rgba(200,220,255,0.7)' }}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
            gap: 12, fontSize: 12, color: 'rgba(200,220,255,0.5)',
          }}>
            <span>© 2026 Liberty Banking. All rights reserved. Member FDIC. Equal Housing Lender.</span>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(link => (
                <span key={link} style={{ cursor: 'pointer' }}>{link}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

