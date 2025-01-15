<template>
  <v-dialog
    persistent
    transition="slide-x-reverse-transition"
    v-model="modalState"
    max-width="750px"
  >
    <v-card>
      <!-- Background section -->
      <div class="relative py-24 bg-primary">
        <v-icon @click="$emit('close')" class="!absolute top-5 right-5" icon="mdi-close"></v-icon>
      </div>

      <!-- Profile Section -->
      <div class="profile-content">
        <v-avatar class="profile-avatar" size="150">
          <v-img
            :src="'https://api.dicebear.com/9.x/personas/svg'"
            color="info"
            alt="Profile Image"
          />
        </v-avatar>

        <div class="text-center profile-info">
          <v-btn color="primary" :ripple="false" @click="viewUser" :loading="loading"
            >View full details</v-btn
          >
        </div>
      </div>
      <v-card-text>
        <!-- Bio Section -->
        <v-row>
          <v-col cols="12" md="6">
            <h4 class="mt-8 text-h4">Personal Details</h4>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Civility: </span>
              <span class="text-medium-emphasis">{{ user.civility }}</span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">First Name: </span>
              <span class="text-medium-emphasis">{{ capitalize(user.firstName) }}</span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Last Name: </span>
              <span class="text-medium-emphasis">{{ capitalize(user.lastName) }}</span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Marital Status: </span>
              <span class="text-medium-emphasis">{{ user.maritalStatus ?? 'Not Available' }}</span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Gender: </span>
              <span class="text-medium-emphasis">{{ capitalize(user.gender) }}</span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Date of Birth: </span>
              <span class="text-medium-emphasis">
                {{ useDate().format(user.dateOfBirth, 'fullDate') }}
              </span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Age: </span>
              <span class="text-medium-emphasis">{{ helper.calculateAge(user.dateOfBirth) }}</span>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h4 class="mt-8 text-h4">Contact Details</h4>
            <v-list
              variant="text"
              density="compact"
              lines="one"
              rounded="0"
              class="px-0 py-0"
              v-if="user.contactDetails !== null && user.contactDetails.length > 0"
            >
              <v-list-item
                v-for="(contact, index) in user.contactDetails"
                :key="index"
                density="comfortable"
                variant="text"
                rounded="0"
                lines="0"
                :prepend-icon="getIcon(contact.type)"
              >
                {{ contact.value }}
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h4 class="mt-8 text-h4">Address</h4>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Street: </span>
              <span class="text-medium-emphasis">
                {{ user.address?.street }} {{ user.address?.streetNumber }}
              </span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Address Supplement: </span>
              <span class="text-medium-emphasis">
                {{ user.address?.addressSuplement }}
              </span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Post Office: </span>
              <span class="text-medium-emphasis">
                {{ user.address?.postOffice }}
              </span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Postal Code (NPA): </span>
              <span class="text-medium-emphasis">
                {{ user.address?.npa }}
              </span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Locality: </span>
              <span class="text-medium-emphasis">
                {{ user.address?.locality.name }}
              </span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Canton: </span>
              <span class="text-medium-emphasis">
                {{ user.address?.canton.name }} ({{ user.address?.canton.shortName }})
              </span>
            </div>
            <div class="mt-3 mb-2 text-subtitle-1">
              <span class="font-semibold me-2">Country: </span>
              <span class="text-medium-emphasis">
                {{ user.address?.country.name }} ({{ user.address?.country.shortName }})
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { capitalize, computed, ref } from 'vue'
import { useDate } from 'vuetify/lib/framework.mjs'
import helper from '@/utils/helper'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user'
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons-vue'
const store = useUserStore()
const router = useRouter()
const props = defineProps({
  dialogState: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
})

const loading = ref(false)
const viewUser = async () => {
  loading.value = true
  await store.fetchUserById(props.user.id)
  loading.value = false
  router.push(`/contacts/patients/${props.user.id}`)
}

const getIcon = (type) => {
  const icons = {
    phone: PhoneOutlined,
    email: MailOutlined,
    address: EnvironmentOutlined,
  }
  return icons[type] || 'mdi-information'
}

defineEmits(['close'])

const modalState = computed(() => props.dialogState)
</script>

<style scoped>
.v-card {
  scrollbar-width: none;
}
.v-card :deep(.v-card-item) {
  background: none;
}
.v-card :deep(.v-card-text) {
  padding: 0;
}
.profile-banner {
  position: relative;
  height: 250px;
}
.profile-banner-img {
  width: 100%;
  height: 100%;
}

.profile-content {
  position: relative;
  margin-top: -75px;
  text-align: center;
}

.profile-avatar {
  position: relative;
  margin: 0 auto;
}

.camera-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
}

.profile-info {
  margin-top: 10px;
}

.name {
  margin: 0;
  font-weight: bold;
}

.role {
  margin: 0;
  color: gray;
}
</style>
