export default function Sidebar({ setSection }) {
  return (
    <div className="hidden md:block w-60 h-screen bg-blue-900 text-white fixed p-5">
      <h2 className="text-xl mb-6">Liberty</h2>
      <button onClick={() => setSection("home")} className="block mb-3">
        Dashboard
      </button>
      <button onClick={() => setSection("transfer")} className="block">
        Transfers
      </button>
    </div>
  );
}
