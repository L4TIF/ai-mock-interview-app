"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Header = () => {
    const path = usePathname()
    return (
        <div className='flex bg-secondary shadow-sm items-center justify-between p-4 '>


            <Image src={'/logo.svg'} priority width={80} height={100} alt='logo' />

            <ul className='hidden md:flex gap-6 '>
                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/dashboard' && 'text-primary font-bold'}
                    `}>Dashboard</li>
                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/questions' && `text-primary`}
                    `}>Questions</li>
                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/upgrade' && `text-primary`}
                    `}>Upgrade</li>
                <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                    ${path === '/how-it-works' && `text-primary`}
                    `}>How it Works?</li>
            </ul>
            <div className='scale-150'>
                <UserButton />
            </div>
        </div>
    )
}

export default Header