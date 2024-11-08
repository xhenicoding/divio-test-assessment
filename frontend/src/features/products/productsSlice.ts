import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  selected: boolean;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

// Async thunk for fetching products based on search query and sort order
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ query, sort }: { query: string; sort: string }) => {
    const response = await axios.get(`/api/products`, {
      params: {
        q: query,
        sort: sort,
      },
    });
    return response.data;
  }
);

// Select a product by toggling its selected status
export const selectProduct = createAsyncThunk(
  "products/selectProduct",
  async (id: number) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `/api/products/${id}/select/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { id, selected: response.data.selected };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(selectProduct.fulfilled, (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.selected = action.payload.selected;
      }
    });
  },
});

export default productsSlice.reducer;
