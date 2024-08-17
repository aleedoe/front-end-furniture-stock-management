import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state of the counter
interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

// Create a slice of the Redux store for the counter
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // Reducer to initialize the count
        initializeCount(state, action: PayloadAction<number>) {
            state.value = action.payload
        },
        // Example of another reducer that could increment the count
        increment(state) {
            state.value += 1
        },
        // Example of another reducer that could decrement the count
        decrement(state) {
            state.value -= 1
        },
    },
})

// Export the action created by the slice
export const { initializeCount, increment, decrement } = counterSlice.actions

// Export the reducer to be used in the store
export default counterSlice.reducer
