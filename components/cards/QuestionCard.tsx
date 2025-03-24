import Link from 'next/link'
import React from 'react'

import TagCard from '@/components/cards/TagCard'
import ROUTES from '@/constants/routes'
import { getTimestamp } from '@/lib/utils'

import Metric from '../Metric'

interface QuestionCardProps {
  question: Question
}

const QuestionCard = ({
  question: { _id, title, author, createdAt, upvotes, views, answers, tags },
}: QuestionCardProps) => {
  return (
    <div className='card-wrapper rounded-[10px] p-9 md:px-11'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div>
          {createdAt && (
            <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
              {getTimestamp(new Date(createdAt))}
            </span>
          )}
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className='sm:h3-bold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className='mt-3.5 flex w-full flex-wrap gap-2'>
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>
      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={` - asked ${getTimestamp(new Date(createdAt))}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles='body-medium text-dark400_light700'
          imgSize={28}
          isAuthor
        />

        <div className='flex items-center gap-3 max-md:flex-wrap max-md:justify-start'>
          <Metric
            imgUrl='/icons/like.svg'
            alt='like'
            value={upvotes}
            title='Answers'
            href={ROUTES.QUESTION(_id)}
            textStyles='small-medium text-dark400_light800'
          />
          <Metric
            imgUrl='/icons/message.svg'
            alt='answers'
            value={answers}
            title='Answers'
            href={ROUTES.QUESTION(_id)}
            textStyles='small-medium text-dark400_light800'
          />
          <Metric
            imgUrl='/icons/eye.svg'
            alt='views'
            value={views}
            title='Views'
            href={ROUTES.QUESTION(_id)}
            textStyles='small-medium text-dark400_light800'
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
