using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices.Helpers;

internal static class DeviceExtensions
{
    public static Device ToDevice(this DeviceResultEntry entry) => new()
    {
        Id = Convert.ToString(entry.Id)!,
        Name = entry.Name!,
        Status = entry.IsOnline == true ? "Online" : "Offline",
        Type = entry.Type.FirstOrDefault()?.Name ?? "Unknown",
        Versions = new()
        {
            Host = entry.HostOsVersion ?? "Unknown",
            Supervisor = entry.SupervisorVersion ?? "Unknown"
        },
        Releases = new()
        {
            Current = entry.CurrentRelease.FirstOrDefault()?.Version ?? "Unknown",
            Target = entry.CurrentRelease.FirstOrDefault()?.Version ?? "Unknown",
        },
        Network = new()
        {
            Local = entry.LocalAddress ?? "0.0.0.0",
            Public = entry.PublicAddress ?? "0.0.0.0"
        }
    };
}
