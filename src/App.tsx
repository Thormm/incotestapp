import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

export default function App() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
      <ConnectButton />

      {isConnected && (
        <div className="mt-8 bg-white shadow-md rounded p-6">
          <p className="text-gray-800 font-semibold">Wallet Address:</p>
          <p className="text-sm text-blue-600 break-words">{address}</p>

          {balanceData && (
            <>
              <p className="mt-4 text-gray-800 font-semibold">Balance:</p>
              <p className="text-green-600 text-lg">
                {parseFloat(formatEther(balanceData.value)).toFixed(4)} ETH
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
