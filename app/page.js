"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <div className="relative bg-blue-950 text-white overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

        <div className={`relative max-w-6xl mx-auto px-6 py-28 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Banking Reimagined
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-xl">
            Secure your finances, send money globally, and manage everything
            from one powerful platform.
          </p>

          <button
            onClick={() => setShowLogin(true)}
            className="mt-8 bg-white text-blue-950 px-8 py-3 rounded font-semibold shadow-lg hover:scale-105 transition"
          >
            Login
          </button>

        </div>

        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-6 rounded-2xl shadow-2xl w-80 rotate-6">
            <p className="text-sm">Liberty Banking</p>
            <h3 className="mt-4 text-xl tracking-widest">
              4716 •••• •••• 2194
            </h3>
            <div className="flex justify-between mt-6 text-sm">
              <span>VALID THRU 10/28</span>
              <span>VISA</span>
            </div>
          </div>
        </div>

      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-8 w-[90%] max-w-md text-center shadow-lg">

            <h2 className="text-2xl font-bold mb-4">Secure Login</h2>

            <p className="text-gray-500 text-sm mb-6">
              Enter your account credentials to continue
            </p>

            <input
              type="text"
              placeholder="Account ID"
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded mb-4"
            />

            {/* ✅ FIXED LOGIN BUTTON */}
            <button
              onClick={() => {
                localStorage.setItem("loggedIn", "true");
                setTimeout(() => {
                  window.location.href = "/dashboard";
                }, 200); // 👈 delay fixes iPhone/localStorage issue
              }}
              className="bg-blue-900 text-white px-6 py-3 rounded w-full"
            >
              Login
            </button>

            <button
              onClick={() => setShowLogin(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* KEEP EVERYTHING ELSE SAME */}

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            "Secure Transfers",
            "Smart Budgeting",
            "Instant Payments",
            "Crypto Access",
            "Card Management",
            "Fraud Protection"
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-white p-6 rounded-xl shadow transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="font-semibold">{item}</h3>
              <p className="text-gray-500 text-sm mt-2">
                Powerful tools designed to give you full financial control.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="h-[400px] bg-fixed bg-center bg-cover flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')"
        }}
      >
        <div className="bg-black/50 backdrop-blur-md p-10 rounded-xl text-center">
          <h2 className="text-3xl font-bold">
            Banking That Moves With You
          </h2>
          <p className="mt-3 text-gray-200">
            Experience seamless and secure financial services anywhere.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-10">
            Trusted by Users Worldwide
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sophia Williams",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                text: "This platform completely changed how I manage my finances."
              },
              {
                name: "James Carter",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
                text: "Fast, secure and extremely easy to use."
              },
              {
                name: "Olivia Brown",
                img: "https://randomuser.me/api/portraits/women/65.jpg",
                text: "The best digital banking experience I’ve had."
              }
            ].map((user, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={user.img}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 text-sm">"{user.text}"</p>
                <h4 className="mt-3 font-semibold">{user.name}</h4>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="bg-blue-950 text-white py-20 text-center">
        <h2 className="text-3xl font-bold">
          Start Banking Smarter Today
        </h2>

        <button
          onClick={() => setShowLogin(true)}
          className="mt-6 bg-white text-blue-950 px-8 py-3 rounded shadow hover:scale-105 transition"
        >
          Login
        </button>
      </div>

    </div>
  );
}