'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <h1 >Dev is working on the landing page</h1>
      <h3 >goto /dashboard to see the dashboard</h3>
      <Button className='m-10 cursor-pointer' onClick={() => router.push('/dashboard')}>Go to the dashboard</Button>
    </>
  );
}
