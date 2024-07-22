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
    <div className='flex w-full items-end bg-gray-600/40 p-5 '>
      <div className='flex w-full justify-between align-middle text-sm font-medium text-gray-600 dark:text-white'>
        <p>
          By clicking <b>“Accept Cookies”</b>, you agree to the storing of cookies on your device to
          enhance site navigation, analyze site usage, and assist in our marketing efforts.
          <br /> View our{' '}
          <a
            href={EXTERNAL_ROUTES.subspacePrivacyPolicy}
            target='_blank'
            rel='noreferrer'
            className=' text-purpleAccent '
          >
            Privacy Policy
          </a>{' '}
          for more information.
        </p>
        <button
          className='w-32 rounded-[20px] bg-white py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-blueAccent dark:text-white'
          onClick={handleAcceptance}
        >
          Accept Cookies
        </button>
      </div>
    </div>
  )
}
