"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [view, setView] = useState("home");
  const [modal, setModal] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [formData, setFormData] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW

  // ✅ FIXED AUTH CHECK
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("loggedIn");

      if (!loggedIn) {
        window.location.href = "/";
      } else {
        setLoading(false);
      }
    };

    setTimeout(checkAuth, 100); // 👈 prevents instant redirect bug
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.placeholder]: e.target.value });
  };

  const handleProceed = () => {
    if (modal === "wire") {
      setProcessing(true);

      setTimeout(() => {
        setProcessing(false);
        setOtpStep(true);
      }, 2000);
    } else {
      alert("This service is currently unavailable. Contact support.");
      setModal(null);
    }
  };

  const verifyOtp = (val) => {
    if (val === "1234") {
      setOtpStep(false);

      setReceipt({
        ...formData,
        ref: "TXN" + Math.floor(Math.random() * 999999),
        date: new Date().toLocaleString(),
        status: "Successful"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-24">

      {/* TOP */}
      <div className="bg-orange-900 text-white p-4 flex justify-between">
        <h1>Liberty Banking</h1>
        <button onClick={() => setModal("profile")} className="text-2xl">👤</button>
      </div>

      {/* HOME */}
      {view === "home" && (
        <div>
          <div className="bg-orange-700 text-white m-4 p-6 rounded-2xl">
            <p>CHECKINGS ACCOUNT</p>
            <h2 className="text-3xl font-bold">$4,000.00</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 px-4">
            {[
              "wire",
              "local",
              "internal",
              "crypto",
              "bills",
              "beneficiary",
              "alerts",
              "settings",
              "support"
            ].map((item) => (
              <div
                key={item}
                onClick={() => setModal(item)}
                className="bg-white p-4 rounded-xl text-center shadow cursor-pointer capitalize"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[95%] max-w-md space-y-2">

            {modal === "profile" && (
              <>
                <h2 className="font-bold">My Profile</h2>
                <p>Checkings Account</p>
                <p className="font-bold">$4,000.00</p>
              </>
            )}

            {modal === "wire" && (
              <>
                {[
                  "From",
                  "Enter Amount $",
                  "Beneficiary Name",
                  "IBAN/Account Number",
                  "Bank",
                  "Swift Code",
                  "Routing Transit Number",
                  "PIN",
                  "Bank Address (Optional)",
                  "Remarks"
                ].map((p, i) => (
                  <input key={i} placeholder={p} className="w-full border-b p-2" onChange={handleChange}/>
                ))}
              </>
            )}

            {["local","internal"].includes(modal) && (
              <>
                {[
                  "Enter Amount $",
                  "Beneficiary Name",
                  "IBAN/Account Number",
                  "Bank",
                  "Routing Transit Number",
                  "Bank Address (Optional)",
                  "Remarks",
                  "PIN"
                ].map((p, i) => (
                  <input key={i} placeholder={p} className="w-full border-b p-2" onChange={handleChange}/>
                ))}
              </>
            )}

            {modal === "crypto" && (
              <>
                {["Amount","Wallet","Receive","Card Number","Expiry Date"].map((p,i)=>(
                  <input key={i} placeholder={p} className="w-full border-b p-2" onChange={handleChange}/>
                ))}
              </>
            )}

            {modal === "bills" && (
              <>
                <p>Plane Tickets</p>
                <p>Hotel Booking</p>
              </>
            )}

            {["alerts","settings","support","beneficiary"].includes(modal) && (
              <p>This feature is currently unavailable.</p>
            )}

            {modal !== "profile" && (
              <button onClick={handleProceed} className="w-full bg-orange-700 text-white p-2 mt-2 rounded">
                Proceed
              </button>
            )}

            <button onClick={() => setModal(null)} className="text-sm text-gray-500">
              Close
            </button>

          </div>
        </div>
      )}

      {/* PROCESSING */}
      {processing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-white">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2">Processing transfer...</p>
          </div>
        </div>
      )}

      {/* OTP */}
      {otpStep && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white p-6 rounded text-center">
            <p>Enter OTP (1234)</p>
            <input onChange={(e) => verifyOtp(e.target.value)} className="border p-2 mt-2 text-center"/>
          </div>
        </div>
      )}

      {/* RECEIPT */}
      {receipt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white p-6 rounded w-[90%] max-w-md">
            <h2 className="font-bold mb-2">Transaction Receipt</h2>
            {Object.entries(receipt).map(([k,v]) => (
              <p key={k}><strong>{k}:</strong> {v}</p>
            ))}
            <button onClick={() => setReceipt(null)} className="mt-3 bg-orange-700 text-white p-2 w-full">
              Done
            </button>
          </div>
        </div>
      )}

      {/* NAV */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around p-3">
        <button onClick={() => setView("home")}>Home</button>
        <button onClick={() => alert("Notification Center")}>Notifications</button>
        <button onClick={() => setModal("profile")}>Settings</button>
        <button onClick={() => alert("Support Ticket")}>Support</button>
        <button onClick={logout}>Logout</button>
      </div>

    </div>
  );
}