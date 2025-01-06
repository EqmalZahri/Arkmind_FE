import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchItemsAsync, deleteItemAsync } from './itemsSlice'
import { Item } from './itemsSlice'
import { toast } from 'react-toastify'

type ItemsListProps = {
    onEditItem: (item: Item) => void
  }

const ItemsList: React.FC<ItemsListProps> = ({ onEditItem }) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.items.items)

  useEffect(() => {
    dispatch(fetchItemsAsync())
  }, [dispatch])

  const handleDelete = async (id: number) => {
    const confirmDeletion = () =>
      new Promise<boolean>((resolve) => {
        const toastId = toast(
          <div className="text-center">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  toast.dismiss(toastId);
                  resolve(true);
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  toast.dismiss(toastId);
                  resolve(false);
                }}
              >
                No
              </button>
            </div>
          </div>,
          {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            toastId: 'confirm-toast',
          }
        )
      })
  
    const confirmed = await confirmDeletion();
  
    if (confirmed) {
      try {
        await dispatch(deleteItemAsync(id));
        toast.success('Item deleted successfully!')
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete the item. Please try again later!')
      }
    } else {
      toast.info('Item deletion cancelled!')
    }
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Item List</h2>
      <ul className="grid grid-cols-1 gap-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border rounded-lg shadow-md bg-white space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div className="flex-1">
              <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-sm text-gray-700 font-semibold mt-2">RM {item.price}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onEditItem(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
              >
                <i className="fa fa-pencil-square-o mr-2"></i>Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
              >
                <i className="fa fa-trash-o mr-2"></i>Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemsList
