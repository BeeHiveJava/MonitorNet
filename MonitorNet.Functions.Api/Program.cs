using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MonitorNet.Functions.Api.Symbols;
using MonitorNet.Functions.Api.Devices;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddMonitorNetSymbols();
        services.AddMonitorNetDevices();
    })
    .Build();

host.Run();
