import { EXTERNAL_ROUTES } from 'constants/routes'
import { useSafeLocalStorage } from 'hooks/useSafeLocalStorage'

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useSafeLocalStorage('cookie-banner', true)

  if (!isVisible) {
    return <></>
  }

  const handleAcceptance = () => {
    setIsVisible(false)
  }

  return (
    <div className='flex w-full items-end bg-gray-600/40 p-5 px-5 backdrop-blur-lg lg:px-12'>
      <div className='flex w-full flex-col justify-between align-middle font-medium text-gray-600 dark:text-white md:flex-row md:items-center'>
        <p className='mb-3 text-base md:mb-0 md:mr-12'>
          By clicking <b>“Accept Cookies”</b>, you agree to the storing of cookies on your device to
          enhance site navigation, analyze site usage, and assist in our marketing efforts.
          <br /> View our{' '}
          <a
            href={EXTERNAL_ROUTES.privacyPolicy}
            target='_blank'
            rel='noreferrer'
            className='text-primaryAccent'
          >
            Privacy Policy
          </a>{' '}
          for more information.
        </p>
        <button
          className='min-w-32 rounded-[20px] bg-white px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-blueAccent dark:text-white'
          onClick={handleAcceptance}
        >
          Accept Cookies
        </button>
      </div>
    </div>
  )
}
