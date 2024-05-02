import type { CryptoSymbol } from "@/symbols"

export class WidgetUtils {
  private widget: any | undefined
  private element: HTMLIFrameElement | undefined

  public load(configuration: WidgetConfiguration): void {
    const options = this.options(configuration)
    if (this.widget?.options?.container !== configuration.id || this.element === undefined) {
      this.create(options)
    } else {
      this.update(options)
    }
  }

  public isReady(): boolean {
    return typeof TradingView !== "undefined"
  }

  private create(options: any): void {
    this.widget = new TradingView.widget(options)
    this.element = [...document.getElementsByTagName("iframe")].find((e) => e.id.startsWith("tradingview"))
  }

  private update(options: any): void {
    this.element!.contentWindow!.postMessage(
      {
        name: "set-symbol",
        data: {
          symbol: options.symbol
        }
      },
      "*"
    )
  }

  private options(configuration: WidgetConfiguration): any {
    const provider = configuration.symbol!.provider?.id ? `${configuration.symbol!.provider.id}:` : ""
    const symbol = configuration.symbol!.id

    return {
      container_id: configuration.id,
      symbol: `${provider}${symbol}`,
      interval: "15",
      theme: "dark",
      style: "1",
      timezone: "Europe/Amsterdam",
      locale: "en",
      autosize: true,
      fullscreen: true,
      hide_top_toolbar: true,
      hide_volume: true,
      enable_publishing: false,
      save_image: false,
      calendar: false,
      allow_symbol_change: false,
      support_host: "https://www.tradingview.com"
    }
  }
}

export interface WidgetConfiguration {
  id: string
  symbol: CryptoSymbol
}
