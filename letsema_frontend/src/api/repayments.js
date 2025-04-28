import axios from 'axios'

// derive the API host from the current subdomain, but point to port 8000
const { protocol, hostname } = window.location
const API_BASE = `${protocol}//${hostname}:8000/api/` // Updated to point to the loans API
console.log('API_BASE', API_BASE)
const api = axios.create({
  baseURL: API_BASE,
})

// auto-attach JWT if we’ve got one
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
