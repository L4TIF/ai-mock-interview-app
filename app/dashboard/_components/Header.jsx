"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
    const path = usePathname()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className='flex flex-col bg-secondary shadow-sm sticky top-0 z-50'>
            <div className='flex items-center justify-between p-4'>
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                    <Image
                        src={'/logo.svg'}
                        style={{ height: 'auto', width: 'auto' }}
                        priority
                        width={80}
                        height={100}
                        alt='logo'
                        onClick={() => router.push('/dashboard')}
                    />
                </div>

                {/* Desktop Navbar */}
                <ul className='hidden md:flex gap-6'>
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

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className='md:hidden border-t'>
                    <ul className='flex flex-col p-4 space-y-4'>
                        <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                            ${path === '/dashboard' && 'text-primary font-bold'}
                            `} onClick={() => {
                                router.push('/dashboard')
                                setIsMenuOpen(false)
                            }}
                        >Dashboard</li>

                        <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                            ${path === '/questions' && `text-primary`}
                            `} onClick={() => {
                                router.push('/questions')
                                setIsMenuOpen(false)
                            }}
                        >Questions</li>

                        <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                            ${path === '/upgrade' && `text-primary`}
                            `} onClick={() => {
                                router.push('/upgrade')
                                setIsMenuOpen(false)
                            }}
                        >Upgrade</li>

                        <li className={`cursor-pointer hover:text-primary hover:font-bold transition-all
                            ${path === '/how-it-works' && `text-primary`}
                            `} onClick={() => {
                                router.push('/how-it-works')
                                setIsMenuOpen(false)
                            }}
                        >How it Works?</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Header