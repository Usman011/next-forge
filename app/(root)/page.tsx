import Link from 'next/link'

import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilter from '@/components/filters/HomeFilter'
import LocalSearch from '@/components/search/LocalSearch'
import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'
import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-errors'

const questionsData: Question[] = [
  {
    _id: '1',
    title: 'How to learn React?',
    tags: [
      { _id: '1', name: 'React' },
      // { _id: '2', name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image: '/images/usman.png',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date('2024-01-15T10:30:00.000Z'),
  },
  {
    _id: '2',
    title: 'How to learn JavaScript?',
    tags: [
      { _id: '1', name: 'React' },
      { _id: '2', name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image: '/images/usman.png',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date('2022-01-15T10:30:00.000Z'),
  },
]

const test = async () => {
  try {
    throw new ValidationError({
      title: ['Required'],
      tags: ['Required'],
      author: ['Required'],
    })
  } catch (error) {
    const response = handleError(error)
    console.log(response)
  }
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function Home({ searchParams }: SearchParams) {
  const response = await test()
  console.log(response)
  const { query = '', filter = '' } = await searchParams
  const filteredQuestions = questionsData.filter(
    (question: {
      title: string
      tags: Array<{ name: string }>
      author: { name: string }
    }) => {
      const matchesQuery = question.title
        .toLowerCase()
        .includes(query.toLowerCase())

      const matchesFilter = filter
        ? question.tags.some(
            (tag) => tag.name.toLowerCase() === filter.toLowerCase()
          ) || question.author.name.toLowerCase() === filter.toLowerCase()
        : true
      return matchesQuery && matchesFilter
    }
  )
  return (
    <>
      <section className='flex w-full flex-col-reverse justify-between gap-4 md:flex-row md:items-center'>
        <h1 className='h1-bold'>All Questions</h1>
        <Button
          className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>

      <section className='mt-11 flex flex-wrap gap-6'>
        <LocalSearch
          route={ROUTES.HOME}
          imgSrc='/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1'
        />
      </section>
      <HomeFilter />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
          // <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  )
}
