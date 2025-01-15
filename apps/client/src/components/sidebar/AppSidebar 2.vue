<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="60"
    mobile-breakpoint="lg"
    app
    class="text-white bg-black leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
  >
    <div class="pa-5">
      <div class="logo">
        <router-link to="/dashboard">
          <v-img :src="Logo" width="118" height="35" contain class="mx-auto"></v-img>
        </router-link>
      </div>
    </div>
    <perfect-scrollbar class="scrollnavbar">
      <v-list aria-busy="true" aria-label="menu list">
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <v-divider class="my-3" v-else-if="item.divider" />
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <NavItem :item="item" v-else />
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script setup>
import { shallowRef } from 'vue'
import useCustomizerStore from '@/stores/customizer'
import sidebarItems from './sidebarItems'

import NavGroup from './NavGroup.vue'
import NavItem from './NavItem.vue'
import NavCollapse from './NavCollapse.vue'
import Logo from '@/assets/logo.png'
const customizer = useCustomizerStore()
const sidebarMenu = shallowRef(sidebarItems)
</script>
