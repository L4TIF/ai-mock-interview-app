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
    const pathname = usePathname()
    const handleNavigation = (path) => {
        
        // Check if we're in an interview
        if (pathname?.includes('/interview/') && pathname?.includes('/start')) {
            if (window.confirm('Are you sure you want to leave the interview? Your progress will be lost.')) {
                router.push(path)
            }
        } else {
            router.push(path)
        }
    }

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
                        onClick={() => handleNavigation('/dashboard')}
                        className="cursor-pointer"
                    />
                </div>

                {/* Desktop Navbar */}
                <ul className='hidden md:flex gap-6'>
                    <li className={`cursor-pointer hover:text-primary transition-all
                        ${path === '/dashboard' && 'text-primary font-bold'}
                        `} onClick={() => handleNavigation('/dashboard')}
                    >Dashboard</li>

                    <li className={`cursor-pointer hover:text-primary transition-all
                        ${path === '/questions' && `text-primary font-bold`}
                        `} onClick={() => handleNavigation('/questions')}
                    >Questions</li>

                    <li className={`cursor-pointer hover:text-primary transition-all
                        ${path === '/upgrade' && `text-primary font-bold`}
                        `} onClick={() => handleNavigation('/upgrade')}
                    >Upgrade</li>

                    <li className={`cursor-pointer hover:text-primary transition-all
                        ${path === '/how-it-works' && `text-primary font-bold`}
                        `} onClick={() => handleNavigation('/how-it-works')}
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
                        <li className={`cursor-pointer hover:text-primary transition-all
                            ${path === '/dashboard' && 'text-primary font-bold'}
                            `} onClick={() => {
                                handleNavigation('/dashboard')
                                setIsMenuOpen(false)
                            }}
                        >Dashboard</li>

                        <li className={`cursor-pointer hover:text-primary transition-all
                            ${path === '/questions' && `text-primary font-bold`}
                            `} onClick={() => {
                                handleNavigation('/questions')
                                setIsMenuOpen(false)
                            }}
                        >Questions</li>

                        <li className={`cursor-pointer hover:text-primary transition-all
                            ${path === '/upgrade' && `text-primary font-bold`}
                            `} onClick={() => {
                                handleNavigation('/upgrade')
                                setIsMenuOpen(false)
                            }}
                        >Upgrade</li>

                        <li className={`cursor-pointer hover:text-primary transition-all
                            ${path === '/how-it-works' && `text-primary font-bold`}
                            `} onClick={() => {
                                handleNavigation('/how-it-works')
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