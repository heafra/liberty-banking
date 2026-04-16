"use client";


import { useState } from "react";

export default function WireTransfer() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    amount: "",
    beneficiary: "",
    iban: "",
    bank: "",
    swift: "",
    routing: "",
    pin: "",
    address: "",
    remarks: ""
  });

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);

  return (
    <div className="bg-white min-h-screen p-4">

      {/* ===================== */}
      {/* STEP 1: FORM */}
      {/* ===================== */}
      {step === 1 && (
        <>
          <h1 className="text-xl font-semibold text-orange-800">
            Wire Transfer
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Heritage Secure Wire Transfer — Fee: 1%
          </p>

          <div className="mt-4 space-y-3">

            <input
              placeholder="From Account"
              className="w-full border p-3 rounded"
            />

            <input
              placeholder="Enter Amount ($)"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <input
              placeholder="Beneficiary Name"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, beneficiary: e.target.value })
              }
            />

            <input
              placeholder="IBAN / Account Number"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, iban: e.target.value })
              }
            />

            <input
              placeholder="Bank"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, bank: e.target.value })
              }
            />

            <input
              placeholder="SWIFT Code"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, swift: e.target.value })
              }
            />

            <input
              placeholder="Routing Transit Number"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, routing: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="PIN"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, pin: e.target.value })
              }
            />

            <input
              placeholder="Bank Address (Optional)"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <textarea
              placeholder="Remarks"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, remarks: e.target.value })
              }
            />

          </div>

          <button
            onClick={() => {
              setStep(2);

              // simulate processing delay
              setTimeout(() => {
                setStep(3);
              }, 2000);
            }}
            className="w-full mt-5 bg-orange-800 text-white py-3 rounded"
          >
            Continue
          </button>
        </>
      )}

      {/* ===================== */}
      {/* STEP 2: PROCESSING */}
      {/* ===================== */}
      {step === 2 && (
        <div className="flex flex-col items-center justify-center h-[70vh]">

          <div className="w-16 h-16 border-4 border-orange-300 border-t-orange-800 rounded-full animate-spin"></div>

          <h2 className="mt-5 text-lg font-semibold text-orange-800">
            Processing Transfer
          </h2>

          <p className="text-sm text-gray-500 mt-2 text-center">
            Please wait while we prepare your transaction...
          </p>

        </div>
      )}

      {/* ===================== */}
      {/* STEP 3: OTP */}
      {/* ===================== */}
      {step === 3 && (
        <>
          <h2 className="text-lg font-semibold text-orange-800">
            Security Verification
          </h2>

          <p className="text-sm text-gray-600 mt-2">
            Enter the one-time verification code to continue.
          </p>

          <p className="text-xs mt-2 text-gray-500">
            Demo OTP: <b>1234</b>
          </p>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border p-3 rounded mt-4"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={() => {
              if (otp === "1234") {
                setReceipt({
                  ...form,
                  reference:
                    "TXN" + Math.floor(Math.random() * 99999999),
                  status: "Completed (Demo)"
                });
                setStep(4);
                setError("");
              } else {
                setError("Invalid OTP. Use 1234 for demo.");
              }
            }}
            className="w-full mt-4 bg-orange-800 text-white py-3 rounded"
          >
            Verify
          </button>
        </>
      )}

      {/* ===================== */}
      {/* STEP 4: RECEIPT */}
      {/* ===================== */}
      {step === 4 && receipt && (
        <>
          <h2 className="text-lg font-semibold text-orange-800">
            Transaction Receipt
          </h2>

          <div className="mt-4 bg-gray-100 p-4 rounded text-sm space-y-1">
            <p><b>Reference:</b> {receipt.reference}</p>
            <p><b>Amount:</b> ${receipt.amount}</p>
            <p><b>Beneficiary:</b> {receipt.beneficiary}</p>
            <p><b>Bank:</b> {receipt.bank}</p>
            <p><b>Status:</b> {receipt.status}</p>
          </div>

          <button
            onClick={() => {
              setStep(1);
              setOtp("");
              setReceipt(null);
            }}
            className="w-full mt-5 bg-orange-800 text-white py-3 rounded"
          >
            Done
          </button>
        </>
      )}

    </div>
  );
}




