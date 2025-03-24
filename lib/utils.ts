import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { techMap } from '@/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDevIconClassName = (techName: string) => {
  const normalizedIconName = techName.replace(/[ .]/g, '').toLowerCase()

  return `${techMap[normalizedIconName]} colored` || 'devicon-devicon-plain'
}

export const getTimestamp = (date: Date) => {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const seconds = Math.floor(diffTime / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'}`
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
  }
}
