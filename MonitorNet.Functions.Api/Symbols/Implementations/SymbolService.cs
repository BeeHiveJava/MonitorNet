
using System.Net.Http.Json;
using System.Web;
using Microsoft.Extensions.Options;
using MonitorNet.Functions.Api.Symbols.Helpers;
using MonitorNet.Functions.Api.Symbols.Interfaces;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Symbols.Implementations;

internal class SymbolService(IOptions<SymbolSettings> options, HttpClient client) : ISymbolService
{
    public async Task<IEnumerable<Symbol>> SearchAsync(string symbol, string exchange, CancellationToken ct = default)
    {
        var builder = new UriBuilder(options.Value.SearchUri);
        builder.Query = GetSearchQuery(builder.Query, symbol, exchange);

        var result = await client.GetFromJsonAsync<SymbolSearchResult>(builder.Uri, ct);
        return result!.Symbols.Select(entry => entry.ToSymbol());
    }

    private static string GetSearchQuery(string query, string symbol, string exchange)
    {
        var collection = HttpUtility.ParseQueryString(query);

        collection["text"] = symbol;
        collection["exchange"] = exchange;

        collection["search_type"] = "crypto_spot";
        collection["domain"] = "production";

        collection["lang"] = "en";
        collection["sort_by_country"] = "us";

        return collection.ToString()!;
    }
}
