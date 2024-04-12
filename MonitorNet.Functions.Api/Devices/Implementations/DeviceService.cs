using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.Options;
using MonitorNet.Functions.Api.Devices.Functions;
using MonitorNet.Functions.Api.Devices.Helpers;
using MonitorNet.Functions.Api.Devices.Interfaces;
using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices.Implementations;

internal class DeviceService(IOptions<DeviceSettings> options, HttpClient client) : IDeviceService
{
    public async Task<IEnumerable<Device>> GetAllAsync(CancellationToken ct = default)
    {
        var message = new HttpRequestMessage { RequestUri = options.Value.DeviceUri, Method = HttpMethod.Get };
        message.Headers.Authorization = new AuthenticationHeaderValue("Bearer", options.Value.Token);

        var response = await client.SendAsync(message, ct);
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<DeviceResult>(ct);
        return result!.Devices.Select(entry => entry.ToDevice());
    }

    public async Task<Device?> GetOneAsync(string id, CancellationToken ct = default)
    {
        var devices = await GetAllAsync(ct);
        return devices.FirstOrDefault(device => device.Id == id);
    }
}
