using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Symbols.Interfaces;

public interface ISymbolService
{
    Task<IEnumerable<Symbol>> SearchAsync(string symbol, string exchange, CancellationToken ct = default);
}
