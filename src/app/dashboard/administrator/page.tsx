"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
// import { RootState } from '../store'; // Pastikan path ke file store kamu benar

const HomePage = () => {
    // Ambil data user dan tokens dari Redux state
    const userData = useSelector((state: RootState) => state.authUser.data);
    const tokens = useSelector((state: RootState) => state.authUser.tokens);

    return (
        <div>
            <h1>Home Page Administrator</h1>

            {/* Pastikan ada data sebelum ditampilkan */}
            {userData.length > 0 && (
                <div>
                    <h2>User Info</h2>
                    <p><strong>ID:</strong> {userData[0].id}</p>
                    <p><strong>Name:</strong> {userData[0].name}</p>
                    <p><strong>Phone:</strong> {userData[0].phone}</p>
                    <p><strong>Email:</strong> {userData[0].email}</p>
                    <p><strong>Access Rights:</strong> {userData[0].access_rights.name}</p>
                </div>
            )}

            {tokens.length > 0 && (
                <div>
                    <h2>Tokens</h2>
                    <p><strong>Access Token:</strong> {tokens[0].access}</p>
                    <p><strong>Refresh Token:</strong> {tokens[0].refresh}</p>
                </div>
            )}
        </div>
    );
}

export default HomePage;
