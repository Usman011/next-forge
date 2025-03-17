'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname()
  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900',
              'flex items-center justify-start gap-4 bg-transparent p-4 text-white'
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={34}
              height={34}
              className={cn({ 'invert-colors': !isActive })}
            />
            <p
              className={cn(
                isActive ? 'base-bold' : 'base-medium',
                !isMobileNav && 'max-lg:hidden',
                'text-white'
              )}
            >
              {item.label}
            </p>
          </Link>
        )

        return LinkComponent
      })}
    </>
  )
}

export default NavLinks
