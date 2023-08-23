import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { searchParam } from "@/utils/types";

const initialState = {
  data: {},
  loading: false,
  error: "",
};

const apiKey = process.env.API_KEY;

export const fetchMovies: any = createAsyncThunk(
  "fecthMovies",
  async (searchQuery: searchParam) => {
    const searchTerm = searchQuery.search ? searchQuery.search : "Pokemon";
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?type=${searchQuery.type}&y=${searchQuery.year}&s=${searchTerm}&page=${searchQuery.page}&apikey=${apiKey}`
      );
      return res.data;
    } catch (error) {
      throw new Error("Error fecthing movies");
    }
  }
);
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMovies.pending, (state) => {
      (state.loading = true), (state.error = "");
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      (state.loading = false),
        (state.data = action.payload),
        (state.error = "");
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      (state.loading = false), (state.error = "Error fecthing movies");
    });
  },
});

export default movieSlice.reducer;
