import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  loading: false,
  error: "",
};

const apiKey = process.env.API_KEY;

export const fetchMovies: any = createAsyncThunk(
  "fecthMovies",
  async (searchQuery: string) => {
    searchQuery = searchQuery ? searchQuery : "pokemon";
    const res = await axios.get(
      `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`
    );
    return res.data;
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
    builder.addCase(fetchMovies.rejected, (state, action) => {
      (state.loading = false), (state.error = "Error fecthing movies");
    });
  },
});

export default movieSlice.reducer;
