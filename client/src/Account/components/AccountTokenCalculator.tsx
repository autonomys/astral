import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Identicon from '@polkadot/react-identicon'
import { useErrorHandler } from 'react-error-boundary'
import { accountIdToHex } from 'common/helpers/formatAddress'
import useDomains from 'common/hooks/useDomains'
import { QUERY_ACCOUNT_REWARDS_BY_ID } from 'Account/query'
import { Spinner } from 'common/components'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { SearchSpinner } from '../../common/components/SearchBar'

export interface FormValues {
  searchAddress: string
}

const SearchBar: FC = () => {
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false)
  const [rewardAddress, setRewardAddress] = useState('') 

  // TO-DO: Remove this once we have a better way to handle the search
  const errors = { searchTerm: '' }
  const touched = { searchTerm: '' }
  const isDesktop = true

  const handleChange = useCallback((e) => setRewardAddress(e.target.value), [setRewardAddress])

  const handleSubmit = useCallback(async () => {
    setIsSearching(true)
    navigate(`/tokenCalculator/${rewardAddress}`)
  }, [navigate, rewardAddress])

  return (
    <div className='container flex flex-col justify-left w-1/2'>
      <div className='ml-4 w-full'>
        <div className='relative'>
          <input
            data-testid='search-term-input'
            id='searchTerm'
            className={`
                          dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] w-full text-sm text-gray-900 rounded-md bg-white shadow-lg
                          ${
                            errors.searchTerm &&
                            touched.searchTerm &&
                            'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-md bg-white shadow-lg'
                          } 
                        `}
            placeholder={isDesktop ? 'Reward Address - Subspace Testnet Format' : 'Search...'}
            name='searchTerm'
            value={rewardAddress}
            onChange={handleChange}
          />
          <button
            disabled={isSearching}
            type='submit'
            data-testid='testSearchSubmit'
            className='absolute right-1 md:right-2.5 bottom-0 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 '
            onClick={handleSubmit}
          >
            {isSearching ? (
              <div className='flex justify-center align-middle mt-4'>
                <SearchSpinner />
              </div>
            ) : (
              <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const defaultRewards = {
  aries: {
    blocksWon: '0',
  },
  geminiI: {
    earnings: '0',
    percentage: '0',
  },
  geminiII: {
    stage1: {
      earnings: '0',
      percentage: '0',
    },
    stage2: {
      earnings: '0',
      percentageFarm: '0',
      percentage: '0',
    },
  },
  geminiIII: {
    earnings: '0',
    percentage: '0',
  },
  totalMainnet: {
    earnings: '0',
    percentage: '0',
  },
}

const SearchResult: FC<{ accountAddress: string }> = ({ accountAddress }) => {
  const publicKey = accountIdToHex(accountAddress)
  const { selectedChain } = useDomains()
  const theme = selectedChain.isDomain ? 'ethereum' : 'beachball'
  const [userRewards, setUserRewards] = useState(defaultRewards)
  const { data, error, loading } = useQuery(QUERY_ACCOUNT_REWARDS_BY_ID, { variables: { account: publicKey } })

  useErrorHandler(error)

  const totalCurrentRewards = useMemo(() => (data && data.accounts.length === 1 && data.accounts[0].rewards.length > 0) ? (data.accounts[0].rewards.reduce((acc, reward) => acc + parseFloat(reward.amount), 0) / 10 ** 18).toFixed(4).toLocaleString() : '0', [data])

  const handleSearch = useCallback(async () => {
    const file = await fetch('/data/rewards.csv')
    const data = await file.text()
    const rows = data.split('\n').slice(1)
    const rewards = rows.map(row => {
      const columns = row.split(',')
      return {
        address: {
          subspaceFormat: columns[0],
          polkadotFormat: columns[1],
        },
        rewards: {
          ...defaultRewards,
          aries: {
            blocksWon: columns[2],
          },
          geminiI: {
            earnings: columns[3],
            percentage: columns[4],
          },
          geminiII: {
            stage1: {
              earnings: columns[5],
              percentage: columns[6],
            },
            stage2: {
              earnings: columns[7],
              percentageFarm: columns[8],
              percentage: columns[9],
            },
          },
        }
      }
    })
    const userRewards = rewards.filter(reward => reward.address.subspaceFormat === accountAddress || reward.address.polkadotFormat === accountAddress)
    if (userRewards.length > 0) setUserRewards(userRewards[0].rewards)
  }, [accountAddress])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  useEffect(() => {
    setUserRewards({
      ...userRewards,
      geminiIII: {
        earnings: totalCurrentRewards,
        percentage: '',
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCurrentRewards])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='border border-slate-100 bg-white shadow rounded-[20px] mb-4 md:p-4 p-6 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
      <div className='flex items-center gap-3 w-full'>
        <div className='w-full flex items-center gap-3'>
          <Identicon value={accountAddress} size={48} theme={theme} />

          <h3 className='font-medium leading-none text-[#282929] text-sm break-all dark:text-white'>
            {accountAddress}
          </h3>
        </div>
      </div>
      <div className='w-full flex items-center gap-3 mt-6'>
        <div className='flex w-1/2'>
          <svg className='ml-2 mt-1 mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.6 13.2L14.65 6.15L13.25 4.75L7.6 10.4L4.75 7.55L3.35 8.95L7.6 13.2ZM2 18C1.45 18 0.979002 17.804 0.587002 17.412C0.195002 17.02 -0.000664969 16.5493 1.69779e-06 16V2C1.69779e-06 1.45 0.196002 0.979002 0.588002 0.587002C0.980002 0.195002 1.45067 -0.000664969 2 1.69779e-06H16C16.55 1.69779e-06 17.021 0.196002 17.413 0.588002C17.805 0.980002 18.0007 1.45067 18 2V16C18 16.55 17.804 17.021 17.412 17.413C17.02 17.805 16.5493 18.0007 16 18H2Z" fill="#88D8CE"/>
          </svg>

          Eligible for Community Sale. More information
        </div>
      </div>
      <div className='w-full flex items-center gap-3 mt-4'>
        <div className='flex w-1/2 text-[#857EC2]'>
          Public Key
        </div>
        <div className='flex w-1/2'>
          {publicKey}
        </div>
      </div>
      <hr className='mt-4' />
      <div className='w-full flex items-center gap-3 mt-4'>
        <div className='flex w-1/2 text-[#857EC2]'>
          Reward Address - Base Substrate Format
        </div>
        <div className='flex w-1/2'>
          {accountAddress}
        </div>
      </div>
      <div className='w-full flex items-center gap-6 mt-8 p-6'>
        <div className='w-1/2 flex items-center'>
          <div className='w-full text-center'>
            <p className='text-3xl font-extrabold text-[#48C0B5]'>Aries</p>
            <p className='text-lg font-bold mt-2 text-[#241235]'>Aries Blocks Won: {userRewards.aries.blocksWon}</p>
          </div>
        </div>

        <div className='w-1/2 flex items-center'>
          <div className='w-full text-center'>
            <p className='text-3xl font-extrabold text-[#4B5563]'>Gemini I</p>
            <p className='text-lg font-bold mt-2 text-[#241235]'>Earnings: {userRewards.geminiI.earnings} TSSC, {userRewards.geminiI.percentage}%</p>
          </div>
        </div>
      </div>
      <div className='w-full flex items-center gap-6 mt-8 p-6'>
        <div className='w-1/2 flex items-center'>
          <div className='w-full text-center'>
            <p className='text-3xl font-extrabold text-[#48C0B5]'>Gemini II, stage 1:</p>
            <p className='text-lg font-bold mt-2 text-[#241235]'>Earnings: {userRewards.geminiII.stage1.earnings} TSSC, {userRewards.geminiII.stage1.percentage}%</p>
          </div>
        </div>

        <div className='w-1/2 flex items-center'>
          <div className='w-full text-center'>
            <p className='text-3xl font-extrabold text-[#48C0B5]'>Gemini II, stage 2:</p>
            <p className='text-lg font-bold mt-2 text-[#241235]'>Earnings: {userRewards.geminiII.stage2.earnings} TSSC, {userRewards.geminiII.stage2.percentage}%</p>
          </div>
        </div>
      </div>
      <div className='w-full flex items-center gap-6 mt-8 p-6'>
        <div className='w-1/2 flex items-center'>
          <div className='w-full text-center'>
            <p className='text-3xl font-extrabold text-[#48C0B5]'>Gemini III:</p>
            <p className='text-lg font-bold mt-2 text-[#241235]'>Earnings: {userRewards.geminiIII.earnings} TSSC, {userRewards.geminiIII.percentage}%</p>
            </div>
          </div>
        <div className='w-1/2 flex items-center'>
          <div className='w-full text-center'>
            <p className='text-3xl font-extrabold text-[#48C0B5]'>Total, Mainnet:</p>
            <p className='text-lg font-bold mt- text-[#241235]'>Earnings: {userRewards.totalMainnet.earnings} SSC, {userRewards.totalMainnet.percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const TokenCalculator = () => {
  const { accountId } = useParams<{ accountId?: string }>()

  return (
    <div className='flex items-start justify-left px-5 pt-12 pb-32 w-full'>
      <div className='container flex flex-col justify-left'>
        <h2 className='mt-5 text-[#282929] text-xl  font-medium dark:text-white'>
          Mainnet Token Calculator
        </h2>
        <div className=' flex flex-col gap-8 text-slate-600 mt-4 mb-8 lg:text-lg dark:text-white'>
          Formulas and FAQ
        </div>
        {accountId ? <SearchResult accountAddress={accountId} /> : <SearchBar />}
      </div>
    </div>
  )
}

export default TokenCalculator
