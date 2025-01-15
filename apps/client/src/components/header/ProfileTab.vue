<template>
  <div>
    <div class="d-flex align-center pa-5">
      <v-avatar size="32" class="mr-2">
        <img
          :src="'https://api.dicebear.com/9.x/personas/svg'"
          color="info"
          width="32"
          alt="Julia"
        />
      </v-avatar>
      <div>
        <h6 class="mb-0 text-h6">
          {{ capitalize(user.firstName) }} {{ capitalize(user.lastName) }}
        </h6>
        <p class="mb-0 text-caption">Test role</p>
      </div>
    </div>
    <perfect-scrollbar>
      <v-list class="py-0" aria-label="profile list" aria-busy="true">
        <v-list-item color="primary" rounded="0" value="View Profile">
          <template v-slot:prepend>
            <UserOutlined :style="{ fontSize: '14px' }" class="mr-4" />
          </template>

          <v-list-item-title class="text-subtitle-2"> View Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="authStore.logout()" color="secondary" rounded="0">
          <template v-slot:prepend>
            <LogoutOutlined :style="{ fontSize: '14px' }" class="mr-4" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>

<script setup>
import { capitalize, ref } from 'vue'
// icons
import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LockOutlined,
  CommentOutlined,
  UnorderedListOutlined,
  EditOutlined,
  ProfileOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import useAuthStore from '@/stores/auth'
const user = JSON.parse(localStorage.getItem('user'))
const tab = ref(null)
const authStore = useAuthStore()
</script>
