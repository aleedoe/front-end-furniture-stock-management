"use client"

import React from 'react'
import Cookies from 'js-cookie'


const homePage = () => {
    const data = Cookies.get('data')
    console.log('ini datanaya' + data);
    return (
        <div>homePage administrator</div>
    )
}

export default homePage