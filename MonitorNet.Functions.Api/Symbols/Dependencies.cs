using Microsoft.Extensions.DependencyInjection;
using MonitorNet.Functions.Api.Symbols.Implementations;
using MonitorNet.Functions.Api.Symbols.Interfaces;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Symbols;

internal static class Dependencies
{
    public static IServiceCollection AddMonitorNetSymbols(this IServiceCollection services)
    {
        services.AddHttpClient<ISymbolService, SymbolService>();
        services.AddOptions<SymbolSettings>().BindConfiguration("Symbols");

        return services;
    }
}
