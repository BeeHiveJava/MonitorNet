param application string = resourceGroup().tags.application
param environment string = resourceGroup().tags.environment
param location string = resourceGroup().location

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'st${application}${environment}001'
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    accessTier: 'Hot'
  }
  tags: {
    application: application
    environment: environment
  }
}

resource plan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: 'asp${application}${environment}001'
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  tags: {
    application: application
    environment: environment
  }
}

module api './api.bicep' = {
  name: 'api'
  params: {
    application: application
    environment: environment
    location: location
    serverFarmId: plan.id
    storageAccountName: storage.name
    storageAccountKey: storage.listKeys().keys[0].value
  }
}

output api string = api.outputs.name
