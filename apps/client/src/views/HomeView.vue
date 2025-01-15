<script setup></script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <v-card>
      <v-card-item>
        <div class="flex flex-col items-center my-4">
          <v-avatar color="primary" size="90">
            <v-icon icon="mdi-account-circle" size="45"></v-icon>
          </v-avatar>
          <h3 class="mt-4 underline text-subtitle text-h6 underline-offset-8 text-primary">
            Contacts
          </h3>
          <v-list lines="none" class="w-full mt-8">
            <v-list-item
              @click="router.push('/contacts/patients')"
              title="Patient"
              append-icon="mdi-chevron-right"
            />
            <v-list-item title="All Contacts" append-icon="mdi-chevron-right" />
          </v-list>
        </div>
      </v-card-item>
    </v-card>
    <v-card>
      <v-card-item>
        <div class="flex flex-col items-center my-4">
          <v-avatar color="primary" size="90">
            <v-icon icon="mdi-invoice" size="45"></v-icon>
          </v-avatar>
          <h3 class="mt-4 underline text-subtitle text-h6 underline-offset-8 text-primary">
            Invoices
          </h3>
          <v-list lines="none" class="w-full mt-8">
            <v-list-item title="Open Services" append-icon="mdi-chevron-right" />
            <v-list-item title="Invoices to Send" append-icon="mdi-chevron-right" />
            <v-list-item title="Invoices" append-icon="mdi-chevron-right" />
          </v-list>
        </div>
      </v-card-item>
    </v-card>
    <v-card>
      <v-card-item>
        <div class="flex flex-col items-center my-4">
          <v-avatar color="primary" size="90">
            <v-icon icon="mdi-file-document" size="45"></v-icon>
          </v-avatar>
          <h3 class="mt-4 underline text-subtitle text-h6 underline-offset-8 text-primary">
            Documents
          </h3>
          <v-list lines="none" class="w-full mt-8">
            <v-list-item title="Documents" append-icon="mdi-chevron-right" />
          </v-list>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
