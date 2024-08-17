"use client"

import StoreProvider from '@/app/StoreProvider'
import { Button } from '@/components/ui/button'
import { decrement, increment, initializeCount } from '@/features/counter/counterSlice'
import { RootState } from '@/lib/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
    const dispatch = useDispatch()
    const count = useSelector((state: RootState) => state.counter.value)

    return (
        <div>
            <h1>Home Page Administrator</h1>
            <p>Current Count: {count}</p>
            <Button onClick={() => dispatch(increment())}>Increment</Button>
            <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        </div>
    )
}

const HomePageWithProvider = () => (
    <StoreProvider count={0}>
        <HomePage />
    </StoreProvider>
)

export default HomePageWithProvider
