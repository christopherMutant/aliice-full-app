import axios from '@/plugins/axios'
// Sign up
export const signUp = (userData) => axios.post('/auth/signup', userData)

// Login
export const login = ({ email, password }) => axios.post('/auth/login', { email, password })

// Resend verification code
export const resendCode = () => axios.get('/auth/resend-code')

// Forgot password
export const forgotPassword = (email) => axios.post('/auth/forgot-password', { email })

// Reset password
export const resetPassword = (data) => axios.post('/auth/reset-password', data)

// Refresh token
export const refreshToken = () => axios.post('/auth/refresh')

// Logout
export const logout = () => axios.delete('/auth/logout')
