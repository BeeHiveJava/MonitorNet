export interface CryptoSymbol {
  id: string
  provider?: CryptoSymbolProvider
  logo?: string
  description?: string
}

export interface CryptoSymbolProvider {
  id: string
  name?: string
  logo?: string
}

export const DefaultCryptoSymbolProvider: CryptoSymbolProvider = {
  id: "COINBASE",
  name: "Coinbase",
  logo: "provider/coinbase"
}

export const DefaultCryptoSymbol: CryptoSymbol = {
  id: "BTCUSDT",
  logo: "crypto/XTVCBTC",
  description: "Bitcoin / Tether",
  provider: DefaultCryptoSymbolProvider
}
