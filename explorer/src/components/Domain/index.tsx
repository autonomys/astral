'use client'

import { BlockIcon, DocIcon } from '@/components/icons'
import { Routes } from 'constants/routes'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo } from 'react'

export const DomainPage: FC = () => {
  const { selectedChain } = useDomains()

  const listOfCards = useMemo(
    () => [
      {
        title: 'Nova',
        description: 'EVM domain',
        href: `/${selectedChain.urls.page}/${Routes.nova}`,
        icon: <BlockIcon />,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-purpleMedium dark:to-purplePale',
      },
      {
        title: 'Auto-ID',
        description: 'Identity domain',
        href: `/${selectedChain.urls.page}/${Routes.autoid}`,
        icon: <DocIcon />,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-purpleDeep dark:to-purplePastel',
      },
    ],
    [selectedChain.urls.page],
  )

  return (
    <div className='flex w-full flex-col items-center space-y-4'>
      <div className='w-full max-w-4xl'>
        <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:p-6'>
          <div className='mb-10 flex flex-col items-center justify-center'>
            <h1 className='mb-8 mt-6 text-center text-4xl font-bold text-gray-900 dark:text-white'>
              Domains
            </h1>
          </div>
          <div className='m-6 flow-root text-gray-900 dark:text-white'>
            <div className='mb-12 flex w-full items-center gap-5 overflow-x-auto'>
              <p>
                The Autonomys Network can run multiple domains, each with different runtimes,
                genesis configurations, and validator sets. Each domain is a separate blockchain
                with its own state and history. Operators for each domain are responsible for
                preparing blocks of transactions. Committing these domain blocks as bundles to the
                Consensus Layer is done on a per-domain basis.
              </p>
            </div>
            <div className='mb-12 flex w-full items-center gap-5 overflow-x-auto'>
              <p>
                At the moment, we have an EVM (Ethereum Virtual Machine) domain and a custom
                decentralized identity domain. However, more custom or existing runtime domains
                could be deployed in the future.
              </p>
            </div>
          </div>
        </div>

        <div className='m-4 p-4'>
          <div className='m-6 flow-root'>
            <div className='mb-12 flex w-full items-center justify-center gap-5 overflow-x-auto'>
              {listOfCards.map(({ title, description, href, icon, darkBgClass }, index) => (
                <Link key={index} href={href}>
                  <div
                    key={index}
                    className={'h-[216px] w-1/5 min-w-[200px] grow cursor-pointer md:min-w-[228px]'}
                  >
                    <div
                      className={`flex h-full flex-col justify-center rounded-[20px] bg-white ${darkBgClass}`}
                    >
                      <div className='mb-6 flex w-full items-center justify-center align-middle'>
                        {icon}
                      </div>
                      <div className='flex w-full flex-col  items-center justify-center align-middle'>
                        <h2 className='mb-2.5 text-center  text-2xl font-normal text-gray-900 dark:text-white'>
                          {title}
                        </h2>
                        <p className='text-md text-center font-medium leading-relaxed dark:text-white'>
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
