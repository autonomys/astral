// common
import { INTERNAL_ROUTES } from 'common/routes'
import AstronautImage from 'common/components/ErrorFallback/AstronautImage'

const Gemini2Static = () => {
  return (
    <div className='flex items-center justify-center px-5 pt-12 pb-32 w-full'>
      <div className='text-center container flex flex-col items-center justify-center'>
        <AstronautImage />
        <h2 className='mt-5 text-[#282929] text-xl  font-medium dark:text-white'>
          Heads up! Gemini2 Incentivized Testnet is now over.
        </h2>
        <p className='text-slate-600 mt-4 mb-8 lg:text-lg w-1/2 dark:text-white'>
          We have disabled it from our block explorer. If you earned rewards, follow the{' '}
          <a className='font-medium text-[#9179EC] dark:text-[#DE67E4]' href={INTERNAL_ROUTES.home}>
            guide
          </a>{' '}
          to retrieve your farming stats and rewards.
        </p>
      </div>
    </div>
  )
}

export default Gemini2Static
