import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchItems, createItem, updateItem, deleteItem } from './itemsAPI'

export interface Item {
  id: number
  name: string
  description?: string
  price: number
}

interface ItemsState {
  items: Item[];
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ItemsState = {
  items: [],
  status: 'idle',
}

export const fetchItemsAsync = createAsyncThunk('items/fetchItems', async () => {
  return await fetchItems()
})

export const createItemAsync = createAsyncThunk('items/createItem', async (item: Omit<Item, 'id'>) => {
  return await createItem(item)
})

export const updateItemAsync = createAsyncThunk('items/updateItem', async ({ id, item }: { id: number; item: Omit<Item, 'id'> }) => {
  return await updateItem(id, item)
})

export const deleteItemAsync = createAsyncThunk('items/deleteItem', async (id: number) => {
  await deleteItem(id)
  return id
})

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
  },
})

export default itemsSlice.reducer
