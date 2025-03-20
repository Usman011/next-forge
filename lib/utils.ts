import { techMap } from '@/constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDevIconClassName = (techName: string) => {
  const normalizedIconName = techName.replace(/[ .]/g, '').toLowerCase()

  return `${techMap[normalizedIconName]} colored` || 'devicon-devicon-plain'
}
