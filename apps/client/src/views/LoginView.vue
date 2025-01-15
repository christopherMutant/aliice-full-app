<template>
  <AuthLayout>
    <v-row justify="center" no-gutters class="relative bg-[#2570C1]">
      <v-col cols="12" lg="12" class="flex items-center">
        <v-container>
          <div class="flex items-center justify-center min-h-[calc(-148px_+_100vh)]">
            <v-row justify="center">
              <v-col cols="12" md="12">
                <v-card
                  class="max-w-[475px] my-0 mx-auto"
                  density="default"
                  elevation="2"
                  rounded="lg"
                >
                  <v-card
                    class="max-w-[475px] my-0 mx-auto"
                    density="default"
                    elevation="24"
                    rounded="lg"
                  >
                    <v-card-text class="!p-6 sm:!p-10">
                      <div>
                        <v-img
                          :src="Logo"
                          alt="Aliice Medicine"
                          class="w-[118px] h-[35px] object-cover mx-auto"
                        />
                      </div>
                      <div class="flex items-center justify-between mt-10">
                        <h3 class="mb-0 text-2xl font-semibold text-center">Login</h3>
                        <a href="#" class="no-underline text-[#2570C1]">Don't have an account?</a>
                      </div>
                      <v-form v-model="isFormValid" ref="formRef" lazy-validation class="mt-7">
                        <div class="mb-2">
                          <v-label>Email Address</v-label>
                          <v-text-field
                            v-model="formValues.email"
                            :rules="emailRules"
                            required
                            density="compact"
                            type="text"
                            variant="outlined"
                            center-affix
                          />
                        </div>
                        <div>
                          <v-label>Password</v-label>
                          <v-text-field
                            v-model="formValues.password"
                            :rules="passwordRules"
                            autocomplete="current-password"
                            required
                            density="compact"
                            variant="outlined"
                            center-affix
                            :append-inner-icon="togglePassword ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="togglePassword ? 'text' : 'password'"
                            @click:append-inner="togglePassword = !togglePassword"
                          />
                        </div>
                        <v-btn
                          block
                          size="large"
                          class="mt-5"
                          variant="flat"
                          color="primary"
                          :ripple="false"
                          :loading="store.isSubmit"
                          @click="login"
                        >
                          Login
                        </v-btn>
                        <v-expand-transition>
                          <div class="mt-2" v-show="Object.keys(store.errors).length > 0">
                            <v-alert
                              type="error"
                              variant="tonal"
                              color="rgb(255,77,79)"
                              :title="store.errors?.error"
                              :text="store.errors?.message"
                            />
                          </div>
                        </v-expand-transition>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </AuthLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import useAuthStore from '@/stores/auth.js'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Logo from '@/assets/logo.png'
const store = useAuthStore()
const formValues = reactive({
  email: '',
  password: '',
})
const formRef = ref(null)
const isFormValid = ref(true)
const togglePassword = ref(false)

const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) => /^[^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(v) || 'E-mail must be valid',
]

const passwordRules = [(v) => !!v || 'Password is required']

const login = async () => {
  const { valid } = await formRef.value.validate()
  console.log(valid)
  if (valid) {
    await store.login({ ...formValues })
  }
}
</script>
<style scoped>
.v-input :deep(.v-input__details) {
  padding-inline: 0.25rem;
}
</style>
