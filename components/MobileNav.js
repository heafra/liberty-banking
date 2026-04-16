export default function MobileNav({ setSection }) {
  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white flex justify-around p-3 border-t">
      <button onClick={() => setSection("home")}>Home</button>
      <button onClick={() => setSection("transfer")}>Transfer</button>
      <button>Cards</button>
      <button>Profile</button>
    </div>
  );
}
