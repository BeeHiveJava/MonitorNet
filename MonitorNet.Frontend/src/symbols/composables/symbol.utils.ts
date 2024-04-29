import type { CryptoSymbol } from "@/symbols"
import { useMonitorNetApi } from "@/utils"

export const useSymbolSearch = (symbol: Ref<string>) => {
  const url_symbol = ref("")
  const url_exchange = ref("")
  const url = computed(() => `api/symbols/search?symbol=${url_symbol.value}&exchange=${url_exchange.value}`)
  const { data } = useMonitorNetApi(url, { refetch: true }).get().json<CryptoSymbol[]>()

  const search = (symbol: string, exchange: string = "") => {
    url_symbol.value = symbol
    url_exchange.value = exchange
  }

  watchEffect(() => search(symbol.value))
  return computed(() => data.value ?? [])
}
