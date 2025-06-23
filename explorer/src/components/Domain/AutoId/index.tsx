'use client'

import { EXTERNAL_ROUTES } from 'constants/routes'
import Link from 'next/link'
import { FC } from 'react'

export const AutoIdPage: FC = () => {
  return (
    <div className='flex w-full flex-col items-center space-y-4'>
      <div className='w-full'>
        <div className='mb-4 w-full rounded-lg border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
          <div className='mb-10 flex flex-col items-center justify-center'>
            <h1 className='mb-8 mt-6 text-center text-4xl font-bold text-gray-900 dark:text-white'>
              Auto ID
            </h1>
          </div>
          <div className='m-6 flow-root text-gray-900 dark:text-white'>
            <div className='mb-12 flex w-full flex-col items-center gap-5 overflow-x-auto'>
              <p className='text-center'>
                Auto ID is a revolutionary framework designed to enable identity infrastructure at
                an unprecedented scale. It acts as a foundational layer for decentralized identity
                solutions, providing a robust and scalable system for managing digital identities
                across diverse applications and platforms.
              </p>
              <p className='text-center'>
                With Auto ID, we address the urgent need for secure, user-centric identity
                management in the decentralized web. This solution offers a seamless approach to
                creating, managing, and verifying digital identities while prioritizing user privacy
                and data sovereignty.
              </p>
            </div>
          </div>
        </div>
        <div className='mb-4 w-full rounded-lg border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
          <div className='m-6 flow-root text-gray-900 dark:text-white'>
            <div className='mb-12 flex w-full flex-row items-start justify-between gap-5 overflow-x-auto'>
              <div className='w-1/2 pr-4'>
                <p className='text-center'>Key features of Auto ID include:</p>
                <ul className='list-disc pl-6'>
                  <li>Decentralized identity creation and management</li>
                  <li>Scalable infrastructure capable of supporting millions of users</li>
                  <li>Enhanced privacy controls empowering users</li>
                  <li>Interoperability with existing identity systems for seamless integration</li>
                  <li>Robust security measures to safeguard user data</li>
                </ul>
              </div>
              <div className='w-1/2 pl-4'>
                <p className='text-center'>
                  We are thrilled about the potential of Auto ID to transform digital identity
                  management. While comprehensive documentation is still in progress, you can
                  explore our approach to decentralized identity solutions in our
                  <Link
                    href={EXTERNAL_ROUTES.academy + 'autonomys-solutions/autoid'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ml-1 text-blue-500 hover:text-blue-700'
                  >
                    Academy section on Auto ID
                  </Link>
                  .
                </p>
                <p className='mt-4 text-center'>
                  Stay tuned for more detailed documentation and updates on this exciting
                  technology!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
