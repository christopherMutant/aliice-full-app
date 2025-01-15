<template>
  <v-app-bar elevation="0" height="60">
    <v-btn
      class="mr-3 hidden-md-and-down text-secondary"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>

    <!-- search mobile -->
    <v-menu :close-on-content-click="false" class="hidden-lg-and-up" offset="10, 0">
      <template v-slot:activator="{ props }">
        <v-btn
          class="ml-1 hidden-lg-and-up text-secondary"
          color="lightsecondary"
          icon
          rounded="sm"
          variant="flat"
          size="small"
          v-bind="props"
        >
          <SearchOutlined :style="{ fontSize: '17px' }" />
        </v-btn>
      </template>
      <v-sheet class="search-sheet v-col-12 pa-0" width="320">
        <v-text-field
          persistent-placeholder
          placeholder="Search here.."
          color="primary"
          variant="solo"
          hide-details
        >
          <template v-slot:prepend-inner>
            <SearchOutlined :style="{ fontSize: '17px' }" />
          </template>
        </v-text-field>
      </v-sheet>
    </v-menu>
    <v-sheet class="d-none d-lg-block" width="250">
      <Searchbar />
    </v-sheet>
    <v-spacer />
    <NotificationDD />
    <v-menu :close-on-content-click="false" offset="8, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn" variant="text" rounded="sm" v-bind="props">
          <div class="d-flex align-center">
            <v-avatar class="py-2 mr-0 mr-sm-2">
              <img
                :src="'https://api.dicebear.com/9.x/personas/svg'"
                alt="Profile Image"
                color="info"
              />
            </v-avatar>
            <h6 class="mb-0 text-subtitle-1 d-sm-block d-none">{{ capitalize(user.firstName) }}</h6>
          </div>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="290">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import useCustomizerStore from '@/stores/customizer'
// icons
import { MenuFoldOutlined, SearchOutlined } from '@ant-design/icons-vue'

// dropdown imports
import NotificationDD from './NotificationTab.vue'
import Searchbar from './SearchBarPanel.vue'
import ProfileDD from './ProfileTab.vue'
import { capitalize } from 'vue'
// import Logo from '@/assets/logo.png'
const customizer = useCustomizerStore()
const user = JSON.parse(localStorage.getItem('user'))
</script>
