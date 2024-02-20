import { useSafeLocalStorage } from 'common/hooks/useSafeLocalStorage'
import { EXTERNAL_ROUTES } from 'common/routes'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useSafeLocalStorage('cookie-banner', true)

  if (!isVisible) {
    return <></>
  }

  const handleAcceptance = () => {
    setIsVisible(false)
  }

  return (
    <div className='w-full flex items-end'>
      <div className='w-full flex justify-between align-middle text-gray-600 text-sm font-medium dark:text-white'>
        <p>
          By clicking <b>“Accept Cookies”</b>, you agree to the storing of cookies on your device to
          enhance site navigation, analyze site usage, and assist in our marketing efforts.
          <br /> View our{' '}
          <a
            href={EXTERNAL_ROUTES.subspacePrivacyPolicy}
            target='_blank'
            rel='noreferrer'
            className=' text-[#DE67E4] '
          >
            Privacy Policy
          </a>{' '}
          for more information.
        </p>
        <button
          className='w-32 py-2 bg-white dark:bg-[#1E254E] hover:bg-gray-200 text-gray-800 dark:text-white text-sm font-medium rounded-[20px]'
          onClick={handleAcceptance}
        >
          Accept Cookies
        </button>
      </div>
    </div>
  )
}

export default CookieBanner
