import axios from '@/plugins/axios'

// City Service
export const updateCityRelations = (cityId, data) =>
  axios.post(`/city/update_city_relations`, { cityId, ...data })

export const fetchCities = () => axios.get('/city')

export const fetchCityById = (cityId) => axios.get(`/city/${cityId}`)

// Country Service
export const fetchCountries = () => axios.get('/country')

export const fetchCountryById = (countryId) => axios.get(`/country/${countryId}`)

// Cantos Service
export const fetchCantons = () => axios.get('/canton')

export const fetchCantonById = (cantonId) => axios.get(`/canton/${cantonId}`)
