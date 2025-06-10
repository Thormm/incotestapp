import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../../assets/logo1.png";
import heroImage from "../../assets/hero.png";
import investImage from "../../assets/steps.png";
import tree from "../../assets/tree.png";
import red from "../../assets/red.jpg";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "How do I connect my SEI Wallet?",
    answer:
      "Click the 'Connect Wallet' button and select your wallet. Approve the connection in your wallet interface.",
  },
  {
    question: "What is the minimum deposit?",
    answer: "The minimum deposit required is $30 to start earning daily ROI.",
  },
  {
    question: "When can I withdraw?",
    answer: "Withdrawals can be made anytime if your balance is at least $10.",
  },
  {
    question: "Are there any withdrawal fees?",
    answer: "Yes. A 5% fee applies to all withdrawals.",
  },
  {
    question: "How fast are withdrawals?",
    answer: "They're automatic and processed instantly after your request.",
  },
];

export default function Home() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-6 py-3 bg-black shadow-md sticky top-0 z-50">
        <img src={logo} alt="Logo" className="h-20 md:h-30" />

        {/* Styled ConnectButton */}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openConnectModal,
            openAccountModal,
            mounted,
          }) => {
            const connected = mounted && account && chain;

            return (
              <div className="relative">
                <button
                  onClick={() => {
                    if (connected) {
                      setShowDropdown(!showDropdown);
                    } else {
                      openConnectModal();
                    }
                  }}
                  className={`text-xs md:text-base px-2 md:px-4 py-1.5 md:py-2 rounded transition cursor-pointer
                    ${
                      connected
                        ? "bg-green-700 hover:bg-green-800"
                        : "bg-gradient-to-br from-[#620909] to-red-600 hover:from-red-700 hover:to-red-800"
                    } text-white flex items-center gap-2`}
                >
                  {connected
                    ? `${account.displayName}${
                        account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""
                      }`
                    : "Connect Wallet"}
                </button>

                {connected && showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                    <button
                      onClick={() => {
                        window.location.href = "/dash";
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        openAccountModal(); // Opens RainbowKit disconnect modal
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </nav>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-[#121212] to-[#1a1c2c] h-[calc(100vh-8rem)] flex flex-col md:flex-row items-center justify-center px-6 ">
        {/* Text First */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:max-w-2xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-8xl font-bold leading-tight">
            Multiply Your Crypto Daily with{" "}
            <span className="text-red-600">Seiverse</span>
          </h1>
          <p className="mt-6 text-gray-300 text-xs md:text-lg p-3">
            Earn <strong className="text-red-600">3.5% daily ROI</strong> on
            your SEI investment. Quick deposits. Instant withdrawals. No delays.
          </p>
        </motion.div>

        {/* Image Second */}
        <motion.img
          src={heroImage}
          alt="Hero"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-md w-full md:w-auto rounded-xl shadow-lg p-3"
        />
      </section>
      {/* About Section */}
      <section
        className="relative py-20 mx-5 my-30 md:m-4 md:m-20 rounded-md bg-gradient-to-br from-black via-[#121212] to-[#1a1c2c] text-center space-y-6 overflow-hidden"
        ref={ref}
      >
        {/* Full-section image */}
        <img
          src={tree}
          alt="Decorative background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.8 }}
          className="relative z-10 my-20 text-4xl md:text-6xl font-semibold bg-gradient-to-r from-[red] to-gray-500 bg-clip-text text-transparent"
        >
          Welcome to
          <br /> Seiverse
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-[white] mb-10 md:text-2xl max-w-xl mx-auto p-3"
        >
          Seiverse is a next-gen crypto investment platform powered by SEI. With
          our fully automated system, your funds grow daily with transparency,
          security, and speed. Minimum deposit is just $30 and withdrawals are
          fast and automatic.
        </motion.p>
      </section>
      <section className="relative bg-[#0e0e0e] py-40 px-6 text-center overflow-hidden">
        {/* Background Image Overlay */}
        <img
          src={red}
          alt="background overlay"
          className="absolute inset-0 w-full h-full object-cover opacity-9 z-0"
        />

        {/* Main Content (placed above image) */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-3xl font-semibold mb-20"
        >
          Daily ROI Plans
        </motion.h2>

        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[30, 50, 100, 200, 500, 1000, 2000, 3000].map((amount, index) => {
            const roi = (amount * 3.5) / 100;
            const locked = amount > 1000;

            const bgColors = [
              "bg-gradient-to-br from-purple-700 to-indigo-800",
              "bg-gradient-to-br from-pink-600 to-red-500",
              "bg-gradient-to-br from-green-700 to-emerald-600",
              "bg-gradient-to-br from-blue-800 to-cyan-700",
              "bg-gradient-to-br from-yellow-600 to-orange-500",
              "bg-gradient-to-br from-sky-700 to-teal-600",
              "bg-gradient-to-br from-rose-600 to-pink-700",
              "bg-gradient-to-br from-slate-700 to-gray-800",
            ];

            return (
              <motion.div
                key={amount}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`relative p-6 rounded-xl m-4 shadow-lg text-white ${
                  bgColors[index % bgColors.length]
                } overflow-hidden`}
              >
                {/* Card Content */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2zM4 22v-2a4 4 0 014-4h8a4 4 0 014 4v2"
                      />
                    </svg>
                    <span className="font-semibold">Amount:</span> ${amount}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"
                      />
                    </svg>
                    <span className="font-semibold text-sm">Interest:</span> $
                    {roi.toFixed(2)} / day
                  </div>
                </div>

                {/* Transparent Overlay for Locked Plans */}
                {locked && (
                  <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center z-20">
                    <p className="text-yellow-300 font-semibold text-sm">
                      Coming Soon
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
      <section className="bg-gradient-to-br from-black via-[#121212] to-[#1a1c2c] py-24 px-6 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={investImage}
            alt="How it works"
            className="rounded-xl shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <h2 className="text-3xl font-bold">How It Works</h2>

            <div className="space-y-8">
              {[
                "Connect your SEI Wallet",
                "Deposit a minimum of $30",
                "Receive 3.5% ROI daily – no delay",
                "Minimum withdrawal is $10",
                "Withdrawal charge is 5%",
                "Withdrawals are automatic & instant",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-6 border-b border-white/10 pb-4"
                >
                  <div className="text-lg text-gray-300 leading-relaxed max-w-sm">
                    {text}
                  </div>
                  <div className="text-5xl md:text-6xl font-extrabold text-red-500">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* === New Features Section === */}
      <section className="bg-[none] py-20 px-6 text-white">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-bold">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gradient-to-br from-[#271b4f]  to-gray-800 rounded-xl shadow-lg content-center">
              <img
                className="mx-auto"
                width="100"
                height="100"
                src="https://img.icons8.com/color-glass/100/cyber-security.png"
                alt="cyber-security"
              />
              <h3 className="text-2xl font-semibold my-4 text-red-400 text-left">
                Security
              </h3>
              <p className="text-gray-300 text-left">
                Your funds are protected with state-of-the-art blockchain
                security protocols and smart contracts audited by experts.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#271b4f]  to-gray-800 rounded-xl shadow-lg content-center">
              <img
                className="mx-auto"
                width="100"
                height="100"
                src="https://img.icons8.com/arcade/100/speed.png"
                alt="speed"
              />

              <h3 className="text-2xl font-semibold my-4 text-red-400 text-left">
                Speed
              </h3>
              <p className="text-gray-300 text-left">
                Instant deposits and withdrawals mean you have complete control
                and access to your crypto earnings anytime, anywhere.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#271b4f]  to-gray-800 rounded-xl shadow-lg content-center">
              <img
                className="mx-auto"
                width="100"
                height="100"
                src="https://img.icons8.com/color-glass/100/last-24-hours.png"
                alt="last-24-hours"
              />
              <h3 className="text-2xl font-semibold my-4 text-red-400 text-left">
                Daily ROI
              </h3>
              <p className="text-gray-300 text-left">
                Earn a guaranteed 3.5% daily return on your investment with
                transparent and automated payout systems.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* === New Referral & Subscription Section === */}
      <section className="bg-[#0e0e0e] py-40 px-6 text-white content-center">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-bold">Referral Package</h2>
          <p className="max-w-xl mx-auto text-gray-400 mb-10">
            Boost your earnings with our referral program designed to reward
            your network growth.
          </p>

          <div className="max-w-2xl text-center mx-auto gap-16 ">
            {/* Referral Package */}
            <div className="bg-[#121212] bg-gradient-to-br from-[#620909] to-[red] rounded-xl p-8 shadow-lg">
              <ul className="list-disc list-inside text-gray-300 space-y-3 text-left">
                <li>Earn 5% commission from direct referrals’ deposits.</li>
                <li>Receive 3% from your referral’s downline level 2.</li>
                <li>
                  Get 2% on level 3 downlines, building passive income streams.
                </li>
                <li>Referral bonuses credited instantly upon deposits.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-black via-[#121212] to-[#1a1c2c] py-40 px-6 text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#271b4f] to-[#1a1c2c] rounded-xl p-6 shadow-lg border border-white/10"
              >
                <button
                  onClick={() =>
                    setActiveIndex(index === activeIndex ? null : index)
                  }
                  className="w-full flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="w-5 h-5 text-red-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 text-gray-300"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black text-gray-400 py-10 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <img src={logo} alt="Seiverse Logo" className="mx-auto h-16" />
          <p>
            Seiverse.io — Invest smarter with SEI. <br />©{" "}
            {new Date().getFullYear()} Seiverse. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
