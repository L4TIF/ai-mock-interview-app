'use client'
import React from 'react'

const ClientOnly = ({ children }) => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return children
}

export default ClientOnly