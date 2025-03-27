'use client'

import { EXTERNAL_ROUTES } from 'constants/routes'
import Link from 'next/link'
import { FC } from 'react'
import { EvmExplorerBanner } from '../../common/EvmExplorerBanner'

export const AutoEvmPage: FC = () => (
  <div className='flex w-full flex-col items-center space-y-4'>
    <EvmExplorerBanner />
    <div className='w-full max-w-4xl'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
        <div className='mb-10 flex flex-col items-center justify-center'>
          <h1 className='mb-8 mt-6 text-center text-4xl font-bold text-gray-900 dark:text-white'>
            Auto EVM
          </h1>
        </div>
        <div className='m-6 flow-root text-gray-900 dark:text-white'>
          <div className='mb-12 flex w-full flex-col items-center gap-5 overflow-x-auto'>
            <p className='text-center'>
              Auto EVM represents our state-of-the-art EVM (Ethereum Virtual Machine) domain,
              seamlessly integrated with our robust consensus layer. This powerful combination
              enables a highly scalable and efficient blockchain infrastructure, designed to meet
              the evolving demands of modern decentralized applications and smart contracts. By
              leveraging the flexibility and compatibility of the EVM, Auto EVM provides a familiar
              environment for Ethereum developers while offering enhanced performance and security
              features.
            </p>
            <p className='text-center'>
              Our Auto EVM domain is built to excel in various aspects of blockchain technology. It
              offers faster transaction processing, improved throughput, and a more efficient
              overall ecosystem. Developers can take advantage of Auto EVM&apos;s compatibility with
              existing Ethereum tools and libraries, making the transition to our platform smooth
              and straightforward. Whether you&apos;re building DeFi applications, NFT marketplaces,
              or complex smart contract systems, Auto EVM provides the ideal foundation for your
              blockchain projects.
            </p>
            <p className='text-center'>
              We&apos;re excited to announce that comprehensive documentation for Auto EVM is now
              available. Our documentation covers everything from setting up your development
              environment to deploying and interacting with smart contracts on our platform. To
              access this valuable resource and start building on Auto EVM, please visit our{' '}
              <Link
                href={EXTERNAL_ROUTES.docs + 'develop/auto-evm'}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline hover:text-blue-700'
              >
                official documentation page
              </Link>
              . Here, you&apos;ll find detailed guides, tutorials, and API references to help you
              harness the full potential of Auto EVM and create innovative blockchain solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
