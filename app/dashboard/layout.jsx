import React from 'react'
import Header from './_components/Header'
const DashboardLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    )
}

export default DashboardLayout      