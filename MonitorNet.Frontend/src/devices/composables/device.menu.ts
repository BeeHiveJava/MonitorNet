import { useDeviceStore, type DeviceId, type MaybeDeviceRefOrGetter } from "@/devices"
import { useMonitorConfigurationDialog, type MonitorDialogOpen } from "@/monitors"
import type { MenuItem, MenuItemCommandEvent } from "primevue/menuitem"
import type { ToastServiceMethods } from "primevue/toastservice"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import MdiMonitor from "~icons/mdi/monitor"
import MdiReload from "~icons/mdi/reload"
import MdiRestart from "~icons/mdi/restart"
import MdiShutdown from "~icons/mdi/shutdown"

export const useDeviceMenu = (device: MaybeDeviceRefOrGetter): MenuItem[] => {
  const confirm = useConfirm()
  const toast = useToast()
  const dialog = useMonitorConfigurationDialog()
  return [monitors(dialog, device), actions(confirm, toast, device)]
}

const monitors = (dialog: MonitorDialogOpen, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Monitors",
  items: [
    {
      label: "Monitor 1",
      command: () => dialog(device, 1),
      meta: { icon: MdiMonitor }
    },
    {
      label: "Monitor 2",
      command: () => dialog(device, 2),
      meta: { icon: MdiMonitor }
    }
  ]
})

const actions = (confirm: any, toast: ToastServiceMethods, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Actions",
  items: [
    restart(confirm, toast, device),
    reboot(confirm, toast, device),
    shutdown(confirm, toast, device)
  ]
})


const restart = (confirm: any, toast: ToastServiceMethods, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Restart",
  command: event => action(confirm, toast, device, event),
  meta: { icon: MdiReload, action: "restart", severity: "warning" }
})

const reboot = (confirm: any, toast: ToastServiceMethods, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Reboot",
  command: event => action(confirm, toast, device, event),
  meta: { icon: MdiRestart, action: "reboot", severity: "danger" }
})

const shutdown = (confirm: any, toast: ToastServiceMethods, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Shutdown",
  command: event => action(confirm, toast, device, event),
  meta: { icon: MdiShutdown, action: "shutdown", severity: "danger" }
})

const action = (confirm: any, toast: ToastServiceMethods, deviceRef: MaybeDeviceRefOrGetter, event: MenuItemCommandEvent) => {
  const device = toValue(deviceRef)!
  const action = event.item.meta.action
  const severity = event.item.meta.severity

  return confirm.require({
    header: event.item.label as string,
    message: `Are you sure you want to ${action} ${device?.name}?`,
    accept: async () => await handle(device, action, toast),
    acceptLabel: event.item.label as string,
    acceptClass: `p-button-${severity}`,
    rejectLabel: "Cancel",
    rejectClass: "p-button-secondary p-button-outlined"
  })
}

const handle = async (device: DeviceId, action: string, toast: ToastServiceMethods) => {
  try {
    await handleDeviceAction(device, action)
    toast.add({ severity: "success", summary: `${action} succeeded`, detail: `Device ${action} performed successfully!`, life: 3000 })
  } catch (error) {
    toast.add({ severity: "error", summary: `${action} failed`, detail: `Device ${action} failed!`, life: 3000 })
    throw error
  }
}

const handleDeviceAction = async (device: DeviceId, action: string) => {
  const store = useDeviceStore()
  if (action === "restart") {
    await store.restart(device)
  } else if (action === "reboot") {
    await store.reboot(device)
  } else if (action === "shutdown") {
    await store.shutdown(device)
  }
}
