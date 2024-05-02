import type { CryptoSymbol } from "@/symbols"

export interface Monitor {
  device: string
  index: number
  symbol: CryptoSymbol
  rotation: MonitorRotation
}

export const MonitorRotations = ["normal", "flipped"]
export type MonitorRotation = typeof MonitorRotations[number]
