import rootReducer from './slices'
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'

const store = configureStore({
   reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkFn<R = void> = ThunkAction<R, RootState, unknown, AnyAction>

export default store