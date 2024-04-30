using MonitorNet.Functions.Api.Monitors.Models;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Monitors.Interfaces;

public interface IMonitorService
{
    Task<IEnumerable<DeviceMonitor>> GetAllAsync(CancellationToken ct = default);

    Task<IEnumerable<DeviceMonitor>> GetAllAsync(string device, CancellationToken ct = default);

    Task<DeviceMonitor?> GetOneAsync(string device, int index, CancellationToken ct = default);

    Task SaveAsync(string device, int index, Symbol symbol, CancellationToken ct = default);
}
