import axios from 'axios'
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';
const api = axios.create({
    baseURL: 'http://localhost:8082/api/orders',
})
const baseURL = 'http://localhost:8082/api/orders';

export const insertOrder = payload => axios.post(baseURL + "/", payload, {headers: authHeader()});
export const getAllOrders = () => api.get(`/`);
export const getAllOrdersForAdmin = () => api.get(`/admin`);
export const updateOrderById = (id, payload) => api.put(`/order/${id}`, payload)
export const deleteOrderById = id => api.delete(`/${id}`)
export const getOrderById = id => api.get(`/${id}`)
export const getOrdersbyPerson = name => api.get(`/person/?orderMadeBy=${name}`);
export const getSubmissions1 = mil => api.get(`/submission1/?milestone=${mil}`);
export const getSubmissions2 = mil => api.get(`/submission2/?milestone=${mil}`);
export const getSubmissions3 = mil => api.get(`/submission3/?milestone=${mil}`);
export const getFinishedOrders = statu => api.get(`/status/?orderStatus=${statu}`);


const apis = {
    insertOrder,
    getAllOrders,
    updateOrderById,
    deleteOrderById,
    getOrderById,
    getOrdersbyPerson,
    getFinishedOrders,
    getSubmissions1,
    getSubmissions2,
    getSubmissions3,
    getAllOrdersForAdmin,
}

export default apis

