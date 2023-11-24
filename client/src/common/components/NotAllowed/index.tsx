import AstronautImage from '../ErrorFallback/AstronautImage'

const NotAllowed = () => {
  return (
    <div className='flex items-center justify-center px-5 pt-12 pb-32 w-full'>
      <div className='text-center container flex flex-col items-center justify-center'>
        <AstronautImage />
        <h2 className='mt-5 text-[#282929] text-xl  font-medium dark:text-white'>
          This page is not available in this network/domain
        </h2>
        <p className='text-slate-600 mt-4 mb-8 lg:text-lg w-1/2 dark:text-white'>
          Select Gemini-3g or continue to explore other pages.
        </p>
      </div>
    </div>
  )
}

export default NotAllowed
