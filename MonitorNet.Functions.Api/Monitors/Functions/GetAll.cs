using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.OpenApi.Models;
using MonitorNet.Functions.Api.Monitors.Interfaces;
using MonitorNet.Functions.Api.Monitors.Models;

namespace MonitorNet.Functions.Api.Monitors.Functions;

internal class GetAll(IMonitorService service)
{
    [Function("MonitorsGetAll")]
    [OpenApiOperation(operationId: "GetAll", tags: ["Monitors"])]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(IEnumerable<DeviceMonitor>))]
    public async Task<IActionResult> GetAllAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Get), Route = "monitors")]
        HttpRequest request)
    {
        var results = await service.GetAllAsync(request.HttpContext.RequestAborted);
        return new OkObjectResult(results);
    }

    [Function("MonitorsGetAllByDevice")]
    [OpenApiOperation(operationId: "GetAllByDevice", tags: ["Monitors"])]
    [OpenApiParameter(name: "device", Type = typeof(string), Required = true)]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(IEnumerable<DeviceMonitor>))]
    [OpenApiResponseWithoutBody(HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetAllByDeviceAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Get), Route = "monitors/{device}")]
        HttpRequest request,
        string device)
    {
        var result = await service.GetAllAsync(device, request.HttpContext.RequestAborted);
        return result is not null ? new OkObjectResult(result) : new NotFoundResult();
    }
}
