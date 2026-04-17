'use client';

import { useState } from 'react';
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
   HELPER COMPONENTS
───────────────────────────────────────────── */
function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      overflowY: 'auto',
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '36px 32px',
        width: '100%', maxWidth: wide ? 640 : 480,
        position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
        maxHeight: '90vh', overflowY: 'auto',
        margin: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a2240', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', color: '#888',
            lineHeight: 1, padding: '0 4px',
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Btn({ children, onClick, style: s, variant = 'primary' }) {
  const base = {
    padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700,
    cursor: 'pointer', border: 'none', transition: 'opacity 0.2s', ...s,
  };
  if (variant === 'primary') return <button onClick={onClick} style={{ background: '#0a2240', color: '#fff', ...base }}>{children}</button>;
  if (variant === 'gold') return <button onClick={onClick} style={{ background: '#d4af37', color: '#0a2240', ...base }}>{children}</button>;
  if (variant === 'outline') return <button onClick={onClick} style={{ background: '#fff', color: '#0a2240', border: '2px solid #0a2240', ...base }}>{children}</button>;
  return <button onClick={onClick} style={base}>{children}</button>;
}

function InputRow({ icon, label, name, placeholder, type = 'text', optional, value, onChange }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6 }}>
        {label}{optional && <span style={{ color: '#999', fontWeight: 400, marginLeft: 4 }}>(Optional)</span>}
      </label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 18, opacity: 0.5, pointerEvents: 'none',
          }}>{icon}</span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%', padding: `12px 14px 12px ${icon ? '44px' : '14px'}`,
            border: '1.5px solid #ddd', borderRadius: 10, fontSize: 14,
            outline: 'none', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = '#0a2240'}
          onBlur={e => e.target.style.borderColor = '#ddd'}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TRANSFER MODAL (wire / local / internal)
───────────────────────────────────────────── */
function TransferModal({ open, onClose, title }) {
  const [step, setStep] = useState(1); // 1=form 2=otp 3=receipt
  const [fields, setFields] = useState({
    amount: '', beneficiary: '', iban: '', bank: '', swift: '',
    routing: '', pin: '', address: '', remarks: '',
  });
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [ref] = useState(() => 'LB' + Math.random().toString(36).substring(2, 10).toUpperCase());
  const [txDate] = useState(() => new Date().toLocaleString());

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    setStep(2);
  }

  function handleVerifyOTP(e) {
    e.preventDefault();
    if (otp === OTP_CODE) {
      setStep(3);
    } else {
      setOtpError('Incorrect OTP. Please try again.');
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleClose() {
    setStep(1);
    setFields({ amount: '', beneficiary: '', iban: '', bank: '', swift: '', routing: '', pin: '', address: '', remarks: '' });
    setOtp('');
    setOtpError('');
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title={title} wide>
      {/* STEP 1: FORM */}
      {step === 1 && (
        <form onSubmit={handleSubmitForm}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="💰" label="Amount" name="amount" placeholder="Enter amount (e.g. 500.00)" type="number" value={fields.amount} onChange={handleChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="👤" label="Beneficiary Name" name="beneficiary" placeholder="Full name of recipient" value={fields.beneficiary} onChange={handleChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="🏦" label="IBAN / Account Number" name="iban" placeholder="Enter IBAN or account number" value={fields.iban} onChange={handleChange} />
            </div>
            <InputRow icon="🏢" label="Bank" name="bank" placeholder="Recipient's bank name" value={fields.bank} onChange={handleChange} />
            <InputRow icon="🔑" label="SWIFT Code" name="swift" placeholder="e.g. CHASEUS33" value={fields.swift} onChange={handleChange} />
            <InputRow icon="🔢" label="Routing / Transit Number" name="routing" placeholder="9-digit routing number" value={fields.routing} onChange={handleChange} />
            <InputRow icon="🔒" label="PIN" name="pin" placeholder="Your transaction PIN" type="password" value={fields.pin} onChange={handleChange} />
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="📍" label="Bank Address" name="address" placeholder="Street, City, State, ZIP" optional value={fields.address} onChange={handleChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <InputRow icon="📝" label="Remarks" name="remarks" placeholder="Add a note for the recipient" optional value={fields.remarks} onChange={handleChange} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <Btn variant="outline" onClick={handleClose} style={{ flex: 1 }}>Cancel</Btn>
            <Btn variant="primary" style={{ flex: 2 }}>Continue →</Btn>
          </div>
        </form>
      )}

      {/* STEP 2: OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
            <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 18, margin: '0 0 8px' }}>OTP Verification</h3>
            <p style={{ color: '#666', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              A one-time passcode has been sent to your registered mobile number.<br />
              Please enter it below to confirm this transfer.
            </p>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6, textAlign: 'center' }}>
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={e => { setOtp(e.target.value); setOtpError(''); }}
              placeholder="e.g. ****"
              maxLength={6}
              required
              style={{
                width: '100%', padding: '14px', border: '2px solid #ddd', borderRadius: 12,
                fontSize: 24, textAlign: 'center', letterSpacing: 8, outline: 'none',
                boxSizing: 'border-box', fontWeight: 800, color: '#0a2240',
              }}
              onFocus={e => e.target.style.borderColor = '#0a2240'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>
          {otpError && (
            <div style={{ background: '#fff0f0', border: '1px solid #f5c6cb', color: '#c62828', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>
              {otpError}
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <Btn variant="outline" onClick={() => setStep(1)} style={{ flex: 1 }}>← Back</Btn>
            <Btn variant="primary" style={{ flex: 2 }}>Verify & Transfer</Btn>
          </div>
        </form>
      )}

      {/* STEP 3: RECEIPT */}
      {step === 3 && (
        <div>
          <div style={{
            border: '2px dashed #ccc', borderRadius: 16, padding: '28px 28px',
            fontFamily: '"Courier New", monospace', fontSize: 13,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🏛</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0a2240', letterSpacing: 1 }}>LIBERTY BANKING</div>
              <div style={{ fontSize: 11, color: '#888', letterSpacing: 2, textTransform: 'uppercase' }}>Official Transfer Receipt</div>
              <div style={{ borderBottom: '1px dashed #ccc', margin: '14px 0' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, borderBottom: '1px dotted #eee', paddingBottom: 8 }}>
                  <span style={{ color: '#888', flexShrink: 0 }}>{k}</span>
                  <span style={{ fontWeight: 700, textAlign: 'right', wordBreak: 'break-all' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '2px dashed #ccc', marginTop: 16, paddingTop: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>AMOUNT TRANSFERRED</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#0a2240' }}>${parseFloat(fields.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 20, borderTop: '1px dashed #ccc', paddingTop: 16 }}>
              <div style={{ color: '#22a55e', fontWeight: 800, fontSize: 15 }}>✔ Transfer Successful</div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>Keep this receipt for your records.</div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>Liberty Banking | FDIC Insured | libertybanking.com</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <Btn variant="outline" onClick={handleClose} style={{ flex: 1 }}>Close</Btn>
            <Btn variant="gold" onClick={handlePrint} style={{ flex: 1 }}>🖨 Print Receipt</Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   BUY CRYPTO MODAL
───────────────────────────────────────────── */
function CryptoModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({ amount: '', wallet: '', cardType: 'debit', nameOnCard: '', cardNum: '', expiry: '', cvv: '' });

  function handleChange(e) { setFields(f => ({ ...f, [e.target.name]: e.target.value })); }

  return (
    <Modal open={open} onClose={() => { setStep(1); onClose(); }} title="Buy Crypto" wide>
      {step === 1 && (
        <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
          <p style={{ color: '#555', fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
            💳 Buy cryptocurrency using your credit card or debit card, securely and instantly.
          </p>
          <InputRow icon="💰" label="Amount (USD)" name="amount" placeholder="Enter amount" type="number" value={fields.amount} onChange={handleChange} />
          <InputRow icon="🔗" label="Wallet Address to Receive" name="wallet" placeholder="Your crypto wallet address" value={fields.wallet} onChange={handleChange} />
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6 }}>Payment Method</label>
            <select name="cardType" value={fields.cardType} onChange={handleChange} style={{
              width: '100%', padding: '12px 14px', border: '1.5px solid #ddd', borderRadius: 10, fontSize: 14, outline: 'none',
            }}>
              <option value="debit">Debit Card</option>
              <option value="credit">Credit Card</option>
            </select>
          </div>
          <InputRow icon="👤" label="Name on Card" name="nameOnCard" placeholder="As it appears on card" value={fields.nameOnCard} onChange={handleChange} />
          <InputRow icon="💳" label="Card Number" name="cardNum" placeholder="XXXX XXXX XXXX XXXX" value={fields.cardNum} onChange={handleChange} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <InputRow icon="📅" label="Expiry Date" name="expiry" placeholder="MM/YY" value={fields.expiry} onChange={handleChange} />
            <InputRow icon="🔒" label="CVV" name="cvv" placeholder="3 digits" type="password" value={fields.cvv} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <Btn variant="outline" onClick={onClose} style={{ flex: 1 }}>Cancel</Btn>
            <Btn variant="primary" style={{ flex: 2 }}>Continue →</Btn>
          </div>
        </form>
      )}
      {step === 2 && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🚧</div>
          <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Not Available at the Moment</h3>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
            The cryptocurrency purchase feature is currently undergoing maintenance. Please check back soon.
          </p>
          <Btn variant="primary" onClick={() => { setStep(1); onClose(); }} style={{ width: '100%' }}>Close</Btn>
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

  function handleSelect(type) {
    setSelected(type);
  }

  return (
    <Modal open={open} onClose={() => { setSelected(null); onClose(); }} title="Pay Bills">
      {!selected && (
        <div>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Select a bill payment category:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '✈️', label: 'Plane Tickets', desc: 'Book or pay for airline tickets' },
              { icon: '🏨', label: 'Hotel Bookings', desc: 'Pay for hotel reservations' },
            ].map(({ icon, label, desc }) => (
              <button key={label} onClick={() => handleSelect(label)} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px',
                border: '2px solid #eee', borderRadius: 14, background: '#fff', cursor: 'pointer', textAlign: 'left',
                transition: 'border-color 0.2s, background 0.2s',
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
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🚧</div>
          <h3 style={{ color: '#0a2240', fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Not Available at the Moment</h3>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
            <strong>{selected}</strong> payment is currently unavailable. We're working to bring this feature to you soon.
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { icon: '⚠️', color: '#f59e0b', bg: '#fffbeb', msg: 'You have no pending security alerts at this time.', time: 'Just now' },
          { icon: '🔔', color: '#3b82f6', bg: '#eff6ff', msg: 'Your account statement for March 2026 is now available.', time: '2 days ago' },
          { icon: '✅', color: '#22c55e', bg: '#f0fdf4', msg: 'Your profile information was successfully updated.', time: '5 days ago' },
          { icon: '🔒', color: '#8b5cf6', bg: '#faf5ff', msg: 'A new device was used to access your account. If this was not you, contact us immediately.', time: '1 week ago' },
        ].map(({ icon, color, bg, msg, time }, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '16px 18px', borderRadius: 12, background: bg, alignItems: 'flex-start',
          }}>
            <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{icon}</div>
            <div>
              <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.6 }}>{msg}</p>
              <span style={{ fontSize: 11, color: '#999', marginTop: 4, display: 'block' }}>{time}</span>
            </div>
          </div>
        ))}
      </div>
      <Btn variant="primary" onClick={onClose} style={{ width: '100%', marginTop: 20 }}>Close</Btn>
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

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <Modal open={open} onClose={() => { setSent(false); setSubject(''); setMessage(''); onClose(); }} title="Customer Support">
      {!sent ? (
        <form onSubmit={handleSubmit}>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
            Our support team is available 24/7. Submit your message below and we'll respond within 24 hours.
          </p>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6 }}>Subject</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: 13, fontSize: 16, opacity: 0.5 }}>📋</span>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                required
                style={{
                  width: '100%', padding: '12px 14px 12px 44px', border: '1.5px solid #ddd',
                  borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = '#0a2240'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 6 }}>Message</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: 13, fontSize: 16, opacity: 0.5 }}>💬</span>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe your issue in detail..."
                required
                rows={5}
                style={{
                  width: '100%', padding: '12px 14px 12px 44px', border: '1.5px solid #ddd',
                  borderRadius: 10, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = '#0a2240'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
          </div>
          <Btn variant="primary" style={{ width: '100%' }}>Submit Message ✉️</Btn>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
          <h3 style={{ color: '#22a55e', fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Message Sent!</h3>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
            Thank you for reaching out. Our team will respond to your inquiry within 24 hours.
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
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{icon}</div>
        <p style={{ color: '#555', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>{desc}</p>
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
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #0a2240, #1a4080)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
          margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(10,34,64,0.3)',
        }}>👤</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0a2240' }}>Account Holder</div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Account ID: 9337910</div>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #0a2240, #1a4080)', borderRadius: 16, padding: 24, color: '#fff', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: 'rgba(200,220,255,0.8)', marginBottom: 6 }}>CHECKINGS ACCOUNT</div>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#d4af37' }}>{ACCOUNT.balance}</div>
        <div style={{ fontSize: 13, color: 'rgba(200,220,255,0.7)', marginTop: 8, letterSpacing: 2 }}>
          •••• •••• •••• {ACCOUNT.cardLast4}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          ['Account Type', 'Checkings Account'],
          ['Account Status', '✅ Active'],
          ['Member Since', 'January 2019'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888', fontSize: 14 }}>{k}</span>
            <span style={{ fontWeight: 700, color: '#333', fontSize: 14 }}>{v}</span>
          </div>
        ))}
      </div>
      <Btn variant="primary" onClick={onClose} style={{ width: '100%', marginTop: 20 }}>Close</Btn>
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

  function open(name) { setOpenModal(name); }
  function close() { setOpenModal(null); }

  function handleLogout() {
    router.push('/');
  }

  const quickActions = [
    { id: 'wire', icon: '🌐', label: 'Wire Transfer', color: '#0a2240' },
    { id: 'local', icon: '🏦', label: 'Local Transfer', color: '#1a4080' },
    { id: 'internal', icon: '🔄', label: 'Internal Transfer', color: '#0f3060' },
    { id: 'crypto', icon: '🪙', label: 'Buy Crypto', color: '#7c3aed' },
    { id: 'bills', icon: '📄', label: 'Pay Bills', color: '#0369a1' },
    { id: 'beneficiary', icon: '👥', label: 'Add Beneficiary', color: '#15803d' },
    { id: 'carddeposit', icon: '💳', label: 'Card Deposit', color: '#b45309' },
    { id: 'checkdeposit', icon: '🖊', label: 'Check Deposit', color: '#7e22ce' },
    { id: 'alerts', icon: '🔔', label: 'Alerts', color: '#dc2626' },
    { id: 'loans', icon: '🏠', label: 'Loans', color: '#065f46' },
    { id: 'investment', icon: '📈', label: 'Investment', color: '#92400e' },
    { id: 'support', icon: '🎧', label: 'Support', color: '#1e3a5f' },
  ];

  const tips = [
    { icon: '💰', title: 'AutoSave', desc: 'Set a goal, save automatically with Liberty Banking\'s Auto Save and track your progress.' },
    { icon: '📊', title: 'Budget', desc: 'Check in with your budget and stay on top of your spending.' },
    { icon: '🏠', title: 'Home Option', desc: 'Your home purchase, refinance and insights right under one roof.' },
    { icon: '🛡', title: 'Security Tip', desc: 'We will NEVER ask you to provide your security details such as codes or any sensitive details of your account.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Georgia, serif' }}>

      {/* ─── TOP NAV ─── */}
      <nav style={{
        background: '#0a2240', color: '#fff', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🏛</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 1 }}>Liberty Banking</div>
              <div style={{ fontSize: 10, color: '#d4af37', letterSpacing: 3, textTransform: 'uppercase' }}>Online Banking</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Profile Icon */}
            <button onClick={() => setShowProfile(true)} style={{
              background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: 42, height: 42, cursor: 'pointer', fontSize: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              title="View Profile"
            >👤</button>
            {/* Logout */}
            <button onClick={handleLogout} style={{
              background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.25)',
              color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 700,
              fontSize: 13, cursor: 'pointer', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px' }}>

        {/* ─── BALANCE CARD ─── */}
        <div style={{
          background: 'linear-gradient(135deg, #0a2240 0%, #0f3060 50%, #1a4080 100%)',
          borderRadius: 24, padding: '36px 40px', color: '#fff',
          marginBottom: 32, boxShadow: '0 16px 48px rgba(10,34,64,0.35)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(200,220,255,0.75)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              Checkings Account
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: '#d4af37', lineHeight: 1 }}>$4,000.00</div>
            <div style={{ fontSize: 15, color: 'rgba(200,220,255,0.8)', marginTop: 10, letterSpacing: 3 }}>
              •••• •••• •••• {ACCOUNT.cardLast4}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: 'rgba(200,220,255,0.6)', marginBottom: 4 }}>Available Balance</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>$4,000.00</div>
            <div style={{
              marginTop: 12, background: 'rgba(212,175,55,0.2)', border: '1px solid #d4af37',
              color: '#d4af37', padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700,
            }}>✅ Account Active</div>
          </div>
        </div>

        {/* ─── QUICK ACTIONS ─── */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a2240', marginBottom: 18 }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
            {quickActions.map(({ id, icon, label, color }) => (
              <button
                key={id}
                onClick={() => id !== 'beneficiary' && open(id)}
                style={{
                  background: '#fff', border: '1.5px solid #e8ecf0', borderRadius: 16,
                  padding: '20px 12px', cursor: id === 'beneficiary' ? 'default' : 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.15s, box-shadow 0.15s',
                  opacity: id === 'beneficiary' ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (id !== 'beneficiary') { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{icon}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0a2240', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── CREDIT CARD DISPLAY ─── */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a2240', marginBottom: 18 }}>My Card</h2>
          <div style={{
            background: 'linear-gradient(135deg, #0a2240 0%, #1a5080 50%, #0f3060 100%)',
            borderRadius: 20, padding: '32px 36px', color: '#fff', maxWidth: 420,
            boxShadow: '0 16px 48px rgba(10,34,64,0.35)', position: 'relative', overflow: 'hidden',
          }}>
            {/* decorative circles */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(200,220,255,0.7)', letterSpacing: 3, textTransform: 'uppercase' }}>Liberty Banking</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>Checkings Account</div>
              </div>
              <div style={{ fontSize: 32 }}>🏛</div>
            </div>

            {/* Chip */}
            <div style={{ width: 44, height: 32, background: 'linear-gradient(135deg, #d4af37, #f0d060)', borderRadius: 6, marginBottom: 20 }} />

            <div style={{ fontSize: 20, letterSpacing: 4, fontWeight: 700, marginBottom: 20, color: '#e0e8ff' }}>
              •••• &nbsp; •••• &nbsp; •••• &nbsp; {ACCOUNT.cardLast4}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <div>
                <div style={{ color: 'rgba(200,220,255,0.6)', marginBottom: 2, fontSize: 10, letterSpacing: 1 }}>CARD HOLDER</div>
                <div style={{ fontWeight: 700 }}>Account Holder</div>
              </div>
              <div>
                <div style={{ color: 'rgba(200,220,255,0.6)', marginBottom: 2, fontSize: 10, letterSpacing: 1 }}>EXPIRES</div>
                <div style={{ fontWeight: 700 }}>12/28</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: -8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,175,55,0.8)', marginRight: -8 }} />
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,175,55,0.5)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── TIPS ─── */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a2240', marginBottom: 18 }}>Tips & Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {tips.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: '#fff', border: '1.5px solid #e8ecf0', borderRadius: 16, padding: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  background: '#0a2240', width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#0a2240', marginBottom: 6, fontSize: 15 }}>{title}</div>
                  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MODALS ─── */}
      <TransferModal open={openModal === 'wire'} onClose={close} title="Wire Transfer" />
      <TransferModal open={openModal === 'local'} onClose={close} title="Local Transfer" />
      <TransferModal open={openModal === 'internal'} onClose={close} title="Internal Transfer" />
      <CryptoModal open={openModal === 'crypto'} onClose={close} />
      <PayBillsModal open={openModal === 'bills'} onClose={close} />
      <AlertsModal open={openModal === 'alerts'} onClose={close} />
      <SupportModal open={openModal === 'support'} onClose={close} />

      {/* Card Deposit */}
      <GenericModal
        open={openModal === 'carddeposit'} onClose={close}
        title="Card Deposit" icon="💳"
        desc="Deposit funds instantly using your debit or credit card. Link your external card to Liberty Banking and transfer funds in seconds. Feature powered by Plaid®."
      />

      {/* Check Deposit */}
      <GenericModal
        open={openModal === 'checkdeposit'} onClose={close}
        title="Check Deposit" icon="🖊"
        desc="Deposit a paper check from anywhere. Simply take a photo of the front and back of your check using the Liberty Banking mobile app. Funds typically available within 1–2 business days."
      />

      {/* Loans */}
      <GenericModal
        open={openModal === 'loans'} onClose={close}
        title="Loans" icon="🏠"
        desc="Explore personal loans, auto loans, and home mortgages at Liberty Banking. Competitive rates, flexible terms, and fast approvals. Speak with a loan advisor today at 1-800-LIBERTY."
      />

      {/* Investment */}
      <GenericModal
        open={openModal === 'investment'} onClose={close}
        title="Investment Portal" icon="📈"
        desc="Grow your wealth with Liberty Banking's investment services. Access managed portfolios, ETFs, mutual funds, and retirement accounts. Managed by certified financial advisors with decades of experience."
      />

      {/* Profile */}
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}


