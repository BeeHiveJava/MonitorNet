using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices.Helpers;

internal static class DeviceExtensions
{
    public static Device ToDevice(this DeviceResultEntry entry) => new()
    {
        Id = Convert.ToString(entry.Id)!,
        UniqueId = entry.UniqueId!,
        Name = entry.Name!,
        Status = entry.IsOnline == true ? "Online" : "Offline",
        Type = entry.Type.FirstOrDefault()?.Name ?? "Unknown",
        IsUndervolted = entry.IsUndervolted ?? false,
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
        },
        Usage = new()
        {
            MemoryUsageGb = (entry.MemoryUsageMb ?? 0) / 1000d,
            MemoryTotalGb = (entry.MemoryTotalMb ?? 0) / 1000d,
            StorageUsageGb = (entry.StorageUsageMb ?? 0) / 1000d,
            StorageTotalGb = (entry.StorageTotalMb ?? 0) / 1000d,
            CpuUsage = entry.CpuUsage ?? 0,
            CpuTemperature = entry.CpuTemperature ?? 0
        }
    };
}
