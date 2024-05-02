import type { MaybeDeviceRefOrGetter } from "@/devices"
import { useMonitorConfigurationDialog, type MonitorDialogOpen } from "@/monitors"
import type { MenuItem, MenuItemCommandEvent } from "primevue/menuitem"
import { useConfirm } from "primevue/useconfirm"
import MdiMonitor from "~icons/mdi/monitor"
import MdiReload from "~icons/mdi/reload"
import MdiRestart from "~icons/mdi/restart"
import MdiShutdown from "~icons/mdi/shutdown"

export const useDeviceMenu = (device: MaybeDeviceRefOrGetter): MenuItem[] => {
  const confirm = useConfirm()
  const dialog = useMonitorConfigurationDialog()
  return [monitors(dialog, device), actions(confirm, device)]
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

const actions = (confirm: any, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Actions",
  items: [
    reload(confirm, device),
    restart(confirm, device),
    shutdown(confirm, device)
  ]
})


const reload = (confirm: any, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Reload",
  command: event => action(confirm, device, event),
  meta: { icon: MdiReload, verb: "reload", severity: "warning" }
})

const restart = (confirm: any, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Restart",
  command: event => action(confirm, device, event),
  meta: { icon: MdiRestart, verb: "restart", severity: "danger" }
})

const shutdown = (confirm: any, device: MaybeDeviceRefOrGetter): MenuItem => ({
  label: "Shutdown",
  command: event => action(confirm, device, event),
  meta: { icon: MdiShutdown, verb: "shutdown", severity: "danger" }
})

const action = (confirm: any, deviceRef: MaybeDeviceRefOrGetter, event: MenuItemCommandEvent) => {
  const device = toValue(deviceRef)

  return confirm.require({
    header: event.item.label as string,
    message: `Are you sure you want to ${event.item.meta.verb} ${device?.name}?`,
    accept: () => handle(event.item.meta.verb),
    acceptLabel: event.item.label as string,
    acceptClass: `p-button-${event.item.meta.severity}`,
    rejectLabel: "Cancel",
    rejectClass: "p-button-secondary p-button-outlined"
  })
}

const handle = (command: string) => console.log(command)
