export interface Device {
  id: string
  name: string,
  status: "Online" | "Offline" | "Unknown",
  type: string
  versions: DeviceVersions
  releases: DeviceReleases
  network: DeviceNetworkAddresses
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
