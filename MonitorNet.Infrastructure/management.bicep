param application string
param environment string
param location string

@secure()
param publisherName string
@secure()
param publisherEmail string

resource management 'Microsoft.ApiManagement/service@2022-08-01' = {
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

resource api 'Microsoft.ApiManagement/service/apis@2022-08-01' = {
  name: 'api'
  parent: management
  properties: {
    displayName: 'api'
    description: 'api'
    path: 'api'
    protocols: ['https']
  }
}


resource policy 'Microsoft.ApiManagement/service/apis/policies@2023-05-01-preview' = {
  name: 'policy'
  parent: api
  properties: {
    format: 'xml'
    value: '''
      <policies>
          <inbound />
          <backend>
              <forward-request />
          </backend>
          <outbound />
      </policies>
    '''
  }
}

output name string = management.name

