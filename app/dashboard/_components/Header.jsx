"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
const Header = () => {
    const path = usePathname()
    const router = useRouter()
    return (
        <div className='flex bg-secondary shadow-sm items-center justify-between p-4 sticky top-0 z-50'>

            <Image src={'/logo.svg'} priority width={80} height={100} alt='logo' onClick={() => router.push('/dashboard')} />
            {/* Desktop Navbar */}
            <ul className='hidden md:flex gap-6 '>
                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/dashboard' && 'text-primary font-bold'}
                    `} onClick={() => router.push('/dashboard')}
                >Dashboard</li>

                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/questions' && `text-primary`}
                    `} onClick={() => router.push('/questions')}
                >Questions</li>

                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/upgrade' && `text-primary`}
                    `} onClick={() => router.push('/upgrade')}
                >Upgrade</li>

                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/how-it-works' && `text-primary`}
                    `} onClick={() => router.push('/how-it-works')}
                >How it Works?</li>

            </ul>
            <div className='scale-150'>
                <UserButton />
            </div>
        </div>
    )
}

export default Header