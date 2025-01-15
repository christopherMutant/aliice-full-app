import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as userService from '@/services/user.service'
const useUserStore = defineStore('user', () => {
  const patients = ref([])
  const user = ref({})
  const users = ref([])
  const loading = ref(false)
  const fetchUsers = async () => {
    try {
      await userService.fetchUsers().then((response) => {
        const { data } = response.data
        users.value = data
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }
  const fetchPatients = async () => {
    try {
      await userService.fetchPatients().then((response) => {
        const { data } = response.data
        console.log(data)
        patients.value = data
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }
  const fetchUserById = async (userId) => {
    try {
      await userService.fetchUserById(userId).then((response) => {
        user.value = response.data.user
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }
  const createUser = async (userData) => {
    console.log(userData)
    loading.value = true
    try {
      await userService.createUser(userData).then((response) => {
        user.value = response.data.user
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    } finally {
      loading.value = false
    }
  }
  const updateUser = async (userId, userData) => {
    loading.value = true
    try {
      await userService.updateUser(userId, userData).then((response) => {
        user.value = response.data.user
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    user,
    users,
    patients,
    fetchPatients,
    fetchUserById,
    fetchUsers,
    createUser,
    updateUser,
  }
})

export default useUserStore
