"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Modern Banking Built For You
            </h1>

            <p className="mt-6 text-gray-200 text-lg">
              Send money, manage accounts, and take control of your finances with secure digital banking.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                Login
              </button>

              <button className="border border-white px-6 py-3 rounded-lg">
                Learn More
              </button>
            </div>

            {/* TRUST LINE */}
            <p className="mt-6 text-sm text-gray-300">
              Trusted by thousands of customers worldwide
            </p>
          </div>

          {/* FLOATING CARD */}
          <div className="hidden md:flex justify-center">
            <div className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 rotate-3">
              <p className="text-sm text-gray-500">Liberty Banking</p>
              <h3 className="text-xl font-bold mt-4">•••• 8529</h3>

              <div className="mt-6 flex justify-between text-sm">
                <span>CHECKINGS</span>
                <span>VISA</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Banking Services</h2>
          <p className="text-gray-500 mt-2">Everything you need in one place</p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            {[
              "Wire Transfer",
              "Local Transfer",
              "Internal Transfer",
              "Crypto Trading",
              "Bill Payments",
              "Card Management"
            ].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-lg mb-4">
                  $
                </div>
                <h3 className="font-semibold">{item}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Fast, secure and reliable banking service.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">

          <div>
            <h3 className="text-4xl font-bold">10K+</h3>
            <p className="text-gray-300 mt-2">Active Users</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">$50M+</h3>
            <p className="text-gray-300 mt-2">Transactions Processed</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">99.9%</h3>
            <p className="text-gray-300 mt-2">Uptime Security</p>
          </div>

        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            className="rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold">Secure & Smart Banking</h2>
            <p className="text-gray-500 mt-4">
              Experience modern financial tools designed for speed, security, and convenience.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>✔ Instant transfers worldwide</li>
              <li>✔ Advanced fraud protection</li>
              <li>✔ Smart budgeting tools</li>
              <li>✔ Real-time notifications</li>
            </ul>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">What Customers Say</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            {[
              {
                name: "Sarah Johnson",
                text: "Fast, secure and extremely easy to use banking platform.",
                img: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Michael Smith",
                text: "Best digital banking experience I’ve ever used.",
                img: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Emily Davis",
                text: "Everything I need in one place. Highly recommended.",
                img: "https://randomuser.me/api/portraits/women/65.jpg"
              }
            ].map((u) => (
              <div key={u.name} className="bg-white p-6 rounded-xl shadow">
                <img src={u.img} className="w-14 h-14 rounded-full mx-auto" />
                <p className="mt-4 text-gray-600 text-sm">"{u.text}"</p>
                <h4 className="mt-3 font-semibold">{u.name}</h4>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 text-center bg-blue-950 text-white px-6">
        <h2 className="text-3xl font-bold">Start Banking Smarter Today</h2>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="mt-6 bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold"
        >
          Login Now
        </button>
      </section>

    </div>
  );
}