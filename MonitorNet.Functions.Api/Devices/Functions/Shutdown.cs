using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.OpenApi.Models;
using MonitorNet.Functions.Api.Devices.Interfaces;

namespace MonitorNet.Functions.Api.Devices.Functions;

internal class Shutdown(IDeviceService service)
{
    [Function("DevicesShutdown")]
    [OpenApiOperation(operationId: "DevicesShutdown", tags: ["Devices"])]
    [OpenApiParameter(name: "id", Type = typeof(string), Required = true)]
    [OpenApiResponseWithoutBody(HttpStatusCode.OK)]
    [OpenApiResponseWithoutBody(HttpStatusCode.NotFound)]
    public async Task<IActionResult> ShutdownAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Post), Route = "devices/{id}/shutdown")]
        HttpRequest request,
        string id)
    {
        var device = await service.GetOneAsync(id, request.HttpContext.RequestAborted);
        if (device is null)
        {
            return new NotFoundResult();
        }

        await service.ShutdownAsync(device, request.HttpContext.RequestAborted);
        return new OkResult();
    }
}
