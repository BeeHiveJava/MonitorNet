using Microsoft.Extensions.Caching.Memory;
using MonitorNet.Functions.Api.Monitors.Interfaces;
using MonitorNet.Functions.Api.Monitors.Models;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Monitors.Implementations;

internal class MonitorService(IMemoryCache cache) : IMonitorService
{
    public async Task<IEnumerable<DeviceMonitor>> GetAllAsync(CancellationToken ct = default)
    {
        return await GetMonitorsAsync(ct);
    }

    public async Task<IEnumerable<DeviceMonitor>> GetAllAsync(string device, CancellationToken ct = default)
    {
        var monitors = await GetAllAsync(ct);
        return monitors.Where(monitor => monitor.DeviceId == device);
    }

    public async Task<DeviceMonitor?> GetOneAsync(string device, int index, CancellationToken ct = default)
    {
        var monitors = await GetAllAsync(device, ct);
        return monitors.SingleOrDefault(monitor => monitor.Index == index);
    }

    public async Task SaveAsync(string device, int index, Symbol symbol, CancellationToken ct = default)
    {
        var monitor = await GetOrCreateMonitorAsync(device, index, ct);
        monitor.Symbol = symbol;
    }

    private async Task<DeviceMonitor> GetOrCreateMonitorAsync(string device, int index, CancellationToken ct)
    {
        var monitor = await GetOneAsync(device, index, ct);

        if (monitor is null)
        {
            monitor = new DeviceMonitor { DeviceId = device, Index = index };
            (await GetMonitorsAsync(ct)).Add(monitor);
        }

        return monitor;
    }

    private async Task<ICollection<DeviceMonitor>> GetMonitorsAsync(CancellationToken ct)
    {
        var monitors = await cache.GetOrCreateAsync(
            "monitors",
            _ => Task.FromResult<ICollection<DeviceMonitor>>([])
        );

        return monitors!;
    }
}
