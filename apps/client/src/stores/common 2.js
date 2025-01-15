import { defineStore } from 'pinia'
import * as commonServices from '@/services/common.service'
import { ref } from 'vue'
const useCommonStore = defineStore('common', () => {
  const countries = ref([])
  const cantons = ref([])
  const cities = ref([])
  const fetchCities = async () => {
    try {
      await commonServices.fetchCities().then((response) => {
        const { status, data } = response
        if (status === 200) {
          cities.value = data.data
          // localStorage.setItem('cities', JSON.stringify(cities))
        }
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }

  const fetchCityById = async (userId) => {
    try {
      await commonServices.fetchCityById(userId).then((response) => {
        console.log(response)
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }

  const fetchCantons = async () => {
    try {
      await commonServices.fetchCantons().then((response) => {
        const { status, data } = response
        if (status === 200) {
          cantons.value = data.data
        }
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }

  const fetchCantonById = async (userId) => {
    try {
      await commonServices.fetchCantonById(userId).then((response) => {
        console.log(response)
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }

  const fetchCountries = async () => {
    try {
      await commonServices.fetchCountries().then((response) => {
        const { status, data } = response
        if (status === 200) {
          countries.value = data.data
        }
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }

  const fetchCountryById = async (userId) => {
    try {
      await commonServices.fetchCountryById(userId).then((response) => {
        console.log(response)
      })
    } catch (err) {
      console.error('Error: ', err)
      throw new Error(err)
    }
  }

  return {
    fetchCities,
    fetchCityById,
    fetchCantons,
    fetchCantonById,
    fetchCountries,
    fetchCountryById,
    countries,
    cantons,
    cities,
  }
})

export default useCommonStore
