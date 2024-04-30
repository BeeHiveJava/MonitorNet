using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using MonitorNet.Functions.Api.Devices.Models;
using MonitorNet.Functions.Api.Monitors.Interfaces;

namespace MonitorNet.Functions.Api.Monitors.Functions;

internal class GetOne(IMonitorService service)
{
    [Function("MonitorsGetOne")]
    [OpenApiOperation(operationId: "GetOne", tags: ["Monitors"])]
    [OpenApiParameter(name: "device", Type = typeof(string), Required = true)]
    [OpenApiParameter(name: "index", Type = typeof(int), Required = true)]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(Device))]
    [OpenApiResponseWithoutBody(HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetOneAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Get), Route = "monitors/{device}/{index:int}")]
        HttpRequest request,
        string device,
        int index)
    {
        var result = await service.GetOneAsync(device, index, request.HttpContext.RequestAborted);
        return result is not null ? new OkObjectResult(result) : new NotFoundResult();
    }
}

