<script setup>
import { RouterView } from 'vue-router'
import LoaderWrapper from '@/components/AppLoader.vue'
import VerticalSidebarVue from '@/components/sidebar/AppSidebar.vue'
import VerticalHeaderVue from '@/components/header/AppHeader.vue'
</script>

<template>
  <v-locale-provider>
    <v-app>
      <VerticalSidebarVue />
      <VerticalHeaderVue />

      <v-main class="page-wrapper">
        <v-container fluid>
          <div>
            <!-- Loader start -->
            <LoaderWrapper />
            <!-- Loader end -->
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
