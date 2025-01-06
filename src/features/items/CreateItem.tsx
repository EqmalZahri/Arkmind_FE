import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createItemAsync, fetchItemsAsync } from './itemsSlice'
import { toast } from 'react-toastify'

const CreateItem: React.FC = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(createItemAsync({ name, description, price: parseFloat(price) })).unwrap()
      await dispatch(fetchItemsAsync())
      toast.success('Item added successfully!')
      setName('')
      setDescription('')
      setPrice('')
    } catch (error) {
      console.log(error)
      toast.error('Failed to add the item. Name and price are required fields !')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded shadow-md">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-1 md:col-span-3 border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-1 md:col-span-3 border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-1 md:col-span-3 border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <button type="submit" className="col-span-1 md:col-span-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow">
        <i className="fa fa-plus mr-2"></i>Add Item
      </button>
    </form>
  )
}

export default CreateItem
