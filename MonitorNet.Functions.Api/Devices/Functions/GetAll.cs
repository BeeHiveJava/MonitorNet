using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using MonitorNet.Functions.Api.Devices.Interfaces;

namespace MonitorNet.Functions.Api.Devices.Functions;

internal class GetAll(IDeviceService service)
{
    [Function("DevicesGetAll")]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, nameof(HttpMethod.Get), Route = "devices")]
        HttpRequest request)
    {
        var results = await service.GetAllAsync(request.HttpContext.RequestAborted);
        return new OkObjectResult(results);
    }
}
