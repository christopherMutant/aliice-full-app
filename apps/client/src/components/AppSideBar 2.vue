<template>
  <v-navigation-drawer
    v-model="drawer"
    width="255"
    color="rgba(0,0,0,1)"
    :mobile="mobile"
    persistent
  >
    <div
      class="sticky top-0 left-0 right-0 z-10 bg-black"
      :class="{ 'pt-16 pb-8': mobile, 'py-8': !mobile }"
    >
      <v-img :src="Logo" aspect-ratio="1/1" :width="100" cover class="mx-auto" />
      <v-icon
        v-if="mobile"
        icon="mdi-close"
        color="white"
        class="!absolute top-5 right-5"
        @click="drawer = false"
      ></v-icon>
    </div>
    <v-list lines="none" v-model:opened="open" density="compact" nav>
      <template v-for="(item, index) in items" :key="index">
        <v-list-group v-if="'children' in item" :value="item.title" @click="toggleListGroup(item)">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" />
          </template>
          <v-list-item
            v-for="(child, index) in item.children"
            :key="index"
            :title="child.title"
            :value="child.title"
            :prepend-icon="child?.icon"
            :class="{ 'v-list-item--active': isActiveRoute(child.route) }"
            @click.stop="push(child.route)"
            :disabled="isActiveRoute(child.route)"
            exact
          />
        </v-list-group>
        <v-list-item
          v-else
          :title="item.title"
          :value="item.title"
          :class="{ 'v-list-item--active': isActiveRoute(item.route) }"
          variant="plain"
          @click.stop="push(item.route)"
          :disabled="isActiveRoute(item.route)"
          :prepend-icon="item.icon"
          exact
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Logo from '@/assets/logo.png'
import { useDisplay } from 'vuetify/lib/framework.mjs'
const { mobile } = useDisplay()
const router = useRouter()
const route = useRoute()
const open = ref([])
const drawer = ref(true)

const props = defineProps({
  drawerState: {
    required: true,
    type: Boolean,
  },
})

watch(
  [() => mobile.value, () => props.drawerState],
  ([isMobile, drawerState]) => {
    drawer.value = isMobile ? drawerState : true
  },
  { immediate: true },
)

const items = ref([
  {
    title: 'Dashboard',
    route: '/dashboard',
    icon: 'mdi mdi-monitor',
  },
  {
    title: 'Agenda',
    route: '/agenda',
    icon: 'mdi mdi-calendar-month',
  },
  {
    title: 'Contacts',
    icon: 'mdi mdi-contacts',
    route: '/contacts',
    children: [
      {
        title: 'Contacts',
        route: '/contacts',
      },
      {
        title: 'Patients',
        route: '/contacts/patients',
      },
      {
        title: 'Doctors',
        route: '/contacts/doctors',
      },
    ],
  },
  {
    title: 'Invoices',
    icon: 'mdi mdi-invoice-multiple',
    children: [
      {
        title: 'Daily Check',
        route: '/invoices',
      },
      {
        title: 'Open Services',
        route: '/invoices/patients',
      },
      {
        title: 'Reminders To Create',
        route: '/invoices/doctors',
      },
      {
        title: 'Assets',
        route: '/invoices/doctors',
      },
      {
        title: 'Statistics',
        route: '/invoices/doctors',
      },
      {
        title: 'Collections',
        route: '/invoices/doctors',
      },
    ],
  },
  {
    title: 'Measures',
    icon: 'mdi mdi-flask',
    children: [
      {
        title: 'Laboratory Results',
        route: '/measures',
      },
      {
        title: 'QC Inbox',
        route: '/measures/patients',
      },
      {
        title: 'List of Devices',
        route: '/measures/doctors',
      },
      {
        title: 'All Requests',
        route: '/measures/doctors',
      },
    ],
  },
  {
    title: 'Documents',
    icon: 'mdi mdi-file-document-multiple',
    children: [
      {
        title: 'Inbox',
        route: '/documents',
      },
      {
        title: 'Direct Mail',
        route: '/documents/patients',
      },
    ],
  },
  {
    title: 'Tasks',
    icon: 'mdi mdi-clipboard-check',
    children: [
      {
        title: 'Current Task',
        route: '/tasks',
      },
      {
        title: 'Summons',
        route: '/tasks/patients',
      },
      {
        title: 'All Tasks',
        route: '/tasks/patients',
      },
    ],
  },
  {
    title: 'Statistics',
    icon: 'mdi mdi-chart-box',
    children: [
      {
        title: 'Advanced Search',
        route: '/statistics',
      },
      {
        title: 'Statistics',
        route: '/statistics/patients',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'mdi-cog',
    children: [
      {
        title: 'User Settings',
        route: '/settings',
      },
      {
        title: 'Database',
        route: '/settings/patients',
      },
      {
        title: 'Patient Indicators',
        route: '/settings/patients',
      },
      {
        title: 'Laborator',
        route: '/settings/patients',
      },
      {
        title: 'Billing',
        route: '/settings/patients',
      },
      {
        title: 'Service Sheet',
        route: '/settings/patients',
      },
      {
        title: 'Favorites and Benefit Blocks',
        route: '/settings/patients',
      },
      {
        title: 'Consultation',
        route: '/settings/patients',
      },
      {
        title: 'Medical Notes',
        route: '/settings/patients',
      },
      {
        title: 'Catalogues',
        route: '/settings/patients',
      },
      {
        title: 'Medicine',
        route: '/settings/patients',
      },
      {
        title: 'Document Management',
        route: '/settings/patients',
      },
      {
        title: 'Inability',
        route: '/settings/patients',
      },
      {
        title: 'Tasks',
        route: '/settings/patients',
      },
      {
        title: 'Diagnosis and Anamesis',
        route: '/settings/patients',
      },
      {
        title: 'Mail',
        route: '/settings/patients',
      },
    ],
  },
])

const toggleListGroup = (item) => {
  open.value.slice(0).push(item.title)
}

const isActiveRoute = (r) => {
  return route.fullPath === r
}

const push = (selectedRoute) => {
  if (!isActiveRoute(selectedRoute)) {
    router.push(selectedRoute)
  }
}

const updateListItems = (currentRoute) => {
  items.value.forEach((item) => {
    if (item.route === currentRoute) {
      open.value.push(item.title)
    }
    if ('children' in item) {
      item.children.forEach((child) => {
        if (child.route === currentRoute) {
          open.value.push(item.title) // Open the group for the active child route
        }
      })
    }
  })
}

watch(
  () => route.fullPath,
  (newPath) => {
    // open.value = []
    updateListItems(newPath)
  },
  { deep: true },
)

onMounted(() => {
  updateListItems(route.fullPath)
  // items.value.filter((item) => {
  //   // item.accessRights = item.accessRights.includes(user.role)
  //   if ('children' in item) {
  //     item.children.filter((child) => {
  //       if (child.route === route.fullPath) {
  //         open.value.push(item.title)
  //       }
  //       // child.accessRights = child.accessRights.includes(user.role)
  //     })
  //   }
  // })
})
</script>
<style scoped>
.v-navigation-drawer :deep(.v-navigation-drawer__content) {
  position: relative;
  scrollbar-width: none;
}
.v-navigation-drawer .v-list .v-list-item :deep(.v-list-item-title) {
  white-space: normal;
}
.v-navigation-drawer .v-list .v-list-item {
  color: #fff;
  opacity: 1;
  margin-bottom: 6px;
  margin-top: 6px;
}
.v-navigation-drawer .v-list .v-list-item:hover {
  color: #fff;
  background: #b7b3b4;
}

.v-navigation-drawer .v-list .v-list-item--active {
  color: #fff;
  background: #2570c1;
}
.v-navigation-drawer .v-list .v-list-group--open .v-list-group__header {
  color: #fff;
  background: #6e8aa9;
}
.v-list-group__items .v-list-item {
  padding-inline-start: 32px !important;
}
</style>
