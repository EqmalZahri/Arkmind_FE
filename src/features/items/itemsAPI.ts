import axios from 'axios'

const API_URL = 'http://localhost:3000/api/items'

export const fetchItems = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const createItem = async (item: { name: string; description?: string; price: number }) => {
  const response = await axios.post(API_URL, item)
  return response.data
}

export const updateItem = async (id: number, item: { name: string; description?: string; price: number }) => {
  const response = await axios.put(`${API_URL}/${id}`, item)
  return response.data
}

export const deleteItem = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`)
}
