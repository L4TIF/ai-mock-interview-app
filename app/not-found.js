"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const Page404 = () => {

    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Page not found</h1>
            <Button variant={'outline'} onClick={() => router.push('/dashboard')}>Go to
                Dashboard</Button>
        </div>
    )
}

export default Page404