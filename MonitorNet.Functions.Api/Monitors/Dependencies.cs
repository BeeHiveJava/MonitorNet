using Azure.Core;
using Azure.Data.Tables;
using Azure.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using MonitorNet.Functions.Api.Monitors.Implementations;
using MonitorNet.Functions.Api.Monitors.Interfaces;
using MonitorNet.Functions.Api.Monitors.Models;

namespace MonitorNet.Functions.Api.Monitors;

internal static class Dependencies
{
    public static IServiceCollection AddMonitorNetMonitors(this IServiceCollection services)
    {
        services.AddOptions<DeviceMonitorSettings>().BindConfiguration("Monitors");

        services.TryAddSingleton<TokenCredential>(_ => new DefaultAzureCredential());
        services.TryAddSingleton(CreateTableClient);

        services.TryAddTransient<IMonitorStore, MonitorStore>();
        services.TryAddTransient<IMonitorService, MonitorService>();

        return services;
    }

    private static TableClient CreateTableClient(IServiceProvider provider)
    {
        var credential = provider.GetRequiredService<TokenCredential>();
        var settings = provider.GetRequiredService<IOptions<DeviceMonitorSettings>>();
        return new TableClient(settings.Value.StorageUri, settings.Value.StorageTableName, credential);
    }
}
