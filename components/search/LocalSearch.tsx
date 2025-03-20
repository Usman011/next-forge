'use client'

import Image from 'next/image'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { formUrlQuery, removeKeyFromUrl } from '@/lib/url'
import { cn } from '@/lib/utils'

import { Input } from '../ui/input'

interface LocalSearchProps {
  route: string
  imgSrc: string
  placeholder: string
  otherClasses: string
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchProps) => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        const url = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery,
        })
        router.push(url, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeyFromUrl({
            params: searchParams.toString(),
            keysToRemove: ['query'],
          })
          router.push(newUrl, { scroll: false })
        }
      }
    }, 500)

    return () => clearTimeout(debounce)
  }, [searchQuery])

  return (
    <div
      className={cn(
        'background-light800_dark400 flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 py-2',
        otherClasses
      )}
    >
      <label htmlFor='search'>
        <Image
          src={imgSrc}
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
      </label>
      <Input
        id='search'
        type='text'
        placeholder={placeholder}
        value={searchQuery}
        className={
          'paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none'
        }
        onChange={(e) => {
          setSearchQuery(e.target.value)
        }}
      />
    </div>
  )
}

export default LocalSearch
