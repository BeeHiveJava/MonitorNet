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

    [JsonPropertyName("uuid")]
    public string? UniqueId { get; init; }

    [JsonPropertyName("device_name")]
    public string? Name { get; init; }

    [JsonPropertyName("is_of__device_type")]
    public IReadOnlyCollection<DeviceResultEntryType> Type { get; init; } = [];

    [JsonPropertyName("is_running__release")]
    public IReadOnlyCollection<DeviceResultEntryCurrentRelease> CurrentRelease { get; init; } = [];

    [JsonPropertyName("should_be_managed_by__supervisor_release")]
    public IReadOnlyCollection<DeviceResultEntryTargetRelease> TargetRelease { get; init; } = [];

    [JsonPropertyName("is_online")]
    public bool? IsOnline { get; init; }

    [JsonPropertyName("os_version")]
    public string? HostOsVersion { get; init; }

    [JsonPropertyName("supervisor_version")]
    public string? SupervisorVersion { get; init; }

    [JsonPropertyName("ip_address")]
    public string? LocalAddress { get; init; }

    [JsonPropertyName("public_address")]
    public string? PublicAddress { get; init; }

    [JsonPropertyName("memory_usage")]
    public long? MemoryUsageMb { get; init; }

    [JsonPropertyName("memory_total")]
    public long? MemoryTotalMb { get; init; }

    [JsonPropertyName("storage_usage")]
    public long? StorageUsageMb { get; init; }

    [JsonPropertyName("storage_total")]
    public long? StorageTotalMb { get; init; }

    [JsonPropertyName("cpu_usage")]
    public long? CpuUsage { get; init; }

    [JsonPropertyName("cpu_temp")]
    public long? CpuTemperature { get; init; }

    [JsonPropertyName("is_undervolted")]
    public bool? IsUndervolted { get; init; }
}

[Serializable]
internal record DeviceResultEntryType
{
    [JsonPropertyName("slug")]
    public string? Slug { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }
}

[Serializable]
internal record DeviceResultEntryCurrentRelease
{
    [JsonPropertyName("id")]
    public long? Id { get; init; }

    [JsonPropertyName("raw_version")]
    public string? Version { get; init; }

    [JsonPropertyName("commit")]
    public string? Commit { get; init; }
}

[Serializable]
internal record DeviceResultEntryTargetRelease
{
    [JsonPropertyName("supervisor_version")]
    public string? Version { get; init; }
}
