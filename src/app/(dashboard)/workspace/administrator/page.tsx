"use client"

import { Button } from '@/components/ui/button'
import { decrement, increment } from '@/features/counter/counterSlice'
import { RootState } from '@/lib/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
    const dispatch = useDispatch()

    // Access count from the counter slice
    const count = useSelector((state: RootState) => state.counter.value)

    // Access user data and tokens from the user slice
    const userData = useSelector((state: RootState) => state.internalUser.data)
    console.log("userData", userData);
    
    const userTokens = useSelector((state: RootState) => state.internalUser.tokens)

    return (
        <div>
            <h1>Home Page Administrator</h1>
            <p>Current Count: {count}</p>
            <Button onClick={() => dispatch(increment())}>Increment</Button>
            <Button onClick={() => dispatch(decrement())}>Decrement</Button>

            <h2>User Data</h2>
            {userData.length > 0 ? (
                userData.map((user, index) => (
                    <div key={index}>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <p>Access Rights: {user.access_rights.name}</p>
                    </div>
                ))
            ) : (
                <p>No user data available.</p>
            )}

            <h2>User Tokens</h2>
            {userTokens.length > 0 ? (
                userTokens.map((token, index) => (
                    <div key={index}>
                        <p>Refresh Token: {token.refresh}</p>
                        <p>Access Token: {token.access}</p>
                    </div>
                ))
            ) : (
                <p>No tokens available.</p>
            )}
        </div>
    )
}

export default HomePage
