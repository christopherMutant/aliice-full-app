<template>
  <v-dialog
    persistent
    transition="slide-y-reverse-transition"
    v-model="modalState"
    max-width="750px"
    fullscreen
  >
    <app-card title="Create New Patient">
      <template #action>
        <v-btn
          @click="$emit('close')"
          :icon="CloseOutlined"
          variant="text"
          rounded
          size="sm"
          color="secondary"
        />
      </template>
      <v-form lazy-validation v-model="isFormValid" ref="formRef">
        <app-card title="Patient Information">
          <v-container>
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
                  <!-- <v-col cols="12" class="py-0">
                    <div class="mb-2">
                      <v-label>Patient Number</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.patientNumber"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col> -->
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Civility</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.civility"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>First Name</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.firstName"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Last Name</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.lastName"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Marital Status</v-label>
                      <v-select
                        :items="maritalStatus"
                        item-value="value"
                        item-title="name"
                        v-model="formValues.patientInformation.maritalStatus"
                        variant="outlined"
                        density="compact"
                        center-affix
                        required
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Language</v-label>
                      <v-select
                        :items="languages"
                        item-value="value"
                        item-title="name"
                        v-model="formValues.patientInformation.correspondenceLanguage"
                        variant="outlined"
                        density="compact"
                        center-affix
                        required
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Social Security Number</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.noAVS"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Gender</v-label>
                      <v-select
                        :items="gender"
                        item-value="value"
                        item-title="name"
                        v-model="formValues.patientInformation.gender"
                        variant="outlined"
                        density="compact"
                        center-affix
                        required
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Date of Birth</v-label>
                      <v-date-input
                        v-model="formValues.patientInformation.dateOfBirth"
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
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Specialist</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.specialist"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Profession</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.profession"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Academic Title</v-label>
                      <v-text-field
                        v-model="formValues.patientInformation.academicTitle"
                        required
                        density="compact"
                        type="text"
                        variant="outlined"
                        center-affix
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" lg="4" class="py-0">
                    <div class="mb-2">
                      <v-label>Communication</v-label>
                      <v-select
                        :items="communucationTypes"
                        item-value="value"
                        item-title="name"
                        v-model="formValues.communication"
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
          </v-container>
        </app-card>
        <app-card title="Individual Information" class="mt-6">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0">
                <div class="mb-2">
                  <v-label>Email</v-label>
                  <v-text-field
                    v-model="formValues.individualInformation.email"
                    required
                    density="compact"
                    type="text"
                    variant="outlined"
                    center-affix
                  />
                </div>
              </v-col>
              <v-col cols="12" class="py-0">
                <div class="mb-2">
                  <v-label>Doctor</v-label>
                  <v-text-field
                    v-model="formValues.individualInformation.doctor"
                    required
                    density="compact"
                    type="text"
                    variant="outlined"
                    center-affix
                  />
                </div>
              </v-col>
              <v-col cols="12" class="py-0">
                <div class="mb-2">
                  <v-label>VIP Surgery</v-label>
                  <v-text-field
                    v-model="formValues.individualInformation.vipSurgery"
                    required
                    density="compact"
                    type="text"
                    variant="outlined"
                    center-affix
                  />
                </div>
              </v-col>
              <v-col cols="12" class="py-0">
                <div class="mb-2">
                  <v-label>VIP Aesthetics</v-label>
                  <v-text-field
                    v-model="formValues.individualInformation.vipAethetic"
                    required
                    density="compact"
                    type="text"
                    variant="outlined"
                    center-affix
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </app-card>
        <app-card title="Contact Information" class="mt-6">
          <template #action>
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
          <v-container>
            <v-row
              align="center"
              justify="center"
              v-for="(contactDetail, index) in formValues.contactDetails"
              :key="index"
            >
              <v-col cols="1">
                <v-icon :icon="getIcon(contactDetail.type)"></v-icon>
              </v-col>
              <v-col cols="4">
                <v-label>{{ capitalize(contactDetail.type) }} *</v-label>
                <v-select
                  :items="contactCateogry"
                  item-value="value"
                  item-title="name"
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
          </v-container>
        </app-card>
        <app-card title="Address" class="mt-6">
          <v-container>
            <v-row>
              <v-col cols="12" md="6" class="py-0">
                <div class="mb-2">
                  <v-label>Address Supplement</v-label>
                  <v-text-field
                    v-model="formValues.address.addressSuplement"
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
                    v-model="formValues.address.street"
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
                    v-model="formValues.address.streetNumber"
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
                    v-model="formValues.address.postOffice"
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
                  <v-label>NPA</v-label>
                  <v-text-field
                    v-model="formValues.address.npa"
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
                  <v-label>Region</v-label>
                  <v-text-field
                    v-model="formValues.address.region"
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
                  <v-label>City</v-label>
                  <v-select
                    :items="cities"
                    item-title="name"
                    item-value="id"
                    v-model="formValues.address.locality"
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
                  <v-select
                    :items="cantons"
                    item-title="name"
                    item-value="id"
                    v-model="formValues.address.canton"
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
                  <v-select
                    :items="countries"
                    item-title="name"
                    item-value="id"
                    v-model="formValues.address.country"
                    variant="outlined"
                    density="compact"
                    center-affix
                    required
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </app-card>
        <app-card title="Administrative Message" class="mt-6">
          <v-col cols="12" class="py-0">
            <div class="mb-2">
              <v-switch
                v-model="formValues.administrativeMessage.openAdministrativeMessage"
                label="Open Administrative Message"
                color="primary"
                hide-details
                inset
                density="compact"
              ></v-switch>
            </div>
          </v-col>
          <v-col cols="12" class="py-0">
            <div class="mb-2">
              <v-label>Administrative Message</v-label>
              <v-textarea
                v-model="formValues.administrativeMessage.administrativeMessage"
                required
                density="compact"
                type="text"
                variant="outlined"
                center-affix
              ></v-textarea>
            </div>
          </v-col>
        </app-card>
        <app-card title="Contact Owner">
          <v-col cols="12" class="py-0">
            <div class="mb-2">
              <v-label>Contact Owner</v-label>
              <v-select
                :items="contactOwners"
                item-title="firstName"
                item-value="id"
                v-model="formValues.contactOwner"
                variant="outlined"
                density="compact"
                center-affix
                required
              />
            </div>
          </v-col>
        </app-card>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" :ripple="false" color="error" @click="$('close')">Cancel</v-btn>
        <v-btn variant="tonal" :ripple="false" color="primary" :loading="isSubmit" @click="create"
          >Save</v-btn
        >
      </v-card-actions>
    </app-card>
  </v-dialog>
</template>
<script setup>
import { capitalize, computed, reactive, ref } from 'vue'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  dialogState: {
    type: Boolean,
    required: true,
  },
  isSubmit: {
    type: Boolean,
    required: true,
  },
  cities: {
    type: Array,
    required: true,
  },
  countries: {
    type: Array,
    required: true,
  },
  cantons: {
    type: Array,
    required: true,
  },
  contactOwners: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['close', 'save'])
const isFormValid = ref(true)
const formRef = ref(null)
const maritalStatus = [
  { value: 'single', name: 'Single' },
  { value: 'married', name: 'Married' },
  { value: 'indefinite', name: 'Indefinite' },
  { value: 'divorced', name: 'Divorced' },
  { value: 'widowed', name: 'Widowed' },
]
const languages = [
  { value: 'french', name: 'French' },
  { value: 'german', name: 'German' },
  { value: 'italian', name: 'Italian' },
  { value: 'english', name: 'English' },
]
const gender = [
  { value: 'male', name: 'Male' },
  { value: 'female', name: 'Female' },
  { value: 'other', name: 'Other' },
]
const contactCateogry = [
  { value: 'private', name: 'Private' },
  { value: 'general', name: 'General' },
]
const communucationTypes = [
  { value: 'letter', name: 'Letter' },
  { value: 'email', name: 'Email' },
  { value: 'as present', name: 'As present' },
]
const formValues = reactive({
  patientInformation: {
    firstName: '',
    lastName: '',
    photo: null,
    isManualPatientNumber: false,
    civility: '',
    noAVS: '',
    dateOfBirth: null,
    gender: 'male',
    departmentId: null,
    password: 'password',
    specialist: '',
    profession: '',
    academicTitle: '',
    maritalStatus: '',
    correspondenceLanguage: '',
    contactCategory: '',
    favorite: false,
    comment: '',
  },
  address: {
    addressSuplement: '',
    street: '',
    streetNumber: '',
    postOffice: '',
    npa: '',
    locality: '',
    canton: '',
    region: '',
    country: '',
  },
  contactDetails: [
    {
      type: 'phone',
      category: 'general',
      value: '',
    },
  ],
  administrativeMessage: {
    administrativeMessage: '',
    openAdministrativeMessage: true,
  },
  individualInformation: {
    email: '',
    doctor: '',
    vipSurgery: '',
    vipAethetic: '',
  },
  communication: '',
  contactOwner: '',
})

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
  formValues.contactDetails.push({
    type: type,
    value: '',
    category: 'general',
  })
}
const removeContact = (position) => {
  if (formValues.contactDetails.length > 1) {
    formValues.contactDetails.splice(position, 1)
  }
}

const create = async () => {
  const { valid } = await formRef.value.validate()

  if (valid) {
    emit('save', formValues)
  }
}

const modalState = computed(() => props.dialogState)
</script>
