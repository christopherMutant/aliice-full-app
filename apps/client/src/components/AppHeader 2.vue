<template>
  <v-app-bar :elevation="0" density="comfortable">
    <template #prepend>
      <v-btn
        v-if="mobile"
        :ripple="false"
        variant="flat"
        icon="mdi-menu"
        @click="$emit('toggleDrawer')"
      />
      <!-- <v-text-field prepend-icon-inner="mdi-magnify" varant="plain" /> -->
    </template>
    <template #append>
      <v-menu id="profile">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :ripple="false"
            rounded="0"
            variant="plain"
            @click="showMenu = !showMenu"
          >
            <div>
              <span>{{ user.firstName + ' ' + user.lastName }}</span>
            </div>
            <v-avatar size="x-small">
              <v-img :src="'/images/profile.jpg'" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list lines="none">
          <v-list-item>
            <v-list-item-title>{{ user.firstName + ' ' + user.lastName }}</v-list-item-title>

            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item
            @click.prevent="openProfileDialog"
            variant="plain"
            prepend-icon="mdi-account-circle"
          >
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="logout" variant="plain" prepend-icon="mdi-logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify/lib/framework.mjs'

defineEmits(['toggleDrawer'])

const router = useRouter()
const { mobile } = useDisplay()
const dialog = ref(false)
const showMenu = ref(false)
const user = JSON.parse(localStorage.getItem('user'))
const logout = async () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

const openProfileDialog = () => {
  dialog.value = true
}
</script>

<style scoped>
.v-app-bar.v-toolbar {
  box-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.05) !important;
  border-bottom: 0.0625rem solid #e2e8ee !important;
}
</style>
