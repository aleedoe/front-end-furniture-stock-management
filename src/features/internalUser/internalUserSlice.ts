import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the shape of the data
interface AccessRights {
    id: number
    name: string
}

interface UserData {
    id: number
    name: string
    phone: number
    email: string
    password: string
    access_rights: AccessRights
}

interface Tokens {
    refresh: string
    access: string
}

interface UserState {
    data: UserData[]
    tokens: Tokens[]
}

const initialState: UserState = {
    data: [],
    tokens: [],
}

// Create a slice of the Redux store for user data
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer to save user data
        saveUserData(state, action: PayloadAction<UserData>) {
            state.data.push(action.payload)
        },
        // Reducer to save tokens
        saveTokens(state, action: PayloadAction<Tokens>) {
            state.tokens.push(action.payload)
        },
        // Optional: Clear all user data and tokens
        clearUserData(state) {
            state.data = []
            state.tokens = []
        },
    },
})

// Export the actions created by the slice
export const { saveUserData, saveTokens, clearUserData } = userSlice.actions

// Export the reducer to be used in the store
export default userSlice.reducer
