import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalance, useAccount } from "wagmi";
import { formatEther } from "viem";
import { useSeiAddress } from "./hooks/useSeiAddress";
import { DisconnectButton } from "./components/DisconnectButton";
import { useMemo } from "react";

export default function App() {
  const { isConnected } = useAccount();
  const { evmAddress, seiAddress } = useSeiAddress();
  const { data: balanceData } = useBalance({ address: evmAddress });

  const formattedBalance = useMemo(() => {
    if (!balanceData?.value) return null;
    return parseFloat(formatEther(balanceData.value)).toFixed(4);
  }, [balanceData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {!isConnected && <ConnectButton />}
      
      {isConnected && (
        <>
          <ConnectButton /> {/* optional: shows account info */}
          <div className="mt-8 bg-white shadow-md rounded p-6 w-full max-w-md">
            <p className="text-gray-800 font-semibold">EVM Address:</p>
            <p className="text-sm text-blue-600 break-all">{evmAddress}</p>

            {seiAddress && (
              <>
                <p className="mt-4 text-gray-800 font-semibold">SEI Address:</p>
                <p className="text-sm text-purple-600 break-all">
                  {seiAddress}
                </p>
              </>
            )}

            {formattedBalance && (
              <>
                <p className="mt-4 text-gray-800 font-semibold">Balance:</p>
                <p className="text-green-600 text-lg">
                  {formattedBalance} SEI
                </p>
              </>
            )}

            <DisconnectButton />
          </div>
        </>
      )}
    </div>
  );
}
