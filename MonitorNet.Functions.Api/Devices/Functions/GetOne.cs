using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using MonitorNet.Functions.Api.Devices.Interfaces;

namespace MonitorNet.Functions.Api;

internal class GetOne(IDeviceService service)
{
    [Function("DevicesGetOne")]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, nameof(HttpMethod.Get), Route = "devices/{id}")]
        HttpRequest request,
        string id)
    {
        var result = await service.GetOneAsync(id, request.HttpContext.RequestAborted);
        return result is not null ? new OkObjectResult(result) : new NotFoundResult();
    }
}

