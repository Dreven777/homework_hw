import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products/`);
  return response.data;
};

export const createProduct = async (product: { name: string, description: string, price: number }) => {
  const response = await axios.post(`${API_URL}/product`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await axios.delete(`${API_URL}/product/${id}`);
};

export const updateProduct = async (id: string, product: { name: string, description: string, price: number }) => {
  const response = await axios.put(`${API_URL}/product/${id}`, product);
  console.log('Response from server:', response.data); 
  return response.data;
};
