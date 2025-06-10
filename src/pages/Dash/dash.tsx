import { useState } from "react";
import logo from "../../assets/logo1.png";
import { FiClock, FiDownload, FiUpload } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const chartData = [
  { day: "2", month: "Nov", value: 60, active: true },
  { day: "3", month: "Nov", value: 40, active: false },
  { day: "4", month: "Nov", value: 65, active: true },
  { day: "5", month: "Nov", value: 80, active: false },
  { day: "6", month: "Nov", value: 55, active: true },
];

import { Banknote, Wallet, Gift, Users } from "lucide-react";
const stats = [
  {
    background: "bg-gradient-to-br from-[#121212] via-[#121212] to-[#2f0ba6]",
    label: "Deposited",
    value: "$100",
    icon: <Banknote size={10} className="text-white" />,
  },
  {
    background: "bg-gradient-to-br from-[#121212] via-[#121212] to-[#271b4f]",
    label: "Withdrawn",
    value: "$2000",
    icon: <Wallet size={10} className="text-white" />,
  },
  {
    background: "bg-gradient-to-br from-[#121212] via-[#121212] to-[#2f0ba6]",
    label: "Referred",
    value: "50",
    subValue: "85",
    icon: <Users size={10} className="text-white" />,
  },
  {
    background: "bg-gradient-to-br from-[#121212] via-[#121212] to-[#271b4f]",
    label: "Refferral Earned",
    value: "$26",
    icon: <Gift size={10} className="text-white" />,
  },
];

export default function Dash() {
  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-br from-[#121212] via-[#1a1c2c] to-[#0e0e0e]">
      {/* Top Navigation */}
      <header className="flex justify-between items-center px-2 py-2 shadow-md bg-gradient-to-br from-[#000000] via-[#000000] to-[#121212]">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-25 w-40" />

        {/* Top nav for medium+ screens */}
        <nav className="hidden md:flex gap-12 px-2 items-center text-sm justify-center">
          <a href="#" className="flex items-center gap-2 hover:text-[#d70f25]">
            History
          </a>
          <a href="#" className="flex items-center gap-2 ho2er:text-[#d70f25]">
            <div className="bg-gradient-to-br from-[#d70f25] to-red-700 p-4 rounded-full shadow-md">
              <FiDownload className="text-lg" />
            </div>
            Deposit
          </a>
          <a
            href="/withdrawal"
            className="flex items-center gap-2 hover:text-[#d70f25]"
          >
            Withdrawal
          </a>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow p-4 flex justify-center items-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">
          {/* First div - 1/3 on large, full on small */}
          <div className="bg-black rounded-lg p-4 w-full md:w-1/3 text-white relative overflow-hidden">
            <h6 className="text-sm font-semibold mb-1">Portfolio Balance</h6>
            <p className="text-xs text-gray-400 mb-4">06-02-2025</p>

            <div className="relative flex justify-start items-start h-40">
              {/* Decorative small circle - top left */}
              <div className="absolute bottom-4 left-50 w-4 h-4 rounded-full bg-[#F6C156] opacity-80" />

              {/* Big Circle - bottom left */}
              <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-[#d70f25] flex flex-col items-center justify-center text-white">
                <p className="text-xs font-semibold">SEI</p>
                <p className="text-sm font-bold">1,988,899</p>
              </div>

              {/* Small Circle - bottom right */}
              <div className="absolute bottom-10 right-40 w-16 h-16 rounded-full bg-[#271b4f] flex items-center justify-center text-[12px] font-bold text-white">
                $10,000
              </div>
            </div>

            <div className="flex justify-between items-center bg-gray-700 text-white rounded-xl p-4 shadow-md relative">
              {/* Left Section */}
              <div>
                <h2 className="text-small font-semibold">Click to share</h2>
                <p className="text-xs text-[#F6C156]">ID: 18899</p>
              </div>

              {/* Right Section - Copy Icon */}
              <button
                onClick={() => {
                  const shareUrl = "https://seiverse.io?commune=18899";
                  navigator.clipboard.writeText(shareUrl);
                  alert("Link copied to clipboard!");
                }}
                className="p-2 rounded-full bg-black hover:bg-gray-900 transition"
                title="Copy to clipboard"
              >
                <FiCopy className="text-white text-lg" />
              </button>
            </div>
          </div>
          {/* Second div - 2/3 on large, full on small */}
          <div className="bg-black rounded-lg p-4 w-full md:w-1/3 text-white relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`${stat.background} rounded-2xl shadow-md px-2 py-2 flex flex-col justify-between`}
                >
                  {/* Top row: icon + label */}
                  <div className="flex items-center gap-1">
                    <div className="bg-black p-2 rounded-md">{stat.icon}</div>
                    <div className="text-gray-400 px-2 text-xs">
                      {stat.label}
                    </div>
                  </div>

                  {/* Bottom row: value + subValue */}
                  <div className="text-right mt-2">
                    <div className="text-white text-md font-bold">
                      {stat.value}
                      {stat.subValue && (
                        <span className="text-xs text-lime-400 font-medium ml-1 align-middle">
                          ({stat.subValue})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 mt-4">
              {[
                {
                  color: "bg-green-500",
                  title: "Portfolio Deposit",
                  time: "8:30am",
                  author: "02-06-2025",
                },
                {
                  color: "bg-red-500",
                  title: "Withdrawal Attempt",
                  time: "8:30am",
                  author: "02-06-2025",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#1f1f1f] rounded-full flex items-center justify-between px-4 py-3 shadow"
                >
                  {/* Left Icon and Text */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full ${item.color} flex items-center justify-center`}
                    >
                      {/* Replace with actual icons if needed */}
                      <span className="text-white text-sm font-bold">✉️</span>
                    </div>
                    <div>
                      <div className="text-white text-xs">{item.title}</div>
                      <div className="text-gray-400 text-[0.5rem] flex items-center gap-2">
                        <span>{item.time}</span>
                        <span className="text-[8px]">•</span>
                        <span>{item.author}</span>
                      </div>
                    </div>
                  </div>

                  {/* Options Menu Icon (3 dots) */}
                  <div className="text-gray-400 text-xl cursor-pointer">⋮</div>
                </div>
              ))}
            </div>
          </div>
          {/* Second div - 2/3 on large, full on small */}
          <div className="bg-black rounded-lg p-4 w-full md:w-1/3 text-white relative overflow-hidden">
            <h6 className="text-sm font-semibold mb-1">Daily stats</h6>
            <div className="bg-black rounded-2xl p-6 shadow-xl w-full">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={chartData}
                  barCategoryGap={50} // space between bars
                  barSize={15}
                >
                  {/* Left Y-axis */}
                  <YAxis
                    width={30}
                    stroke="#666"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#999", fontSize: 12 }}
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={({ x, y, payload }) => {
                      const item = chartData[payload.index];
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={16}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={12}
                            fontWeight={500}
                          >
                            {item.day}
                          </text>
                          <text
                            x={0}
                            y={20}
                            dy={16}
                            textAnchor="middle"
                            fill="#999"
                            fontSize={10}
                          >
                            {item.month}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "none",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#ccc" }}
                    cursor={{ fill: "#222" }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.active ? "#D6FF3F" : "#444"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Display Month Once Below */}
            <div className="text-center mt-1 text-sm text-gray-400">Nov</div>
          </div>
        </div>
      </main>

      {/* Bottom nav for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1c2c] border-t border-gray-700 flex justify-around py-3 text-xs z-10">
        {/* History */}
        <a
          href="#"
          className="flex flex-col items-center text-white hover:text-[#d70f25]"
        >
          <FiClock className="text-lg mb-1" />
          History
        </a>

        {/* Deposit - Big round gradient */}
        <a href="#" className="flex flex-col items-center text-white -mt-6">
          <div className="bg-gradient-to-br from-[#d70f25] to-red-700 p-4 rounded-full shadow-md">
            <FiDownload className="text-2xl" />
          </div>
          <span className="mt-1">Deposit</span>
        </a>

        {/* Withdrawal */}
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
