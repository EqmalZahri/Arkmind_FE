import React, { useState } from 'react'
import './App.css'
import ItemsList from './features/items/ItemsList'
import CreateItem from './features/items/CreateItem'
import EditItem from './features/items/EditItem'
import { ToastContainer } from 'react-toastify'
import 'font-awesome/css/font-awesome.min.css'

const App = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const handleEditItem = (item) => {
    setEditingItem(item)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-black-600 mb-8">Items Management</h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
        {isEditing ? (
          <EditItem item={editingItem} onCancel={handleCancelEdit} />
        ) : (
          <CreateItem />
        )}
        <ItemsList onEditItem={handleEditItem} />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
