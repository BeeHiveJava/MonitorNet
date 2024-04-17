param application string
param environment string
param location string

param serverFarmId string
param storageAccountName string
@secure()
param storageAccountKey string
@secure()
param devicesToken string

resource app 'Microsoft.Web/sites@2023-01-01' = {
  name: 'fncapi${application}${environment}001'
  location: location
  kind: 'functionapp'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: serverFarmId
    siteConfig: {
      netFrameworkVersion: 'v8.0'
      appSettings: [
        {
          name: 'Devices:Token'
          value: devicesToken
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${az.environment().suffixes.storage};AccountKey=${storageAccountKey}'
        }
        {
          name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${az.environment().suffixes.storage};AccountKey=${storageAccountKey}'
        }
        {
          name: 'WEBSITE_CONTENTSHARE'
          value: 'fncapi${application}${environment}001'
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'dotnet-isolated'
        }
      ]
    }
  }
  tags: {
    application: application
    environment: environment
  }
}

output id string = app.id
output name string = app.name
output uri string = 'https://${app.properties.defaultHostName}'
