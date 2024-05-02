using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using MonitorNet.Functions.Api.Monitors.Interfaces;
using MonitorNet.Functions.Api.Monitors.Models;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Monitors.Functions;

internal class Save(IMonitorService service)
{
    [Function("MonitorsSave")]
    [OpenApiOperation(operationId: "MonitorsSave", tags: ["Monitors"])]
    [OpenApiParameter(name: "device", Type = typeof(string), Required = true)]
    [OpenApiParameter(name: "index", Type = typeof(int), Required = true)]
    [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(DeviceMonitorSaveDto))]
    [OpenApiResponseWithoutBody(HttpStatusCode.OK)]
    [OpenApiResponseWithoutBody(HttpStatusCode.BadRequest)]
    public async Task<IActionResult> SaveAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Put), Route = "monitors/{device}/{index:int}")]
        HttpRequest request,
        string device,
        int index)
    {
        var data = await request.ReadFromJsonAsync<DeviceMonitorSaveDto>(request.HttpContext.RequestAborted);
        if (data is null)
        {
            return new BadRequestResult();
        }

        await service.SaveAsync(device, index, data, request.HttpContext.RequestAborted);
        return new OkResult();
    }
}

