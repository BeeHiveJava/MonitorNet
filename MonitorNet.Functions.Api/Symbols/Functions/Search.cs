﻿using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.OpenApi.Models;
using MonitorNet.Functions.Api.Symbols.Interfaces;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Symbols.Functions;

internal class Search(ISymbolService service)
{
    [Function("SymbolsSearch")]
    [OpenApiOperation(operationId: "SymbolsSearch", tags: ["Symbols"])]
    [OpenApiParameter(name: "symbol", Type = typeof(string), Required = false, In = ParameterLocation.Query)]
    [OpenApiParameter(name: "exchange", Type = typeof(string), Required = false, In = ParameterLocation.Query)]
    [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(IEnumerable<Symbol>))]
    public async Task<IActionResult> SearchAsync(
        [HttpTrigger(AuthorizationLevel.Function, nameof(HttpMethod.Get), Route = "symbols/search")]
        HttpRequest request)
    {
        var symbol = request.Query["symbol"].FirstOrDefault() ?? string.Empty;
        var exchange = request.Query["exchange"].FirstOrDefault() ?? string.Empty;

        var results = await service.SearchAsync(symbol, exchange, request.HttpContext.RequestAborted);
        return new OkObjectResult(results);
    }
}
