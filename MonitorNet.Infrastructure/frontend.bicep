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
  properties: {}
  tags: {
    application: application
    environment: environment
  }
}

output id string = app.id
output name string = app.name
output uri string = 'https://${empty(app.properties.customDomains) ? app.properties.defaultHostname : app.properties.customDomains[0]}'
