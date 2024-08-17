import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counterSlice'
import internalUserReducer from '@/features/internalUser/internalUserSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            internalUser: internalUserReducer,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']