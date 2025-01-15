<template>
  <app-breadcrumb title="Patient Details" :breadcrumbs="breadcrumbs"></app-breadcrumb>
  <v-card elevation="0">
    <v-form lazy-validation v-model="isFormValid" ref="formRef">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-card variant="outlined" class="mb-6">
                <v-card-item>
                  <template #subtitle>
                    <h5 class="text-lg font-normal text-black/100 !opacity-100 m-0">
                      Personal Information
                    </h5>
                  </template>
                  <template #append>
                    <v-icon icon="mdi-dots-horizontal"></v-icon>
                  </template>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" align="center">
                      <v-avatar class="profile-avatar" size="120">
                        <v-img
                          :src="'https://api.dicebear.com/9.x/personas/svg'"
                          color="info"
                          alt="Profile Image"
                        />
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" class="mt-8">
                      <v-row>
                        <v-col cols="12" class="py-0">
                          <div class="mb-2">
                            <v-label>Role</v-label>
                            <v-text-field
                              v-model="patient.userRoles[0].refRole.name"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>First Name</v-label>
                            <v-text-field
                              v-model="patient.firstName"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Last Name</v-label>
                            <v-text-field
                              v-model="patient.lastName"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Gender</v-label>
                            <v-text-field
                              v-model="patient.gender"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Marital Status</v-label>
                            <v-text-field
                              v-model="patient.maritalStatus"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Date of Birth</v-label>
                            <v-date-input
                              v-model="dob"
                              prepend-icon=""
                              required
                              hide-actions
                              show-adjacent-months
                              density="compact"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Language</v-label>
                            <v-text-field
                              v-model="patient.correspondenceLanguage"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Academic Title</v-label>
                            <v-text-field
                              v-model="patient.academicTitle"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Profession</v-label>
                            <v-text-field
                              v-model="patient.profession"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Specialist</v-label>
                            <v-text-field
                              v-model="patient.specialist"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>AVS</v-label>
                            <v-text-field
                              v-model="patient.noAVS"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>VIP Surgery</v-label>
                            <v-text-field
                              v-model="patient.vipSurgery"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>VIP Aesthetics</v-label>
                            <v-text-field
                              v-model="patient.vipAesthetics"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Communication</v-label>
                            <v-text-field
                              v-model="patient.communication"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card variant="outlined" class="mb-6">
                <v-card-item>
                  <template #subtitle>
                    <h5 class="text-lg font-normal text-black/100 !opacity-100 m-0">
                      Contact Information
                    </h5>
                  </template>
                  <template #append>
                    <v-menu>
                      <template #activator="{ props }">
                        <v-btn v-bind="props" variant="text" rounded="sm" size="small" icon>
                          <PlusOutlined :style="{ fontSize: '16px' }" />
                        </v-btn>
                      </template>
                      <v-list class="py-0" density="compact" variant="text">
                        <v-list-item @click="addNewContact('telephone')"> Telephone </v-list-item>
                        <v-list-item @click="addNewContact('phone')"> Mobile </v-list-item>
                        <v-list-item @click="addNewContact('fax')"> Fax </v-list-item>
                        <v-list-item @click="addNewContact('email')"> Email </v-list-item>
                        <v-list-item @click="addNewContact('url')"> URL </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row
                    align="center"
                    justify="center"
                    v-for="(contactDetail, index) in patient.contactDetails"
                    :key="index"
                  >
                    <v-col cols="1">
                      <v-icon :icon="getIcon(contactDetail.type)"></v-icon>
                    </v-col>
                    <v-col cols="4">
                      <v-label>{{ capitalize(contactDetail.type) }} *</v-label>
                      <v-select
                        :items="['private', 'general']"
                        v-model="contactDetail.category"
                        variant="outlined"
                        density="compact"
                        center-affix
                        required
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-label></v-label>
                      <v-text-field
                        v-model="contactDetail.value"
                        :rules="getValidationRules(contactDetail.type)"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </v-col>
                    <v-col cols="1">
                      <v-btn
                        @click="removeContact(index)"
                        variant="text"
                        rounded="sm"
                        size="small"
                        color="error"
                        icon
                      >
                        <DeleteOutlined :style="{ fontSize: '16px' }" />
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card variant="outlined" class="mb-6">
                <v-card-item>
                  <template #subtitle>
                    <h5 class="text-lg font-normal text-black/100 !opacity-100 m-0">Address</h5>
                  </template>
                  <template #append>
                    <v-icon icon="mdi-dots-horizontal"></v-icon>
                  </template>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="mt-4">
                      <v-row>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Address Supplement</v-label>
                            <v-text-field
                              v-model="patient.address.addressSuplement"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Street</v-label>
                            <v-text-field
                              v-model="patient.address.street"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Street Number</v-label>
                            <v-text-field
                              v-model="patient.address.streetNumber"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Post Office</v-label>
                            <v-text-field
                              v-model="patient.address.postOffice"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>locality</v-label>
                            <v-combobox
                              :items="commonStore.cities"
                              item-title="name"
                              item-value="id"
                              v-model="city"
                              variant="outlined"
                              density="compact"
                              center-affix
                              required
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Canton</v-label>
                            <v-combobox
                              :items="commonStore.cantons"
                              item-title="name"
                              item-value="id"
                              v-model="canton"
                              variant="outlined"
                              density="compact"
                              center-affix
                              required
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Country</v-label>
                            <v-combobox
                              :items="commonStore.countries"
                              item-title="name"
                              item-value="id"
                              v-model="country"
                              variant="outlined"
                              density="compact"
                              center-affix
                              required
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card variant="outlined" class="mb-6">
                <v-card-item>
                  <template #subtitle>
                    <h5 class="text-lg font-normal text-black/100 !opacity-100 m-0">
                      Contact Owner
                    </h5>
                  </template>
                  <template #append>
                    <v-icon icon="mdi-dots-horizontal"></v-icon>
                  </template>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="mt-4">
                      <v-row>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>First Name</v-label>
                            <v-text-field
                              v-model="patient.contactOwner.firstName"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                          <div class="mb-2">
                            <v-label>Last Name</v-label>
                            <v-text-field
                              v-model="patient.contactOwner.lastName"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card variant="outlined" class="mb-6">
                <v-card-item>
                  <template #subtitle>
                    <h5 class="text-lg font-normal text-black/100 !opacity-100 m-0">
                      Administrative Instructions
                    </h5>
                  </template>
                  <template #append>
                    <v-icon icon="mdi-dots-horizontal"></v-icon>
                  </template>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="mt-4">
                      <v-row>
                        <v-col cols="12" class="py-0">
                          <div class="mb-2">
                            <v-label></v-label>
                            <v-textarea
                              no-resize
                              v-model="patient.administrativeMessage"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card variant="outlined" class="mb-6">
                <v-card-item>
                  <template #subtitle>
                    <h5 class="text-lg font-normal text-black/100 !opacity-100 m-0">Department</h5>
                  </template>
                  <template #append>
                    <v-icon icon="mdi-dots-horizontal"></v-icon>
                  </template>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="mt-4">
                      <v-row>
                        <v-col cols="12" class="py-0">
                          <div class="mb-2">
                            <v-label>Name</v-label>
                            <v-text-field
                              v-model="patient.department.name"
                              required
                              density="compact"
                              type="text"
                              variant="outlined"
                              center-affix
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!patient.id" variant="text" :ripple="false" color="error">Cancel</v-btn>
        <v-btn
          variant="tonal"
          :ripple="false"
          color="primary"
          :loading="store.loading"
          @click="createOrUpdate"
          >{{ patient.id ? 'Update' : 'Save' }}</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
  <!-- <pre>
    {{ patient }}
  </pre> -->
</template>
<script setup>
import useCommonStore from '@/stores/common'
import useUserStore from '@/stores/user'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { capitalize, onBeforeMount, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
const patient = ref({
  userRoles: [
    {
      refRole: {},
    },
  ],
  contactDetails: [],
  address: {
    addressSuplement: '',
    street: '',
    streetNumber: '',
    postOffice: '',
    locality: {},
    canton: {},
    country: {},
  },
  department: {},
  contactOwner: {},
})

const dob = ref(null)
const canton = ref('')
const city = ref('')
const country = ref('')
const route = useRoute()
const commonStore = useCommonStore()
const store = useUserStore()
const breadcrumbs = shallowRef([
  {
    title: 'Contacts',
    disabled: false,
    href: '/contacts',
  },
  {
    title: 'Patients',
    disabled: false,
    href: '/contacts/patients',
  },
  {
    title: 'Patients Details',
    disabled: true,
    href: route.fullPath,
  },
])

// Get icon based on the contact type
const getIcon = (type) => {
  switch (type) {
    case 'telephone':
    case 'phone':
      return 'mdi-phone'
    case 'fax':
      return 'mdi-fax'
    case 'email':
      return 'mdi-email'
    case 'url':
      return 'mdi-link'
    default:
      return 'mdi-help-circle'
  }
}

// Get mask based on the contact type
// const getMask = (type) => {
//   if (type === 'telephone' || type === 'phone' || type === 'fax') {
//     return '(###)-####-###' // Phone number format
//   }
//   return '' // No mask for Email and URL
// }

// Get validation rules based on the contact type
const getValidationRules = (type) => {
  if (type === 'email') {
    return [
      (value) => !!value || 'email is required.',
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email.',
    ]
  } else if (type === 'url') {
    return [
      (value) => !!value || 'URL is required.',
      (value) =>
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value) ||
        'Enter a valid URL.',
    ]
  } else if (type === 'telephone' || type === 'phone' || type === 'Fax') {
    return [
      (value) => !!value || 'Number is required.',
      (value) => value.length === 11 || 'Enter a valid phone number.',
    ]
  }
  return []
}

const addNewContact = (type) => {
  patient.value.contactDetails.push({
    type: type,
    value: '',
    category: 'general',
  })
}

const removeContact = (position) => {
  store.user.contactDetails.splice(position, 1)
}

onBeforeMount(async () => {
  await commonStore.fetchCantons()
  await commonStore.fetchCountries()
  await commonStore.fetchCities()
  if (route.params.id) {
    await store.fetchUserById(route.params.id)
    patient.value = store.user
    dob.value = store.user?.dateOfBirth ? new Date(store.user.dateOfBirth) : null
    canton.value = store.user?.address?.canton.name
    city.value = store.user?.address?.locality.name
    country.value = store.user?.address?.country.name
  }
})

const formRef = ref(null)
const isFormValid = ref(true)
const createOrUpdate = async () => {
  const { valid } = await formRef.value.validate()
  patient.value = {
    ...patient.value,
    dateOfBirth: dob.value,
    address: {
      ...patient.value.address,
      canton: canton.value,
      locality: city.value,
      country: country.value,
    },
  }
  if (valid) {
    await store.updateUser(patient.value.id, patient.value)
  }
}
</script>
<style scoped>
.v-card.v-card--variant-outlined {
  border-color: rgb(222 222 222);
}
</style>
