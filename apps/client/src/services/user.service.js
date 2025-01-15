import axios from '@/plugins/axios'

// Create a user
export const createUser = (userData) => axios.postForm('/user', userData)

// Fetch all users
export const fetchUsers = () => axios.get('/user')

// Fetch doctors
export const fetchDoctors = () => axios.get('/user/doctors')

// Fetch patients
export const fetchPatients = () => axios.get('/user/patients')

// Fetch patients dropdown
export const fetchPatientsDropdown = () => axios.get('/user/patients-dropdown')

// Fetch doctors dropdown
export const fetchDoctorsDropdown = () => axios.get('/user/doctors-dropdown')

// Fetch clients
export const fetchClients = () => axios.get('/user/clients')

// Fetch familial relationships
export const fetchFamilialRelationships = () => axios.get('/user/familial-relationship')

// Fetch a single user by ID
export const fetchUserById = (userId) => axios.get(`/user/${userId}`)

// Update a user
export const updateUser = (userId, userData) => axios.patchForm(`/user/${userId}`, userData)

// Delete a user
export const deleteUser = (userId) => axios.delete(`/user/${userId}`)
