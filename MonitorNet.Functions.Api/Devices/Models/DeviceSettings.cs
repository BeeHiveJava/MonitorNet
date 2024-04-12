namespace MonitorNet.Functions.Api.Devices.Models;

public record DeviceSettings
{
    public Uri BaseUri { get; init; } = new Uri("https://api.balena-cloud.com");

    public Uri DeviceUri => new(BaseUri, "/v6/device");

    public string Token { get; init; } = default!;
}
