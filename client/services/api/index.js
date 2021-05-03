import apiClient from './apiClient'

export const getCurrencies = () => apiClient.get('/currencies')

export const donate = (data) => apiClient.post('/donate', data)
