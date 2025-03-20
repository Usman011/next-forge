import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'
import { Link } from 'lucide-react'

export default async function Home() {
  return (
    <>
      <section className='flex w-full flex-col-reverse md:flex-row justify-between gap-4 md:items-center'>
        <h1 className='h1-bold'>All Questions</h1>
        <Button
          className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>

      <section className='mt-11 flex flex-wrap gap-6'>Local Search</section>
      <section>Home Filters</section>

      <div className='mt-10 flex w-full flex-col gap-6'>
        <p>Question Card 1</p>
        <p>Question Card 1</p>
        <p>Question Card 1</p>
        <p>Question Card 1</p>
        <p>Question Card 1</p>
      </div>
    </>
  )
}
