using Microsoft.Extensions.DependencyInjection;
using MonitorNet.Functions.Api.Monitors.Implementations;
using MonitorNet.Functions.Api.Monitors.Interfaces;

namespace MonitorNet.Functions.Api.Monitors;

internal static class Dependencies
{
    public static IServiceCollection AddMonitorNetMonitors(this IServiceCollection services)
    {
        services.AddTransient<IMonitorService, MonitorService>();
        services.AddMemoryCache();

        return services;
    }
}
