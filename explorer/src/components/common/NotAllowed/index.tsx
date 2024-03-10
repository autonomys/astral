import AstronautImage from '../ErrorFallback/AstronautImage'

export const NotAllowed = () => {
  return (
    <div className='flex w-full items-center justify-center px-5 pb-32 pt-12'>
      <div className='container flex flex-col items-center justify-center text-center'>
        <AstronautImage />
        <h2 className='mt-5 text-xl font-medium  text-[#282929] dark:text-white'>
          This page is not available in this network/domain
        </h2>
        <p className='mb-8 mt-4 w-1/2 text-slate-600 dark:text-white lg:text-lg'>
          Select Gemini-3g or continue to explore other pages.
        </p>
      </div>
    </div>
  )
}
