using System.Text.Json.Serialization;

namespace MonitorNet.Functions.Api.Devices.Models;

[Serializable]
public record Device
{
    public string Id { get; init; } = default!;

    public string Name { get; init; } = default!;

    public string Status { get; init; } = default!;

    public string Type { get; init; } = default!;

    [JsonPropertyName("undervolted")]
    public bool IsUndervolted { get; init; }

    public DeviceVersions Versions { get; init; } = new();

    public DeviceReleases Releases { get; init; } = new();

    public DeviceNetworkAddresses Network { get; init; } = new();

    public DeviceUsage Usage { get; init; } = new();
}

[Serializable]
public record DeviceVersions
{
    public string Host { get; init; } = default!;

    public string Supervisor { get; init; } = default!;
}

[Serializable]
public record DeviceReleases
{
    public string Current { get; init; } = default!;

    public string Target { get; init; } = default!;
}

[Serializable]
public record DeviceNetworkAddresses
{
    public string Local { get; init; } = default!;

    public string Public { get; init; } = default!;
}

[Serializable]
public record DeviceUsage
{
    public long MemoryUsageMb { get; init; }

    public long MemoryTotalMb { get; init; }

    public long StorageUsageMb { get; init; }

    public long StorageTotalMb { get; init; }

    public long CpuUsage { get; init; }

    public long CpuTemperature { get; init; }
}
