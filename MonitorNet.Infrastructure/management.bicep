param application string
param environment string
param location string

@secure()
param publisherName string
@secure()
param publisherEmail string

param backendAppName string
param frontendAppName string

resource backend 'Microsoft.Web/sites@2023-01-01' existing = {
  name: backendAppName
}

resource frontend 'Microsoft.Web/staticSites@2023-01-01' existing = {
  name: frontendAppName
}

resource management 'Microsoft.ApiManagement/service@2023-05-01-preview' = {
  name: 'apim${application}${environment}001'
  location: location
  sku: {
    name: 'Consumption'
    capacity: 0
  }
  properties: {
    publisherName: publisherName
    publisherEmail: publisherEmail
  }
  tags: {
    application: application
    environment: environment
  }
}

resource api 'Microsoft.ApiManagement/service/apis@2023-05-01-preview' = {
  name: 'api'
  parent: management
  properties: {
    displayName: 'api'
    description: 'api'
    path: 'api'
    protocols: ['https']
  }
}

resource policy 'Microsoft.ApiManagement/service/apis/policies@2024-05-01' = {
  name: 'policy'
  parent: api
  properties: {
    format: 'rawxml'
    value: '''
      <policies>
        <inbound>
          <set-header name="x-functions-key" exists-action="skip">
            <value>{{FunctionAppKey}}</value>
          </set-header>
          <cors allow-credentials="false">
            <allowed-origins>
              <origin>{{FrontendAppHost}}</origin>
              <origin>{{FrontendAppLocalHost}}</origin>
            </allowed-origins>
            <allowed-methods preflight-result-max-age="3600">
              <method>*</method>
            </allowed-methods>
            <allowed-headers>
              <header>*</header>
            </allowed-headers>
          </cors>
          <base/>
        </inbound>
        <backend><base/></backend>
        <outbound><base/></outbound>
        <on-error><base /></on-error>
      </policies>
    '''
  }
}

resource functionAppKey 'Microsoft.ApiManagement/service/namedValues@2023-05-01-preview' = {
  name: 'FunctionAppKey'
  parent: management
  properties: {
    displayName: 'FunctionAppKey'
    value: listkeys('${backend.id}/host/default', '2023-01-01').functionKeys.default
    secret: true
  }
}

resource frontendAppHost 'Microsoft.ApiManagement/service/namedValues@2023-05-01-preview' = {
  name: 'FrontendAppHost'
  parent: management
  properties: {
    displayName: 'FrontendAppHost'
    value: 'https://${empty(frontend.properties.customDomains) ? frontend.properties.defaultHostname : frontend.properties.customDomains[0]}'
  }
}

resource frontendAppLocalHost 'Microsoft.ApiManagement/service/namedValues@2023-05-01-preview' = {
  name: 'FrontendAppLocalHost'
  parent: management
  properties: {
    displayName: 'FrontendAppLocalHost'
    value: 'http://localhost:5173'
  }
}

output id string = management.id
output name string = management.name
output uri string = management.properties.gatewayUrl

