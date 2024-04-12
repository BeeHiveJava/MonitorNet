namespace MonitorNet.Functions.Api.Devices.Models;

[Serializable]
public record Device
{
    public string Id { get; init; } = default!;

    public string Name { get; init; } = default!;
}
