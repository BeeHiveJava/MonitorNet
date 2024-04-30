using System.Text.Json.Serialization;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Monitors.Models;

[Serializable]
public record DeviceMonitor
{
    [JsonPropertyName("device")]
    public string DeviceId { get; init; } = default!;

    public int Index { get; init; }

    public Symbol? Symbol { get; set; }
}
