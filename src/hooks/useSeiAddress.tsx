import { useAccount } from "wagmi";
import { evmToSeiAddress } from "../utils/evmToSei";
import { useMemo } from "react";

export const useSeiAddress = () => {
  const { address: evmAddress } = useAccount();

  const seiAddress = useMemo(() => {
    if (!evmAddress) return null;
    try {
      return evmToSeiAddress(evmAddress);
    } catch (err) {
      console.error("Failed to derive SEI address:", err);
      return null;
    }
  }, [evmAddress]);

  return { evmAddress, seiAddress };
};
