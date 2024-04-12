using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Symbols.Helpers;

internal static class SymbolExtensions
{
    public static Symbol ToSymbol(this SymbolSearchResultEntry entry) => new()
    {
        Id = entry.Symbol!,
        Logo = entry.BaseCurrencyLogoId,
        Description = entry.Description,
        Provider = new SymbolProvider
        {
            Id = entry.Source!.Id!,
            Name = entry.Source!.Name!,
            Logo = $"provider/{entry.ProviderId}"
        }
    };
}
