using System.Linq.Expressions;
using System.Text.Json;
using Azure.Data.Tables;
using MonitorNet.Functions.Api.Monitors.Interfaces;
using MonitorNet.Functions.Api.Monitors.Models;
using MonitorNet.Functions.Api.Symbols.Models;

namespace MonitorNet.Functions.Api.Monitors.Implementations;

internal class MonitorStore(TableClient client) : IMonitorStore
{
    public Task<IEnumerable<DeviceMonitor>> GetAllAsync(CancellationToken ct = default)
    {
        return QueryAsync(_ => true, ct);
    }

    public Task<IEnumerable<DeviceMonitor>> GetAllAsync(string device, CancellationToken ct = default)
    {
        return QueryAsync(entity => entity.PartitionKey == device, ct);
    }

    public async Task<DeviceMonitor?> GetOneAsync(string device, int index, CancellationToken ct = default)
    {
        var entity = await client.GetEntityIfExistsAsync<TableEntity>(device, Convert.ToString(index), cancellationToken: ct);
        return ToModel(entity.HasValue ? entity.Value : null);
    }

    public Task SaveAsync(DeviceMonitor monitor, CancellationToken ct = default)
    {
        var entity = ToEntity(monitor);
        return client.UpsertEntityAsync(entity, TableUpdateMode.Replace, ct);
    }

    private async Task<IEnumerable<DeviceMonitor>> QueryAsync(Expression<Func<TableEntity, bool>> filter, CancellationToken ct)
    {
        var results = new List<DeviceMonitor>();

        var entities = client.QueryAsync(filter, cancellationToken: ct);
        await foreach (var entity in entities.WithCancellation(ct))
        {
            var model = ToModel(entity);
            if (model is null)
            {
                continue;
            }

            results.Add(model);
        }

        return results;
    }

    private static DeviceMonitor? ToModel(TableEntity? entity)
    {
        if (entity is null)
        {
            return null;
        }

        return new DeviceMonitor
        {
            DeviceId = entity.PartitionKey,
            Index = Convert.ToInt32(entity.RowKey),
            Symbol = JsonSerializer.Deserialize<Symbol>((string)entity![nameof(DeviceMonitor.Symbol)]),
            Rotation = (string)entity![nameof(DeviceMonitor.Rotation)]
        };
    }

    private static TableEntity ToEntity(DeviceMonitor monitor)
    {
        return new TableEntity(monitor.DeviceId, Convert.ToString(monitor.Index))
        {
            [nameof(DeviceMonitor.Symbol)] = JsonSerializer.Serialize(monitor.Symbol),
            [nameof(DeviceMonitor.Rotation)] = monitor.Rotation
        };
    }
}
