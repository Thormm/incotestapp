import { useState } from "react";
import logo from "../../assets/logo1.png";
import { FiClock, FiDownload, FiUpload } from "react-icons/fi";

export default function Withdrawal() {
  const [amount, setAmount] = useState("");
  const [walletAddress] = useState("0xABC...1234");
  const [balance] = useState(458.78);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleWithdraw = () => {
    setError("");

    if (!amount) {
      setError("Please enter an amount.");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (numericAmount > balance) {
      setError("Amount exceeds available balance.");
      return;
    }

    setShowSuccess(true);
    setAmount(""); // reset field
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-br from-[#121212] via-[#1a1c2c] to-[#0e0e0e]">
      {/* Top Navigation */}
      <header className="flex justify-between items-center px-2 py-2 shadow-md bg-gradient-to-br from-[#000000] via-[#000000] to-[#121212]">
        <img src={logo} alt="Logo" className="h-25 w-40" />
        <nav className="hidden md:flex gap-12 items-center text-sm justify-center">
          <a href="#" className="flex items-center gap-2 hover:text-[#d70f25]">
            History
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#d70f25]">
            <div className="bg-gradient-to-br from-[#d70f25] to-red-700 p-4 rounded-full shadow-md">
              <FiDownload className="text-lg" />
            </div>
            Deposit
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#d70f25]">
            Withdrawal
          </a>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow px-4 flex justify-center items-center">
        <div className="w-full max-w-md bg-black rounded-xl p-6 shadow-lg">
          <h2 className="text-sm font-semibold mb-4 text-center">
            Withdraw Funds
          </h2>

          <div className="my-6 text-center">
            <div className="text-3xl font-bold text-green-400">
              ${balance.toFixed(2)}
            </div>
            <label className="block text-xs mb-1 text-gray-400">
              Available Balance
            </label>
          </div>

          <div className="bg-[#1a1c2c] text-xs text-gray-400 rounded-md px-4 py-3 mb-4 border border-gray-700">
            <ul className="list-disc list-inside space-y-1">
              <li>
                Minimum withdrawal is{" "}
                <span className="text-white font-medium">$10</span>
              </li>
              <li>
                Withdrawal charge is{" "}
                <span className="text-white font-medium">$5</span>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="block text-xs px-2 mb-1 text-gray-400">
              Enter Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0e0e0e] text-white text-xs border border-gray-600 rounded-lg px-2 py-4 focus:outline-none focus:ring-2 focus:ring-[#271b4f]"
              placeholder="Enter Withdrawal amount"
            />
            {error && (
              <div className="text-red-500 text-xs mt-2 px-1">{error}</div>
            )}
          </div>

          <button
            onClick={handleWithdraw}
            className="w-full bg-gradient-to-br from-[#d70f25] to-red-700 text-white py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            Place Withdrawal
          </button>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white text-black p-6 rounded-xl shadow-xl text-center w-80">
            <div className="mb-3 flex justify-center">
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/clouds/100/ok.png"
                alt="ok"
                className="animate-fade-in"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Withdrawal Successful!</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your request was processed.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 bg-[#d70f25] text-white rounded-lg hover:opacity-90 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Bottom nav for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1c2c] border-t border-gray-700 flex justify-around py-3 text-xs z-10">
        <a
          href="#"
          className="flex flex-col items-center text-white hover:text-[#d70f25]"
        >
          <FiClock className="text-lg mb-1" />
          History
        </a>
        <a href="#" className="flex flex-col items-center text-white -mt-6">
          <div className="bg-gradient-to-br from-[#d70f25] to-red-700 p-4 rounded-full shadow-md">
            <FiDownload className="text-2xl" />
          </div>
          <span className="mt-1">Deposit</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-white hover:text-[#d70f25]"
        >
          <FiUpload className="text-lg mb-1" />
          Withdrawal
        </a>
      </nav>
    </div>
  );
}
