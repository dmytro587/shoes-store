import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'

import { delay } from '../../utils'
import { autoLogin } from './auth'

export const initializeApp = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
   'app/initializeApp',
   async (_, { dispatch, rejectWithValue }) => {
      await delay()

      return Promise.all([
         dispatch(autoLogin())
      ])
         .then(async () => await delay(200)) // TODO: зачем тут вторая задержка? посмотреть, может убрать её вообще если она не нужна
         .catch(rejectWithValue)
   }
)

// slice
interface GlobalError {
   message: string
}

const initialState = {
   isInitialized: false    as boolean,
   error: null             as GlobalError | null // TODO: уточинть тип
}

const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setGlobalError: (state, action: PayloadAction<GlobalError>) => {
         state.error = action.payload
      }
   },
   extraReducers: builder => {
      builder
         .addCase(initializeApp.fulfilled, (state, action) => {
            state.isInitialized = true
         })
         .addCase(initializeApp.rejected, (state, action) => {
            state.isInitialized = false
         })
   }
})

export const { setGlobalError } = appSlice.actions

export const selectIsInitialized = (state: RootState) => state.app.isInitialized
export const selectGlobalError = (state: RootState) => state.app.error

export default appSlice.reducer

