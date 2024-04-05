// common
import AstronautImage from '@/components/common/ErrorFallback/AstronautImage'
import { EXTERNAL_ROUTES } from 'constants/routes'

const Gemini2Static = () => {
  return (
    <div className='flex w-full items-center justify-center px-5 pb-32 pt-12'>
      <div className='container flex flex-col items-center justify-center text-center'>
        <AstronautImage />
        <h2 className='mt-5 text-xl font-medium  text-[#282929] dark:text-white'>
          Heads up! Gemini2 Incentivized Testnet is now over.
        </h2>
        <p className='mb-8 mt-4 w-1/2 text-slate-600 dark:text-white lg:text-lg'>
          We have disabled it from our block explorer. If you earned rewards, follow this{' '}
          <a
            className='font-medium text-[#9179EC] dark:text-[#DE67E4]'
            href={EXTERNAL_ROUTES.gemini2guide}
            rel='noreferrer'
            target='_blank'
          >
            guide
          </a>{' '}
          to retrieve your farming stats and rewards.
        </p>
      </div>
    </div>
  )
}

export default Gemini2Static
