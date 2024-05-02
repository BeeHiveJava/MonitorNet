using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Monitors.Models;

[Serializable]
public record DeviceMonitorSaveDto
{
    public Symbol? Symbol { get; init; }

    public string? Rotation { get; init; }
}
