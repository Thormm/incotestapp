import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalance, useDisconnect, useAccount } from "wagmi";
import { formatEther } from "viem";
import { useSeiAddress } from "./hooks/useSeiAddress";

export default function App() {
  const { evmAddress, seiAddress } = useSeiAddress();
  const { data: balanceData } = useBalance({ address: evmAddress });
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {!isConnected ? (
        <ConnectButton />
      ) : (
        <button
          onClick={() => disconnect()}
          className="mb-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Disconnect
        </button>
      )}

      {evmAddress && (
        <div className="mt-4 bg-white shadow-md rounded p-6 w-full max-w-md">
          <p className="text-gray-800 font-semibold">EVM Address:</p>
          <p className="text-sm text-blue-600 break-all">{evmAddress}</p>

          {seiAddress && (
            <>
              <p className="mt-4 text-gray-800 font-semibold">SEI Address:</p>
              <p className="text-sm text-purple-600 break-all">{seiAddress}</p>
            </>
          )}

          {balanceData && (
            <>
              <p className="mt-4 text-gray-800 font-semibold">Balance:</p>
              <p className="text-green-600 text-lg">
                {parseFloat(formatEther(balanceData.value)).toFixed(4)} SEI
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
