<template>
  <template v-if="!['create-patient', 'patient-details'].includes(route.name)">
    <app-breadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></app-breadcrumb>
    <v-card class="bg-surface" variant="outlined" elevation="0">
      <v-card-item>
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="3">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              hide-details
              variant="outlined"
              density="compact"
              placeholder="Search"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <div class="flex justify-end">
              <v-btn
                color="primary"
                :ripple="false"
                variant="flat"
                :prepend-icon="PlusOutlined"
                @click="createPatient"
                :loading="loadingData"
              >
                Add new patient
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text class="px-0 pb-0 rounded-md" variant="outlined">
        <v-data-table
          class="bordered-table"
          hover
          density="comfortable"
          :headers="headers"
          :items="store.patients"
          :loading="loading"
          :mobile="mobile"
          :search="search"
        >
          <template #[`item.firstName`]="{ item }">
            {{ capitalize(item.firstName) }}
          </template>
          <template #[`item.lastName`]="{ item }">
            {{ capitalize(item.lastName) }}
          </template>
          <template #[`item.dateOfBirth`]="{ item }">
            {{ helper.formatDateToYYYYMMDD(item.dateOfBirth) }}
          </template>
          <template #[`item.actions`]="{ item }">
            <div class="operation-wrapper">
              <v-btn
                @click="toggleDialog(item)"
                :icon="EyeOutlined"
                variant="text"
                rounded
                size="sm"
                color="secondary"
              />
              <v-btn
                @click="toggleDialog(item)"
                :icon="DeleteOutlined"
                variant="text"
                rounded
                size="sm"
                color="error"
              />
            </div>
          </template>
          <template #loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <UserModal
      :dialog-state="dialogState"
      :user="selectedUser"
      @close="dialogState = false"
    ></UserModal>
    <CreatePatient
      :dialog-state="dialogState2"
      @close="close"
      :cities="commonStore.cities"
      :countries="commonStore.countries"
      :cantons="commonStore.cantons"
      :contact-owners="store.users"
      @save="savePatient"
      :isSubmit="store.loading"
    ></CreatePatient>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</template>
<script setup>
import UserModal from '@/components/modals/UserModal.vue'
import { onMounted, reactive, ref, capitalize, shallowRef } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import useUserStore from '@/stores/user'
import helper from '@/utils/helper'
import { RouterView, useRoute } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { EyeOutlined } from '@ant-design/icons-vue'
import CreatePatient from '@/components/modals/CreatePatient.vue'
import useCommonStore from '@/stores/common'
const commonStore = useCommonStore()
const page = ref({ title: 'Patients' })
const search = ref('')
const breadcrumbs = shallowRef([
  {
    title: 'Contacts',
    disabled: false,
    href: '/contacts',
  },
  {
    title: 'Patients',
    disabled: true,
    href: '/contacts/patients',
  },
])
const route = useRoute()
const { mobile } = useDisplay()
const store = useUserStore()
const { fetchPatients, fetchUsers } = useUserStore()
const headers = reactive([
  { title: 'No', value: 'patientNumber', sortable: true },
  { title: 'First Name', value: 'firstName', sortable: true },
  { title: 'Last Name', value: 'lastName', sortable: true },
  { title: 'Date of birth', value: 'dateOfBirth', sortable: true },
  { title: 'Sex', value: 'gender', sortable: true },
  { title: 'NPA', value: 'npa', sortable: true },
  { title: 'Locality', value: 'locality', sortable: true },
  { title: 'Client', value: 'client', sortable: true },
  { title: 'Email', value: 'email', sortable: true },
  { title: 'Language', value: 'language', sortable: true },
  { title: 'Doctor', value: 'doctor', sortable: true },
  { title: 'VIP CHIR', value: 'vip_chir', sortable: true },
  { title: 'VIP AEST', value: 'vip_aest', sortable: true },
  { title: 'Action', key: 'actions', sortable: false },
])
const loading = ref(false)
const loadingData = ref(false)
const dialogState = ref(false)
const selectedUser = ref({})
const toggleDialog = (item) => {
  dialogState.value = !dialogState.value
  selectedUser.value = item
}

const dialogState2 = ref(false)
const close = () => {
  dialogState2.value = false
}
const createPatient = async () => {
  loadingData.value = true
  await commonStore.fetchCities()
  await commonStore.fetchCantons()
  await commonStore.fetchCountries()
  await fetchUsers()
  loadingData.value = false
  dialogState2.value = true
}
const savePatient = async (payload) => {
  await store.createUser(payload)
  close()
  inititalize()
}
const inititalize = async () => {
  loading.value = true
  await fetchPatients()
  loading.value = false
}

onMounted(() => {
  inititalize
})
</script>

<style scoped>
.v-pagination :deep(.v-pagination__list) {
  margin: 0;
}
</style>
