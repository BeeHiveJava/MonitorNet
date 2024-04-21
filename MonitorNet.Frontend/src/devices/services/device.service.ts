import type { Device } from "../models/device"

export default class DeviceService {
  private readonly uri: string
  private readonly key: string

  public constructor(
    uri: string = import.meta.env.VITE_API_BASE_URI,
    key: string = import.meta.env.VITE_API_SUBSCRIPTION_KEY
  ) {
    this.uri = uri
    this.key = key
  }

  public async GetAll(): Promise<Device[]> {
    const response = await fetch(`${this.uri}/api/devices`, { headers: this.GetAuthorizationHeaders() })

    if (response.status !== 200) {
      throw new Error("An error occurred while loading devices")
    }

    return await response.json()
  }

  private GetAuthorizationHeaders(): HeadersInit {
    return {
      "Ocp-Apim-Subscription-Key": this.key
    }
  }
}
