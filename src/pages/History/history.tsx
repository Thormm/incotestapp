import { useState } from "react";
import { FiClock, FiDownload, FiUpload } from "react-icons/fi";
import logo from "../../assets/logo1.png";

const mockData = {
  deposits: Array.from({ length: 42 }, (_, i) => ({
    color: "bg-green-500",
    title: "Portfolio Deposit",
    time: "10:00am",
    author: `02-06-2025`,
    address: `0xDEPOSIT${i.toString().padStart(2, "0")}`,
    amount: (100 + i * 5).toFixed(2),
  })),
  withdrawals: Array.from({ length: 23 }, (_, i) => ({
    color: "bg-red-500",
    title: "Withdrawal",
    time: "3:15pm",
    author: `03-06-2025`,
    address: `0xWITHDRAW${i.toString().padStart(2, "0")}`,
    amount: (50 + i * 4).toFixed(2),
  })),
  dailyInterests: Array.from({ length: 18 }, (_, i) => ({
    color: "bg-yellow-500",
    title: "Interest",
    time: "11:00am",
    author: `04-06-2025`,
    address: `0xINTEREST${i.toString().padStart(2, "0")}`,
    amount: (2.5 + i * 0.1).toFixed(2),
  })),
  referrals: Array.from({ length: 12 }, (_, i) => ({
    color: "bg-blue-500",
    title: "Referral Bonus",
    time: "12:45pm",
    author: `05-06-2025`,
    address: `0xREFERRAL${i.toString().padStart(2, "0")}`,
    amount: (10 + i).toFixed(2),
  })),
};

export default function History() {
  const [activeTab, setActiveTab] = useState("deposits");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const transactions = mockData[activeTab];
  const totalPages = Math.ceil(transactions.length / pageSize);
  const pageData = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
      <main className="flex-grow px-4 py-2 flex justify-center items-center">
        <div className="w-full max-w-md bg-black rounded-xl p-6 shadow-lg">
          <h2 className="text-sm font-semibold mb-4">Transaction History</h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            {["deposits", "withdrawals", "dailyInterests", "referrals"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`flex-1 capitalize px-2 py-2 rounded text-xs text-center ${
                    activeTab === tab
                      ? "bg-gradient-to-br from-[#d70f25] to-red-700 text-white"
                      : "bg-none text-gray-300"
                  }`}
                >
                  {tab === "dailyInterests"
                    ? "Interests"
                    : tab.replace(/([A-Z])/g, " $1")}
                </button>
              )
            )}
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {pageData.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1f1f1f] rounded-full flex items-center justify-between px-4 py-3 shadow"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full ${item.color} flex items-center justify-center`}
                  >
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">
                      {item.address}
                    </div>
                    <div className="text-gray-400 text-[0.5rem] flex flex-wrap gap-1 items-center">
                      <span>{item.time}</span>
                      <span className="text-[8px]">•</span>
                      <span>{item.author}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-green-300">
                  ${item.amount}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6 text-xs">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === i + 1
                    ? "bg-gradient-to-br from-[#d70f25] to-red-700 text-white"
                    : "bg-[#2e2e2e] text-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

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
