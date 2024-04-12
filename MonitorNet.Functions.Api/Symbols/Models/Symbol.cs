namespace MonitorNet.Functions.Api.Symbols.Models;

public record Symbol
{
    public string Id { get; init; } = default!;

    public string? Logo { get; init; }

    public string? Description { get; init; }

    public SymbolProvider Provider { get; init; } = default!;
}
