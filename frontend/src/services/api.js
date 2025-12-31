import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export const uploadImage = async (formData) => {
    return api.post('/analysis/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default api;
