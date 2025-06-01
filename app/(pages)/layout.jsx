import React from 'react'
import Header from '@/app/(pages)/components/Header'

const layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default layout