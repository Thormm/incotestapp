import { useState } from "react";
import logo from "../../assets/logo1.png";
import { FiClock, FiDownload, FiUpload, FiCopy, FiShare2, FiX } from "react-icons/fi";

export default function Deposit() {
  const depositCoin = "sei";
  const depositAddress = "sei1ku0lzrrqa85pasjj3wnlns9auk2zq6sn5lfqp0";
  const [coinvalue, setCoinvalue] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const qrData = `${depositCoin}:${depositAddress}?amount=${coinvalue}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const shareImage = async () => {
    try {
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);
      const blob = await response.blob();
      const filesArray = [new File([blob], 'qr-code.png', { type: blob.type })];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        await navigator.share({ files: filesArray, title: 'SEI Deposit QR Code' });
      } else {
        alert("Sharing not supported on this device.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleGenerate = () => {
    if (parseFloat(coinvalue) >= 30) {
      setShowPopup(true);
    } else {
      alert("Minimum deposit amount is $30.");
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-br from-[#121212] via-[#1a1c2c] to-[#0e0e0e]">
      {/* Top Navigation */}
      <header className="flex justify-between items-center px-2 py-2 shadow-md bg-gradient-to-br from-[#000000] via-[#000000] to-[#121212]">
        <img src={logo} alt="Logo" className="h-25 w-40" />
        <nav className="hidden md:flex gap-12 items-center text-sm justify-center">
          <a href="#" className="flex items-center gap-2 hover:text-[#d70f25]">History</a>
          <a href="#" className="flex items-center gap-2 hover:text-[#d70f25]">
            <div className="bg-gradient-to-br from-[#d70f25] to-red-700 p-4 rounded-full shadow-md">
              <FiDownload className="text-lg" />
            </div>
            Deposit
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#d70f25]">Withdrawal</a>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow px-4 py-6 flex justify-center items-start">
        <div className="w-full max-w-md bg-black rounded-xl p-6 shadow-lg">
          <h2 className="text-sm font-semibold mb-6">Deposit Wallet</h2>

          {/* Input Field */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter deposit amount"
              value={coinvalue}
              onChange={(e) => setCoinvalue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Notes */}
            <ul className="text-sm text-gray-400 mb-4 list-disc list-inside space-y-1">
              <li>Minimum deposit is $30</li>
              <li>No need to include a memo when sending</li>
            </ul>

          <button
            onClick={handleGenerate}
            className="w-full my-2 bg-gradient-to-br from-[#d70f25] to-red-700 text-white py-2 rounded-md hover:opacity-90"
          >
            Generate QR
          </button>
        </div>
      </main>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
          <div className="bg-[#1c1c1c] text-white rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-lg font-semibold text-center mb-4">Deposit {depositCoin.toUpperCase()}</h3>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`}
                alt="QR Code"
                className="bg-white p-2 rounded-md"
              />
            </div>

            {/* Address Display */}
            <div className="bg-white text-black text-center text-sm p-2 rounded-md break-words mb-3">
              {depositAddress}
            </div>

            {/* Copy & Share Buttons */}
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex flex-col items-center">
                <button onClick={copyToClipboard} className="text-gray-300 hover:text-white">
                  <FiCopy size={22} />
                </button>
                <span className="text-xs mt-1">Copy</span>
              </div>
              <div className="flex flex-col items-center">
                <button onClick={shareImage} className="text-gray-300 hover:text-white">
                  <FiShare2 size={22} />
                </button>
                <span className="text-xs mt-1">Share</span>
              </div>
            </div>

            

            {copied && <p className="text-green-400 text-xs text-center mt-3">Address copied!</p>}
          </div>
        </div>
      )}

      {/* Bottom nav for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1c2c] border-t border-gray-700 flex justify-around py-3 text-xs z-10">
        <a href="#" className="flex flex-col items-center text-white hover:text-[#d70f25]">
          <FiClock className="text-lg mb-1" />
          History
        </a>
        <a href="#" className="flex flex-col items-center text-white -mt-6">
          <div className="bg-gradient-to-br from-[#d70f25] to-red-700 p-4 rounded-full shadow-md">
            <FiDownload className="text-2xl" />
          </div>
          <span className="mt-1">Deposit</span>
        </a>
        <a href="#" className="flex flex-col items-center text-white hover:text-[#d70f25]">
          <FiUpload className="text-lg mb-1" />
          Withdrawal
        </a>
      </nav>
    </div>
  );
}
