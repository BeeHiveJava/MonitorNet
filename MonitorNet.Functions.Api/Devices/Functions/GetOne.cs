using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using MonitorNet.Functions.Api.Devices.Interfaces;
using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api;

internal class GetOne(IDeviceService service)
{
    [Function("DevicesGetOne")]
    [OpenApiOperation(operationId: "DevicesGetOne", tags: ["Devices"])]
    [OpenApiParameter(name: "id", Type = typeof(string), Required = true)]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(Device))]
    [OpenApiResponseWithoutBody(HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetOneAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Get), Route = "devices/{id}")]
        HttpRequest request,
        string id)
    {
        var result = await service.GetOneAsync(id, request.HttpContext.RequestAborted);
        return result is not null ? new OkObjectResult(result) : new NotFoundResult();
    }
}

