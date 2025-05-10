
import { Button } from '@/components/ui/button'


export default function Home() {
  return (
    <>
      <h1 >hello world!</h1>
      <h2 >this is a default landing page</h2>
      <h3 >goto /dashboard to see the dashboard</h3>

      <Button variant={'outline'}>i am a shadcn button, clicking me will do nothing</Button>

    </>
  );
}
