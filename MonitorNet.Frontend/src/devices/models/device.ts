export interface Device {
  id: string
  name: string,
  status: "Online" | "Offline" | "Unknown" | undefined,
  type: string
  undervolted: boolean
  versions: DeviceVersions
  releases: DeviceReleases
  network: DeviceNetworkAddresses
  usage: DeviceUsage
}

export interface DeviceVersions {
  supervisor: string
  host: string
}

export interface DeviceReleases {
  current: string
  target: string
}

export interface DeviceNetworkAddresses {
  local: string
  public: string
}

export interface DeviceUsage {
  memoryUsageGb: number,
  memoryTotalGb: number,
  storageUsageGb: number,
  storageTotalGb: number,
  cpuUsage: number,
  cpuTemperature: number
}
