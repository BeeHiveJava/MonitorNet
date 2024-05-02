namespace MonitorNet.Functions.Api.Monitors.Models;

public record DeviceMonitorSettings
{
   public Uri StorageUri { get; init; } = default!;

   public string StorageTableName { get; init; } = "monitors";
}
