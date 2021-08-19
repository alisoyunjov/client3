import axios from 'axios'
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';

const api = axios.create({
    baseURL: 'http://localhost:8082/api/vendors/',
})


export const createVendor = payload => api.post(`/MakeVendor`, payload)
export const getAllVendors = () => api.get(`/allVendors`)
export const deleteVendorById = id => api.delete(`/vendor/${id}`)



const apis = {
    createVendor,
    getAllVendors,
    deleteVendorById
}

export default apis