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

module backend './backend.bicep' = {
  name: 'backend'
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

module frontend './frontend.bicep' = {
  name: 'frontend'
  params: {
    application: application
    environment: environment
    location: location
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
    backendAppId: backend.outputs.id
    frontendAppUri: frontend.outputs.uri
  }
}

output apim_name string = management.outputs.name
output apim_uri string = management.outputs.uri
output backend_app_name string = backend.outputs.name
output backend_app_uri string = backend.outputs.uri
output frontend_app_name string = frontend.outputs.name
output frontend_app_uri string = frontend.outputs.uri
