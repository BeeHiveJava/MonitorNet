using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices.Helpers;

internal static class DeviceExtensions
{
    public static Device ToDevice(this DeviceResultEntry entry) => new()
    {
        Id = Convert.ToString(entry.Id)!,
        Name = entry.Name!
    };
}
