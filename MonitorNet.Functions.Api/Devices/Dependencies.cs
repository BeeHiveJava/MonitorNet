using Microsoft.Extensions.DependencyInjection;
using MonitorNet.Functions.Api.Devices.Implementations;
using MonitorNet.Functions.Api.Devices.Interfaces;
using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices;

internal static class Dependencies
{
    public static IServiceCollection AddMonitorNetDevices(this IServiceCollection services)
    {
        services.AddOptions<DeviceSettings>().BindConfiguration("Devices");
        services.AddHttpClient<IDeviceService, DeviceService>();

        return services;
    }
}
