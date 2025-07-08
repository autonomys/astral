'use client'

import { FC } from 'react'
import { DomainCards } from './DomainCards'
import { DomainsList } from './DomainsList'

export const DomainPage: FC = () => {
  return (
    <div className='flex w-full flex-col items-center space-y-4'>
      <div className='w-full max-w-4xl'>
        <div className='w-full rounded-lg border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='mt-4 text-center text-4xl font-bold text-gray-900 dark:text-white'>
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
          </div>
        </div>

        <div>
          <div className='m-6 flow-root'>
            <DomainCards />
          </div>
        </div>
      </div>

      <DomainsList />
    </div>
  )
}
