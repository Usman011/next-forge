import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  imgUrl: string
  alt: string
  value: string | number
  title: string
  href?: string
  textStyles: string
  imgStyles?: string
  isAuthor?: boolean
  imgSize?: number
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
  imgSize = 16,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        width={imgSize}
        height={imgSize}
        alt={alt}
        className={`object-contain ${imgStyles} ${isAuthor ? 'rounded-full' : ''}`}
      />

      <p className={`${textStyles} ml-2 flex items-center gap-1`}>
        {value}
        {title && (
          <span
            className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}
          >
            {title}
          </span>
        )}
      </p>
    </>
  )

  if (href) {
    return (
      <Link href={href} className='flex-center gap-1'>
        {metricContent}
      </Link>
    )
  }

  return <div className='flex-center gap-1'>{metricContent}</div>
}

export default Metric
