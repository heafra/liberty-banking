"use client";


export default function BuyCrypto() {
  return (
    <div className="p-4 bg-white min-h-screen">

      <h1 className="text-xl font-semibold text-orange-800">
        Buy Crypto
      </h1>

      <p className="text-sm text-gray-500">
        Buy Crypto using your Card
      </p>

      <select className="w-full border p-3 rounded mt-4">
        <option>Bitcoin (BTC)</option>
      </select>

      <div className="space-y-3 mt-4">
        <input placeholder="Amount $" className="w-full border p-3 rounded" />
        <input placeholder="Wallet Address" className="w-full border p-3 rounded" />

        <select className="w-full border p-3 rounded">
          <option>Visa</option>
          <option>Mastercard</option>
          <option>American Express</option>
        </select>

        <input placeholder="Name on Card" className="w-full border p-3 rounded" />
        <input placeholder="Card Number" className="w-full border p-3 rounded" />
        <input placeholder="Expiry Date" className="w-full border p-3 rounded" />
        <input placeholder="CVV" className="w-full border p-3 rounded" />
      </div>

      <button className="w-full mt-4 bg-orange-800 text-white py-3 rounded">
        Continue
      </button>

    </div>
  );
}