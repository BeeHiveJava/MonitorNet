namespace MonitorNet.Functions.Api.Devices.Models;

public record DeviceSettings
{
    public Uri BaseUri { get; init; } = new Uri("https://api.balena-cloud.com");

    public Uri DeviceUri => new(BaseUri, $"/v6/device?$expand={Expands}");

    public Uri SupervisorUri { get; init; } = new Uri("https://api.balena-cloud.com/supervisor/");

    public Uri RestartUri => new(SupervisorUri, "v1/restart");

    public Uri RebootUri => new(SupervisorUri, "v1/reboot");

    public Uri ShutdownUri => new(SupervisorUri, "v1/shutdown");

    public long AppId { get; set; } = 2107072;

    public string Token { get; init; } = default!;

    private const string Expands = $"{DeviceTypeExpand},{DeviceCurrentReleaseExpand},{DeviceTargetReleaseExpand}";
    private const string DeviceTypeExpand = "is_of__device_type($select=slug,name;$top=1)";
    private const string DeviceCurrentReleaseExpand = "is_running__release($select=id,raw_version,commit;$top=1)";
    private const string DeviceTargetReleaseExpand = "should_be_managed_by__supervisor_release($select=supervisor_version;$top=1)";
}
