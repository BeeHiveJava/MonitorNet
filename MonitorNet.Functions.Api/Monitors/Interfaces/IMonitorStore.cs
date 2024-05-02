using MonitorNet.Functions.Api.Monitors.Models;

namespace MonitorNet.Functions.Api.Monitors.Interfaces;

public interface IMonitorStore
{
    Task<IEnumerable<DeviceMonitor>> GetAllAsync(CancellationToken ct = default);

    Task<IEnumerable<DeviceMonitor>> GetAllAsync(string device, CancellationToken ct = default);

    Task<DeviceMonitor?> GetOneAsync(string device, int index, CancellationToken ct = default);

    Task SaveAsync(DeviceMonitor monitor, CancellationToken ct = default);
}
