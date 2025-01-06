import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { updateItemAsync, fetchItemsAsync } from './itemsSlice'
import { toast } from 'react-toastify'

const EditItem = ({ item, onCancel }) => {
  const [name, setName] = useState(item?.name || '')
  const [description, setDescription] = useState(item?.description || '')
  const [price, setPrice] = useState(item?.price || '')

  const dispatch = useAppDispatch()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !price || isNaN(parseFloat(price))) {
      toast.error('Name and Price are required fields. Please fill them in.')
      return
    }
    
    try {
      await dispatch(updateItemAsync({ id: item.id, item: { name, description, price: parseFloat(price) } }))
      await dispatch(fetchItemsAsync())
      toast.success('Item updated successfully!')

      onCancel()
    } catch (error) {
      console.log(error)
      toast.error('Failed to update the item. Please try again later !')
    }
  }

  return (
    <form className="bg-white p-4 shadow-md rounded" onSubmit={handleUpdate}>
      <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
       <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          <i className="fa fa-pencil-square-o mr-2"></i>Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          <i className="fa fa-times mr-2"></i>Cancel
        </button>
      </div>
    </form>
  )
}

export default EditItem
