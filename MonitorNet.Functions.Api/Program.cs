using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MonitorNet.Functions.Api.Symbols;
using MonitorNet.Functions.Api.Devices;
using Microsoft.Azure.Functions.Worker.Extensions.OpenApi.Extensions;
using MonitorNet.Functions.Api.Monitors;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureOpenApi()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();

        services.AddMonitorNetSymbols();
        services.AddMonitorNetDevices();
        services.AddMonitorNetMonitors();
    })
    .Build();

host.Run();
