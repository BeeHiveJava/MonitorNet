using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.OpenApi.Models;
using MonitorNet.Functions.Api.Devices.Interfaces;
using MonitorNet.Functions.Api.Devices.Models;

namespace MonitorNet.Functions.Api.Devices.Functions;

internal class GetAll(IDeviceService service)
{
    [Function("DevicesGetAll")]
    [OpenApiOperation(operationId: "GetAll", tags: ["Devices"])]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(IEnumerable<Device>))]
    public async Task<IActionResult> GetAllAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Get), Route = "devices")]
        HttpRequest request)
    {
        var results = await service.GetAllAsync(request.HttpContext.RequestAborted);
        return new OkObjectResult(results);
    }
}
