<template>
  <Button :disabled="device === undefined" @click="menu?.toggle" severity="contrast">
    <template #icon>
      <IconMdiHamburgerMenu />
    </template>
  </Button>
  <Menu ref="menu" :popup="true" :model="[
    {
      label: 'Monitors',
      items: [
        {
          label: 'Configure',
          command: monitors,
          meta: { icon: MdiMonitors }
        }
      ]
    },
    {
      label: 'Actions',
      items: [
        {
          label: 'Reload',
          command: action,
          meta: { icon: MdiReload, verb: 'reload', severity: 'warning' }
        },
        {
          label: 'Restart',
          command: action,
          meta: { icon: MdiRestart, verb: 'restart', severity: 'danger' }
        },
        {
          label: 'Shutdown',
          command: action,
          meta: { icon: MdiShutdown, verb: 'shutdown', severity: 'danger' }
        }
      ]
    }
  ]">
    <template #itemicon="{ item }">
      <component :is="item.meta.icon" class="mr-2" />
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"
import type Menu from "primevue/menu"
import type { MenuItemCommandEvent } from "primevue/menuitem"
import { useConfirm } from "primevue/useconfirm"
import MdiMonitors from "~icons/mdi/monitors"
import MdiReload from "~icons/mdi/reload"
import MdiRestart from "~icons/mdi/restart"
import MdiShutdown from "~icons/mdi/shutdown"

const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)

const confirm = useConfirm()
const menu = ref<Menu>()

const monitors = () => console.log("Monitors")

const action = (event: MenuItemCommandEvent) => confirm.require({
  header: event.item.label as string,
  message: `Are you sure you want to ${event.item.meta.verb} ${device.value?.name}?`,
  accept: () => handle(event.item.meta.verb),
  acceptLabel: event.item.label as string,
  acceptClass: `p-button-${event.item.meta.severity}`,
  rejectLabel: "Cancel",
  rejectClass: "p-button-secondary p-button-outlined"
})

const handle = (command: string) => console.log(command)
</script>
