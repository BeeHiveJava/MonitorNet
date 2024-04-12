param application string = resourceGroup().tags.application
param environment string = resourceGroup().tags.environment
param location string = resourceGroup().location

@secure()
param fncDevicesToken string

@secure()
param apimPublisherName string
@secure()
param apimPublisherEmail string

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
    devicesToken: fncDevicesToken
  }
}

module management './management.bicep' = {
  name: 'management'
  params: {
    application: application
    environment: environment
    location: location
    publisherName: apimPublisherName
    publisherEmail: apimPublisherEmail
  }
}

output apim_name string = management.outputs.name
output api_name string = api.outputs.name
output api_uri string = api.outputs.uri
