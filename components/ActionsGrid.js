export default function ActionsGrid({ setSection }) {
  const actions = [
    "Wire Transfer",
    "Local Transfer",
    "Internal Transfer",
    "Pay Bills",
    "Deposit",
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      {actions.map((a) => (
        <button
          key={a}
          onClick={() =>
            a === "Wire Transfer"
              ? setSection("transfer")
              : alert(a + " coming soon")
          }
          className="bg-gray-100 p-4 rounded-lg"
        >
          {a}
        </button>
      ))}
    </div>
  );
}
