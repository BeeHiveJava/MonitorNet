using System.Text.Json.Serialization;

namespace MonitorNet.Functions.Api.Devices.Models;

[Serializable]
internal record DeviceResult
{
    [JsonPropertyName("d")]
    public IReadOnlyCollection<DeviceResultEntry> Devices { get; init; } = [];
}

[Serializable]
internal record DeviceResultEntry
{
    [JsonPropertyName("id")]
    public long? Id { get; init; }

    [JsonPropertyName("device_name")]
    public string? Name { get; init; }
}
