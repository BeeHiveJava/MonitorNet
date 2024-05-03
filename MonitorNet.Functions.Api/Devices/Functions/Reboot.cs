using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.OpenApi.Models;
using MonitorNet.Functions.Api.Devices.Interfaces;

namespace MonitorNet.Functions.Api.Devices.Functions;

internal class Reboot(IDeviceService service)
{
    [Function("DevicesReboot")]
    [OpenApiOperation(operationId: "DevicesReboot", tags: ["Devices"])]
    [OpenApiParameter(name: "id", Type = typeof(string), Required = true)]
    [OpenApiResponseWithoutBody(HttpStatusCode.OK)]
    [OpenApiResponseWithoutBody(HttpStatusCode.NotFound)]
    public async Task<IActionResult> RebootAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Post), Route = "devices/{id}/reboot")]
        HttpRequest request,
        string id)
    {
        var device = await service.GetOneAsync(id, request.HttpContext.RequestAborted);
        if (device is null)
        {
            return new NotFoundResult();
        }

        await service.RebootAsync(device, request.HttpContext.RequestAborted);
        return new OkResult();
    }
}
