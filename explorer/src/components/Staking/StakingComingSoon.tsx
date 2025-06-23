import React, { FC } from 'react'

export const StakingComingSoon: FC = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-8 py-8'>
      <h1 className='font-sans text-5xl font-bold text-gray-800 dark:text-white'>Coming Soon</h1>
      <p className='max-w-md text-center text-gray-600 dark:text-gray-400'>
        We are currently working on improvements to our staking interface. In the meantime, you can
        manage your staking operations via the{' '}
        <a
          href='https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-0.taurus.subspace.network%2Fws#/explorer'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600'
        >
          Polkadot.js explorer.
        </a>{' '}
        See our{' '}
        <a
          href='https://docs.autonomys.xyz/staking/operator/polkadot'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600'
        >
          documentation
        </a>{' '}
        for detailed instructions.
      </p>
    </div>
  )
}
