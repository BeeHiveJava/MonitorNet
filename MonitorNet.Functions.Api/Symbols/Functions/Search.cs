using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using MonitorNet.Functions.Api.Symbols.Interfaces;

namespace MonitorNet.Functions.Api.Symbols.Functions;

internal class Search(ISymbolService service)
{
    [Function("SymbolsSearch")]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, nameof(HttpMethod.Get), Route = "symbols/search")]
        HttpRequest request)
    {
        var symbol = request.Query["symbol"].FirstOrDefault() ?? string.Empty;
        var exchange = request.Query["exchange"].FirstOrDefault() ?? string.Empty;

        var results = await service.SearchAsync(symbol, exchange, request.HttpContext.RequestAborted);
        return new OkObjectResult(results);
    }
}
