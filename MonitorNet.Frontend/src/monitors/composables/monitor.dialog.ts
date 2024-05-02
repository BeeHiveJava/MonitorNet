import { type DeviceId } from "@/devices"
import { useMonitor, type MonitorId, type MonitorRotation } from "@/monitors"
import { DefaultCryptoSymbol, type CryptoSymbol } from "@/symbols"
import type { DynamicDialogOptions } from "primevue/dynamicdialogoptions"
import { useDialog } from "primevue/usedialog"

export const MonitorDialogActiveSymbol = ref<CryptoSymbol>(DefaultCryptoSymbol)
export const MonitorDialogActiveRotation = ref<MonitorRotation>("normal")

export type MonitorDialogOpen = (device: DeviceId, monitor: MonitorId) => void
export type MonitorDialogOpenData = { device: DeviceId, monitor: MonitorId }

export const useMonitorConfigurationDialog = (): MonitorDialogOpen => {
  const dialog = useDialog()
  return (device, monitor) => open(dialog, device, monitor)
}

const open = (dialog: any, device: DeviceId, monitor: MonitorId) => {
  const value = toValue(useMonitor(device, monitor))
  MonitorDialogActiveSymbol.value = value?.symbol ?? DefaultCryptoSymbol
  MonitorDialogActiveRotation.value = value?.rotation ?? "normal"

  dialog.open(body, {
    data: { device, monitor } as MonitorDialogOpenData,
    templates: {
      header: markRaw(header),
      footer: markRaw(footer)
    },
    props: {
      modal: true,
      dismissableMask: true,
      draggable: false,
      style: {
        width: "99vw"
      },
      pt: {
        root: {
          class: "sm:w-30rem"
        }
      }
    }
  } as DynamicDialogOptions)
}

const body = defineAsyncComponent(() => import("@/monitors/components/MonitorConfigurationDialog.vue"))
const header = defineAsyncComponent(() => import("@/monitors/components/MonitorConfigurationDialogHeader.vue"))
const footer = defineAsyncComponent(() => import("@/monitors/components/MonitorConfigurationDialogFooter.vue"))
