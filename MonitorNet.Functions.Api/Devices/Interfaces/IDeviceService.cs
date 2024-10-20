using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices.Interfaces;

public interface IDeviceService
{
    Task<IEnumerable<Device>> GetAllAsync(CancellationToken ct = default);

    Task<Device?> GetOneAsync(string id, CancellationToken ct = default);

    Task RestartAsync(Device device, CancellationToken ct = default);

    Task RebootAsync(Device device, CancellationToken ct = default);

    Task ShutdownAsync(Device device, CancellationToken ct = default);
}
