"use client";

export default function LocalTransfer() {
  return (
    <div className="p-4 bg-white min-h-screen">

      <h1 className="text-xl font-semibold text-orange-800">
        Heritage Secure Local Transfer
      </h1>

      <p className="text-sm text-gray-500">
        Transfer Funds to a local Bank
      </p>

      <select className="w-full border p-3 rounded mt-4">
        <option>Savings (*** 8750) - $2,652,810.00</option>
        <option>Checking (*** 8529) - $5,361,000.00</option>
      </select>

      <div className="space-y-3 mt-4">
        <input placeholder="Amount $" className="w-full border p-3 rounded" />
        <input placeholder="Beneficiary Name" className="w-full border p-3 rounded" />
        <input placeholder="IBAN / Account Number" className="w-full border p-3 rounded" />
        <input placeholder="Bank" className="w-full border p-3 rounded" />
        <input placeholder="Routing Transit Number" className="w-full border p-3 rounded" />
        <input placeholder="Bank Address (Optional)" className="w-full border p-3 rounded" />
        <textarea placeholder="Remarks" className="w-full border p-3 rounded"></textarea>
        <input placeholder="PIN" type="password" className="w-full border p-3 rounded" />
      </div>

      <button className="w-full mt-4 bg-orange-800 text-white py-3 rounded">
        Continue
      </button>

    </div>
  );
}