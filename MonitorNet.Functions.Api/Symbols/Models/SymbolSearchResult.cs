using System.Text.Json.Serialization;

namespace MonitorNet.Functions.Api.Symbols.Models;

[Serializable]
internal record SymbolSearchResult
{
    public IReadOnlyCollection<SymbolSearchResultEntry> Symbols { get; init; } = [];
}

[Serializable]
internal record SymbolSearchResultEntry
{
    [JsonPropertyName("symbol")]
    public string? Symbol { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }

    [JsonPropertyName("type")]
    public string? Type { get; init; }

    [JsonPropertyName("exchange")]
    public string? Exchange { get; init; }

    [JsonPropertyName("currency_code")]
    public string? CurrencyCode { get; init; }

    [JsonPropertyName("currency-logoid")]
    public string? CurrencyLogoId { get; init; }

    [JsonPropertyName("base-currency-logoid")]
    public string? BaseCurrencyLogoId { get; init; }

    [JsonPropertyName("provider_id")]
    public string? ProviderId { get; init; }

    [JsonPropertyName("source2")]
    public SymbolSearchResultEntrySource? Source { get; init; }

    [JsonPropertyName("source_id")]
    public string? SourceId { get; init; }

    [JsonPropertyName("typespecs")]
    public IReadOnlyCollection<string> TypeSpecs { get; } = [];
}

[Serializable]
internal record SymbolSearchResultEntrySource
{
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}
