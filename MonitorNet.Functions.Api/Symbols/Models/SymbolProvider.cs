namespace MonitorNet.Functions.Api.Symbols.Models;

[Serializable]
public record SymbolProvider
{
    public string Id { get; init; } = default!;

    public string Name { get; init; } = default!;

    public string? Logo { get; init; }
}
