using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices.Interfaces;

public interface IDeviceService
{
    Task<IEnumerable<Device>> GetAllAsync(CancellationToken ct = default);

    Task<Device?> GetOneAsync(string id, CancellationToken ct = default);
}
