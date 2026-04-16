export default function TransferForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h3 className="mb-3">Wire Transfer</h3>
      <p className="text-sm mb-3">Fee: 1%</p>

      <input className="border p-2 w-full mb-2" placeholder="Amount" />
      <input className="border p-2 w-full mb-2" placeholder="Beneficiary" />
      <input className="border p-2 w-full mb-2" placeholder="IBAN" />
      <input className="border p-2 w-full mb-2" placeholder="Bank" />
      <input className="border p-2 w-full mb-2" placeholder="Swift Code" />
      <input className="border p-2 w-full mb-2" value="7486" readOnly />

      <button
        onClick={() => alert("Transfer sent (demo)")}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        Send Transfer
      </button>
    </div>
  );
}