"use client";


export default function InternalTransfer() {
  return (
    <div className="p-4 bg-white min-h-screen">

      <h1 className="text-xl font-semibold text-orange-800">
        Internal Transfer
      </h1>

      <select className="w-full border p-3 rounded mt-4">
        <option>Savings (*** 8750) - $2,652,810.00</option>
        <option>Checking (*** 8529) - $5,361,000.00</option>
      </select>

      <div className="space-y-3 mt-4">
        <input placeholder="Amount $" className="w-full border p-3 rounded" />
        <input placeholder="IBAN / Account Number" className="w-full border p-3 rounded" />
        <input placeholder="PIN" type="password" className="w-full border p-3 rounded" />
        <textarea placeholder="Remarks" className="w-full border p-3 rounded"></textarea>
      </div>

      <button className="w-full mt-4 bg-orange-800 text-white py-3 rounded">
        Continue
      </button>

    </div>
  );
}

