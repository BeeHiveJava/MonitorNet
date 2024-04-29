import type { CryptoSymbol } from "@/symbols"

export interface Monitor {
  device: string
  index: number
  symbol: CryptoSymbol
  rotation: MonitorRotation
}

export type MonitorRotation = "normal" | "flipped"
