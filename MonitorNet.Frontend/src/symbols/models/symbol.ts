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
