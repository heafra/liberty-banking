"use client";

import { useState } from "react";

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const account = {
    balance: 4000.0,
    card: "•••• 3846",
  };

  const [amount, setAmount] = useState("");

  const actions = [
    "Wire Transfer",
    "Local Transfer",
    "Internal Transfer",
    "Buy Crypto",
    "Pay Bills",
    "Add Beneficiary",
    "Alerts",
    "Support",
  ];

  const isTransfer =
    activeModal === "Wire Transfer" ||
    activeModal === "Local Transfer" ||
    activeModal === "Internal Transfer";

  const openAction = (item) => {
    setActiveModal(item);
    setStep("form");
    setOtp("");
    setReceipt(null);
  };

  const proceed = () => {
    setStep("processing");

    setTimeout(() => {
      setStep("otp");
    }, 1800);
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      setStep("receipt");
      setReceipt({
        ref: "TXN" + Math.floor(Math.random() * 999999),
        status: "Successful",
        amount,
      });
    } else {
      alert("Invalid OTP");
    }
  };

  const finalContinue = () => {
    setStep("notavailable");
  };

  const reset = () => {
    setActiveModal(null);
    setStep("form");
    setOtp("");
    setReceipt(null);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">

        <div>
          <h1 className="font-semibold text-blue-950">Liberty Banking</h1>
          <p className="text-xs text-gray-500">Secure Digital Banking</p>
        </div>

        {/* PROFILE */}
        <div className="relative">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center cursor-pointer"
          >
            👤
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg p-3 text-sm">

              <p className="font-semibold">Management Desk</p>
              <p className="text-gray-600">Checking Balance: $4000.00</p>
              <p className="text-gray-600">Card: {account.card}</p>

              <div className="border-t mt-2 pt-2">
                <p className="px-2 py-1 hover:bg-gray-100">Profile</p>
                <p className="px-2 py-1 hover:bg-gray-100">Logout</p>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ACCOUNT CARD */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-6 rounded-2xl">
          <p className="text-sm opacity-80">Checkings Account</p>
          <h2 className="text-3xl font-bold mt-2">$4000.00</h2>
          <p className="text-sm opacity-70 mt-1">{account.card}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a}
            onClick={() => openAction(a)}
            className="bg-white p-4 rounded-xl shadow text-left"
          >
            ⚡ {a}
          </button>
        ))}
      </div>

      {/* 🔵 NEW: INFO TIPS SECTION */}
      <div className="px-4 pb-6 space-y-3">

        <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-start">
          <span className="text-xl">💾</span>
          <div>
            <p className="font-semibold">Autosave</p>
            <p className="text-sm text-gray-600">
              Set a goal, save automatically with Liberty Banking's Auto Save and track your progress.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-start">
          <span className="text-xl">📊</span>
          <div>
            <p className="font-semibold">Budget</p>
            <p className="text-sm text-gray-600">
              Check in with your budget and stay on top of your spending.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-start">
          <span className="text-xl">🏠</span>
          <div>
            <p className="font-semibold">Home Option</p>
            <p className="text-sm text-gray-600">
              Your home purchase, refinance and insights right under one roof.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-start">
          <span className="text-xl">🔐</span>
          <div>
            <p className="font-semibold">Security Tip</p>
            <p className="text-sm text-gray-600">
              We will NEVER ask you to provide your security details such as OTPs, PINs or sensitive account codes.
            </p>
          </div>
        </div>

      </div>

      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center">

          <div className="bg-white w-full md:w-[420px] p-5 rounded-t-2xl">

            <div className="flex justify-between mb-3">
              <h2 className="font-semibold">{activeModal}</h2>
              <button onClick={reset}>✕</button>
            </div>

            {/* TRANSFER FLOW */}
            {isTransfer && step === "form" && (
              <div className="space-y-2 text-sm">

                <div className="flex items-center border p-2 rounded">
                  <span className="mr-2">$</span>
                  <input
                    className="w-full outline-none"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <input className="w-full border p-2 rounded" placeholder="Beneficiary Name" />
                <input className="w-full border p-2 rounded" placeholder="IBAN / Account Number" />
                <input className="w-full border p-2 rounded" placeholder="Bank Name" />
                <input className="w-full border p-2 rounded" placeholder="Swift Code" />
                <input className="w-full border p-2 rounded" placeholder="Routing Transit Number" />
                <input className="w-full border p-2 rounded" placeholder="Bank Address (Optional)" />
                <input className="w-full border p-2 rounded" placeholder="Remarks" />

                <button onClick={proceed} className="w-full bg-blue-950 text-white py-2 rounded">
                  Continue
                </button>
              </div>
            )}

            {/* NON-TRANSFER FORM */}
            {!isTransfer && step === "form" && (
              <div className="space-y-2 text-sm">

                <input className="w-full border p-2 rounded" placeholder="Enter Amount" />
                <input className="w-full border p-2 rounded" placeholder="Details" />

                <button onClick={finalContinue} className="w-full bg-blue-950 text-white py-2 rounded">
                  Continue
                </button>

              </div>
            )}

            {/* NOT AVAILABLE */}
            {step === "notavailable" && (
              <div className="text-center py-10 text-gray-600">
                Not available at the moment
              </div>
            )}

            {/* PROCESSING */}
            {step === "processing" && (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-2">Processing...</p>
              </div>
            )}

            {/* OTP */}
            {step === "otp" && (
              <div className="space-y-3">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button onClick={verifyOtp} className="w-full bg-blue-950 text-white py-2 rounded">
                  Verify
                </button>
              </div>
            )}

            {/* RECEIPT */}
            {step === "receipt" && (
              <div className="text-sm">
                <h3 className="font-semibold text-lg">Receipt</h3>
                <p>Reference: {receipt?.ref}</p>
                <p>Status: {receipt?.status}</p>
                <p>Amount: ${receipt?.amount}</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}