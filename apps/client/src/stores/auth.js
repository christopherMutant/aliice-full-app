import { defineStore } from 'pinia'
import * as authService from '@/services/auth.service'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCommonStore from '@/stores/common'
const useAuthStore = defineStore('auth', () => {
  const { fetchCities } = useCommonStore()
  const isSubmit = ref(false)
  const errors = ref({})
  const router = useRouter()
  const login = async (payload) => {
    errors.value = {}
    isSubmit.value = true
    try {
      await authService.login(payload).then(async (response) => {
        const { status, data } = response
        if (status === 201) {
          const { accessToken, user } = data
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', accessToken)
          await fetchCities()
          router.push('/dashboard')
        }
      })
    } catch (err) {
      console.log('Error: ', err)
      errors.value = { ...err.response.data }
      throw new Error(err)
    } finally {
      isSubmit.value = false
    }
  }
  const logout = async () => {
    try {
      await authService.logout().then(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.push('/login')
      })
    } catch (err) {
      console.log('Error:', err)
      throw new Error(err)
    }
  }
  return { login, logout, isSubmit, errors }
})

export default useAuthStore
