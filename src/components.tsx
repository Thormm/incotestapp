import { useDisconnect, useAccount } from "wagmi";

export const DisconnectButton = () => {
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  if (!isConnected) return null;

  return (
    <button
      onClick={() => disconnect()}
      className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
    >
      Disconnect
    </button>
  );
};
