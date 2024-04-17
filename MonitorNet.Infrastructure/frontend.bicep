param application string
param environment string
param location string

resource app 'Microsoft.Web/staticSites@2023-01-01' = {
  name: 'swa${application}${environment}001'
  location: location
  sku: {
    name: 'free'
    tier: 'free'
  }
  tags: {
    application: application
    environment: environment
  }
}

output id string = app.id
output name string = app.name
output uri string = 'https://${app.properties.defaultHostname}'
