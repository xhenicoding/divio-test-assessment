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
  query: string;
}

const initialState: ProductsState = {
  items: [],
  query: localStorage.getItem("query") || "",
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
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      localStorage.setItem("query", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    });
    builder.addCase(selectProduct.fulfilled, (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.selected = action.payload.selected;
        localStorage.setItem("products", JSON.stringify(state.items));
      }
    });
  },
});

export const { setQuery } = productsSlice.actions;
export default productsSlice.reducer;
