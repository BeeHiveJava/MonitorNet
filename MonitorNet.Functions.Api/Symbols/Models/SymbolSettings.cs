namespace MonitorNet.Functions.Api.Symbols.Models;

public record SymbolSettings
{
    public Uri BaseUri { get; init; } = new Uri("https://symbol-search.tradingview.com");

    public Uri SearchUri => new(BaseUri, "/local_search/v3");
}
