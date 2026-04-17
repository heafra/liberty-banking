'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ACCOUNT_ID = '9337910';
const PASSWORD = 'mycheckings';

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
      {/* ─── NAV ─── */}
      <nav style={{
        background: '#0a2240', color: '#fff', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '18px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"
                stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>Liberty Banking</div>
              <div style={{ fontSize: 10, color: '#d4af37', letterSpacing: 3, textTransform: 'uppercase' }}>
                Trusted Since 1952
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 600 }}>
              {['About', 'Services', 'Why Us', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`}
                  style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#d4af37'}
                  onMouseLeave={e => e.target.style.color = '#fff'}
                >{link}</a>
              ))}
            </div>
            <button
              onClick={() => setShowLogin(true)}
              style={{
                background: '#d4af37', color: '#0a2240', padding: '10px 28px',
                border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 14,
                cursor: 'pointer', letterSpacing: 1, transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = '#b8981f'}
              onMouseLeave={e => e.target.style.background = '#d4af37'}
            >Login</button>
          </div>
        </div>
      </nav>

      {/* ─── LOGIN MODAL ─── */}
      {showLogin && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '44px 40px', width: '100%',
            maxWidth: 440, position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          }}>
            <button onClick={() => { setShowLogin(false); setError(''); setAccountId(''); setPassword(''); }}
              style={{
                position: 'absolute', top: 16, right: 20, background: 'none', border: 'none',
                fontSize: 26, cursor: 'pointer', color: '#888', lineHeight: 1,
              }}>×</button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"
                  stroke="#0a2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0a2240' }}>Liberty Banking</div>
                <div style={{ fontSize: 11, color: '#888', letterSpacing: 2, textTransform: 'uppercase' }}>
                  Secure Online Banking
                </div>
              </div>
            </div>
            <p style={{ color: '#555', fontSize: 13, marginBottom: 28, marginTop: 4 }}>
              Sign in to access your accounts and services.
            </p>

            <form onSubmit={handleLogin}>
              {/* Account ID */}
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6 }}>
                Account ID
              </label>
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: 13, opacity: 0.4 }}
                  width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="9" cy="7" r="4" stroke="#333" strokeWidth="2" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={accountId}
                  onChange={e => { setAccountId(e.target.value); setError(''); }}
                  placeholder="Enter your Account ID"
                  required
                  style={{
                    width: '100%', padding: '12px 14px 12px 44px', border: '1.5px solid #ddd',
                    borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#0a2240'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>

              {/* Password */}
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
                    borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
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
                cursor: 'pointer', marginBottom: 12, transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.target.style.background = '#0d2d50'}
                onMouseLeave={e => e.target.style.background = '#0a2240'}
              >
                Sign In to Your Account
              </button>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa' }}>
                🔒 Secured by 256-bit SSL Encryption
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0a2240 0%, #0f3060 50%, #1a4080 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: 'url(https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px', position: 'relative', color: '#fff' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37',
            color: '#d4af37', padding: '8px 20px', borderRadius: 999,
            fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24,
          }}>
            🛡 FDIC Insured Institution
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 24, margin: '0 0 24px' }}>
            Banking Built On<br />
            <span style={{ color: '#d4af37' }}>Trust & Freedom</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(200,220,255,0.9)', maxWidth: 640, lineHeight: 1.8, margin: '0 0 40px' }}>
            Liberty Banking has served American families for over 70 years. Experience banking that puts your financial freedom first — with industry-leading security, competitive rates, and unmatched personal service.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => setShowLogin(true)} style={{
              background: '#d4af37', color: '#0a2240', padding: '16px 36px',
              border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 16,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Access Online Banking →
            </button>
            <a href="#services" style={{
              border: '2px solid #fff', color: '#fff', padding: '16px 36px',
              borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none',
              display: 'flex', alignItems: 'center',
            }}>
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
            marginTop: 64, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 40, maxWidth: 560,
          }}>
            {[['$48B+', 'Assets Under Management'], ['3.2M+', 'Satisfied Customers'], ['70+', 'Years of Service']].map(
              ([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#d4af37' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(200,220,255,0.8)', marginTop: 4 }}>{label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: '96px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Our Story</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#0a2240', lineHeight: 1.2, margin: '0 0 24px' }}>
              America's Most Trusted Community Bank
            </h2>
            <p style={{ color: '#555', lineHeight: 1.9, marginBottom: 20 }}>
              Founded in 1952, Liberty Banking was built on the principle that every citizen deserves access to fair, transparent, and dignified banking. We believe financial freedom is not a privilege — it's a right.
            </p>
            <p style={{ color: '#555', lineHeight: 1.9, marginBottom: 36 }}>
              Today, we serve millions across all 50 states, providing everything from everyday checking to sophisticated wealth management, all while maintaining the personal touch that has defined us for seven decades.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['🛡', 'FDIC Insured'], ['🌐', 'Nationwide Access'],
                ['⭐', 'Award Winning'], ['👥', '3.2M+ Customers'],
              ].map(([icon, label]) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: 16,
                  background: '#f8f9fa', borderRadius: 12,
                }}>
                  <div style={{
                    background: '#0a2240', padding: 10, borderRadius: 10,
                    fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{icon}</div>
                  <span style={{ fontWeight: 700, color: '#0a2240', fontSize: 14 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="Liberty Banking branch"
              style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,0.15)' }}
            />
            <div style={{
              position: 'absolute', bottom: -24, left: -24, background: '#d4af37',
              color: '#0a2240', padding: '20px 28px', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}>
              <div style={{ fontSize: 28, fontWeight: 900 }}>70+</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ padding: '96px 32px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Our Services</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#0a2240', margin: '0 0 16px' }}>Comprehensive Financial Solutions</h2>
            <p style={{ color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
              From everyday banking to sophisticated wealth management, Liberty Banking provides everything you need for your financial journey.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { icon: '💳', title: 'Personal Checking & Savings', desc: 'Flexible accounts with no hidden fees, competitive APY, and instant access to your money anytime, anywhere.', features: ['Free online banking', 'Zero maintenance fees', 'ATM fee reimbursements'] },
              { icon: '📈', title: 'Investment & Wealth Management', desc: 'Grow your wealth with expertly managed portfolios, retirement planning, and market-leading investment products.', features: ['Diversified portfolios', 'Retirement planning', 'Expert advisors'] },
              { icon: '🏠', title: 'Home Loans & Mortgages', desc: 'Competitive rates on home loans, refinancing, and construction loans with flexible terms tailored to your life.', features: ['Low fixed rates', 'Fast approval', 'Expert guidance'] },
              { icon: '🏢', title: 'Business Banking', desc: 'Empower your business with tailored solutions including merchant services, business loans, and cash flow management.', features: ['Business accounts', 'Merchant services', 'Business credit lines'] },
              { icon: '🪙', title: 'Crypto & Digital Assets', desc: 'Enter the future of finance with our regulated digital asset services — buy, hold, and manage cryptocurrency securely.', features: ['Regulated platform', 'Multiple currencies', 'Cold storage security'] },
              { icon: '🎧', title: '24/7 Customer Support', desc: 'Our dedicated team is always here for you — phone, chat, email, or in-branch. Real people, real help, always.', features: ['24/7 availability', 'Dedicated advisors', 'Multi-language support'] },
            ].map(({ icon, title, desc, features }) => (
              <div key={title} style={{
                background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #eee',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  background: '#0a2240', width: 48, height: 48, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20,
                }}>{icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0a2240', margin: '0 0 12px' }}>{title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
                      <span style={{ color: '#d4af37', fontSize: 16 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section id="why-us" style={{ padding: '96px 32px', background: '#0a2240', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Why Liberty Banking</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px' }}>Security You Can Count On</h2>
            <p style={{ color: 'rgba(200,220,255,0.8)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
              Your financial security is our top priority. Every feature is designed with your protection in mind.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { icon: '🛡', title: 'Bank-Level Security', desc: '256-bit SSL encryption, multi-factor authentication, and real-time fraud monitoring protect every transaction.' },
              { icon: '🌐', title: 'Global Accessibility', desc: 'Access your accounts from anywhere. Our network spans 180+ countries with competitive foreign exchange rates.' },
              { icon: '📊', title: 'Competitive Rates', desc: 'Industry-leading APY on savings, competitive mortgage rates, and transparent fee structures with no hidden charges.' },
              { icon: '⭐', title: 'Award-Winning Service', desc: 'Rated #1 in Customer Satisfaction by J.D. Power for five consecutive years. Our people make all the difference.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', gap: 20, padding: 32, background: 'rgba(255,255,255,0.05)',
                borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{
                  background: '#d4af37', width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 10px' }}>{title}</h3>
                  <p style={{ color: 'rgba(200,220,255,0.8)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ marginTop: 80 }}>
            <h3 style={{ textAlign: 'center', fontSize: 26, fontWeight: 800, color: '#d4af37', marginBottom: 40 }}>
              What Our Customers Say
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { name: 'Margaret Thompson', role: 'Small Business Owner', text: 'Liberty Banking helped me get my business off the ground. Their team was there every step of the way.' },
                { name: 'James & Sarah Holloway', role: 'Homeowners', text: 'We got our dream home thanks to Liberty\'s mortgage team. The rate was incredible and the process was seamless.' },
                { name: 'Dr. Michael Reeves', role: 'Physician & Investor', text: 'Their wealth management service is top-notch. My portfolio has grown significantly. Exceptional service.' },
              ].map(({ name, role, text }) => (
                <div key={name} style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 20, padding: 28,
                }}>
                  <div style={{ color: '#d4af37', fontSize: 18, marginBottom: 12 }}>★★★★★</div>
                  <p style={{ color: 'rgba(220,235,255,0.9)', fontSize: 14, lineHeight: 1.9, fontStyle: 'italic', marginBottom: 20 }}>
                    "{text}"
                  </p>
                  <div style={{ fontWeight: 800 }}>{name}</div>
                  <div style={{ color: '#d4af37', fontSize: 12 }}>{role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIGITAL BANKING FEATURE HIGHLIGHT ─── */}
      <section style={{ padding: '96px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Digital Banking</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#0a2240', margin: '0 0 24px', lineHeight: 1.2 }}>
              Your Bank, Everywhere You Go
            </h2>
            <p style={{ color: '#555', lineHeight: 1.9, marginBottom: 32 }}>
              Experience the future of banking with our state-of-the-art online platform. Transfer funds, pay bills, invest in crypto, and manage your wealth — all from your device, 24/7.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Instant wire, local & internal transfers',
                'Bill payment & management',
                'Cryptocurrency trading',
                'Loan applications & management',
                'Real-time alerts & notifications',
                'Secure investment portal',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#d4af37', fontSize: 18 }}>✓</span>
                  <span style={{ color: '#444', fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowLogin(true)} style={{
              marginTop: 40, background: '#0a2240', color: '#fff', padding: '16px 36px',
              border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: 'pointer',
            }}>
              Get Started Today →
            </button>
          </div>

          {/* Mock dashboard card */}
          <div style={{
            background: 'linear-gradient(135deg, #0a2240 0%, #1a4080 100%)',
            borderRadius: 28, padding: 40, boxShadow: '0 24px 80px rgba(10,34,64,0.4)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, color: '#fff' }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(200,220,255,0.7)', letterSpacing: 2, textTransform: 'uppercase' }}>Liberty Banking</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>Online Portal</div>
              </div>
              <div style={{ fontSize: 32 }}>🏛</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 24, marginBottom: 20, color: '#fff' }}>
              <div style={{ fontSize: 12, color: 'rgba(200,220,255,0.7)', marginBottom: 6 }}>Checkings Balance</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#d4af37' }}>$4,000.00</div>
              <div style={{ fontSize: 14, color: 'rgba(200,220,255,0.8)', marginTop: 8, letterSpacing: 2 }}>••••  ••••  ••••  8750</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {['Wire Transfer', 'Pay Bills', 'Investments', 'Support'].map(item => (
                <div key={item} style={{
                  background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 12px',
                  textAlign: 'center', color: 'rgba(220,235,255,0.9)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ padding: '96px 32px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, marginBottom: 12 }}>Contact Us</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#0a2240', margin: 0 }}>We're Here to Help</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { icon: '📞', title: 'Call Us', info: '1-800-LIBERTY\nMon–Fri, 8am–8pm EST' },
              { icon: '✉️', title: 'Email Us', info: 'support@libertybanking.com\nResponse within 24 hours' },
              { icon: '📍', title: 'Visit a Branch', info: 'Over 2,400 branches\nacross all 50 states' },
            ].map(({ icon, title, info }) => (
              <div key={title} style={{
                background: '#fff', borderRadius: 20, padding: 40, textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #eee',
              }}>
                <div style={{
                  background: '#0a2240', width: 60, height: 60, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, margin: '0 auto 20px',
                }}>{icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0a2240', margin: '0 0 12px' }}>{title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#0a2240', color: '#fff', padding: '64px 32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>🏛</span>
                <span style={{ fontWeight: 800, fontSize: 18 }}>Liberty Banking</span>
              </div>
              <p style={{ color: 'rgba(200,220,255,0.7)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                Serving American families with integrity and dedication since 1952.
              </p>
            </div>
            {[
              { title: 'Personal', links: ['Checking Accounts', 'Savings Accounts', 'Credit Cards', 'Home Loans'] },
              { title: 'Business', links: ['Business Checking', 'Business Loans', 'Merchant Services', 'Commercial Banking'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press Room', 'Investor Relations'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 style={{ fontWeight: 800, color: '#d4af37', marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map(link => (
                    <li key={link} style={{ fontSize: 13, color: 'rgba(200,220,255,0.7)', cursor: 'pointer' }}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 28,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 12, color: 'rgba(200,220,255,0.5)',
          }}>
            <span>© 2026 Liberty Banking. All rights reserved. Member FDIC. Equal Housing Lender.</span>
            <div style={{ display: 'flex', gap: 24 }}>
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