import { type DeviceId } from "@/devices"
import { useMonitor, type MonitorId } from "@/monitors"
import type { CryptoSymbol } from "@/symbols"
import type { DynamicDialogOptions } from "primevue/dynamicdialogoptions"
import { useDialog } from "primevue/usedialog"

export const MonitorDialogActiveSymbol = ref<CryptoSymbol>({ id: "BTCUSDT" })

export type MonitorDialogOpen = (device: DeviceId, monitor: MonitorId) => void
export type MonitorDialogOpenData = { device: DeviceId, monitor: MonitorId }

export const useMonitorConfigurationDialog = (): MonitorDialogOpen => {
  const dialog = useDialog()
  return (device, monitor) => open(dialog, device, monitor)
}

const open = (dialog: any, device: DeviceId, monitor: MonitorId) => {
  MonitorDialogActiveSymbol.value = toValue(useMonitor(device, monitor))?.symbol ?? { id: "BTCUSDT" }
  const data: MonitorDialogOpenData = { device, monitor }

  dialog.open(body, {
    data,
    templates: {
      header: markRaw(header),
      footer: markRaw(footer)
    },
    props: {
      modal: true,
      dismissableMask: true,
      draggable: false
    }
  } as DynamicDialogOptions)
}

const body = defineAsyncComponent(() => import("@/monitors/components/MonitorConfigurationDialog.vue"))
const header = defineAsyncComponent(() => import("@/monitors/components/MonitorConfigurationDialogHeader.vue"))
const footer = defineAsyncComponent(() => import("@/monitors/components/MonitorConfigurationDialogFooter.vue"))
