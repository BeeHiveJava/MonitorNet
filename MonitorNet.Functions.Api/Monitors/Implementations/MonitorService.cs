using MonitorNet.Functions.Api.Monitors.Interfaces;
using MonitorNet.Functions.Api.Monitors.Models;

namespace MonitorNet.Functions.Api.Monitors.Implementations;

internal class MonitorService(IMonitorStore store) : IMonitorService
{
    public Task<IEnumerable<DeviceMonitor>> GetAllAsync(CancellationToken ct = default)
    {
        return store.GetAllAsync(ct);
    }

    public Task<IEnumerable<DeviceMonitor>> GetAllAsync(string device, CancellationToken ct = default)
    {
        return store.GetAllAsync(device, ct);
    }

    public Task<DeviceMonitor?> GetOneAsync(string device, int index, CancellationToken ct = default)
    {
        return store.GetOneAsync(device, index, ct);
    }

    public Task SaveAsync(string device, int index, DeviceMonitorSaveDto data, CancellationToken ct = default)
    {
        var monitor = new DeviceMonitor
        {
            DeviceId = device,
            Index = index,
            Symbol = data.Symbol,
            Rotation = data.Rotation
        };

        return store.SaveAsync(monitor, ct);
    }
}
