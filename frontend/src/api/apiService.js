import axios from 'axios';
import store from '../store';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Mengizinkan penggunaan cookie dengan CORS
});

// Tambahkan interceptor untuk menyertakan token dalam setiap permintaan
apiClient.interceptors.request.use(config => {
  const token = store.getters.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  async login(payload) {
    const response = await apiClient.post('/users/login', payload);
    return response.data;
  },
  async register(payload) {
    const response = await apiClient.post('/users/register', payload);
    return response.data;
  },
  async logout() {
    const response = await apiClient.delete('/users/logout');
    return response.data;
  },
  getUser() {
    return apiClient.get('/users/me');
  },
  getUserById(userId) {
    return apiClient.get(`/users/${userId}`);
  },

async addToFavorites(recipeId) {
  const response = await apiClient.post(`/favorites`, { recipeId });
  return response.data;
},
async addToGroceries(recipeId) {
  const response = await apiClient.post(`/groceries`, { recipeId });
  return response.data;
},
async deleteGrocery(id) {
  const response = await apiClient.delete(`/groceries/${id}`);
  return response.data;
},
  getRecipes() {
    return apiClient.get('/recipes');
  },
  getRecipeById(id) {
    return apiClient.get(`/recipes/${id}`);
  },
  getGroceries() {
    return apiClient.get('/groceries');
  },
};
