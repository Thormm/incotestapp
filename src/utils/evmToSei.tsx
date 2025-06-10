import { fromHex, toBech32 } from "@cosmjs/encoding";

export function evmToSeiAddress(evmAddress: string): string {
  const hex = evmAddress.toLowerCase().replace(/^0x/, "");
  const addressBytes = fromHex(hex); // Browser-safe Uint8Array
  return toBech32("sei", addressBytes);
}
