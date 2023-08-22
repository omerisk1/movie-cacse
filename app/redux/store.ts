import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './features/movie-slice'


export const store = configureStore({
  reducer: {
    movies: movieSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch