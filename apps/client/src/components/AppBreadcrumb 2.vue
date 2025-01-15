<template>
  <v-row class="mb-0 page-breadcrumb mt-n2">
    <v-col cols="12" md="12">
      <v-card elevation="0" variant="text">
        <v-row no-gutters class="align-center">
          <v-col sm="12">
            <v-breadcrumbs :items="props.breadcrumbs" class="mb-0 text-h6 pa-1 font-weight-medium">
              <template v-slot:divider>
                <div class="d-flex align-center">/</div>
              </template>
              <template v-slot:prepend>
                <router-link to="/dashboard" class="text-lightText text-h6 text-decoration-none">
                  Home
                </router-link>
                <div class="px-2 d-flex align-center text-lightText">/</div>
              </template>
            </v-breadcrumbs>
            <h3 class="mt-1 mb-0 text-h4">{{ props.title }}</h3>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  breadcrumbs: {
    type: Array,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
})
</script>

<style scoped>
.page-breadcrumb .v-toolbar {
  background: transparent;
}
</style>
