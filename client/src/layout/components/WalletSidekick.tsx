import dayjs from 'dayjs'
import { minidenticon } from 'minidenticons'
import { FC, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// layout
import { HeaderBackground } from 'layout/components'

// common
import { shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { CopyIcon, LogoIcon, WalletIcon } from 'common/icons'
import { INTERNAL_ROUTES } from 'common/routes'

type DrawerProps = {
  isOpen: boolean
  setIsOpen: (update: boolean | ((prevState: boolean) => boolean)) => void
}

interface WalletSidekickProps extends DrawerProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const WalletSidekick: FC<WalletSidekickProps> = ({ onClick, isOpen, setIsOpen }) => {
  return (
    <>
      <button
        onClick={onClick}
        className='inline-flex items-center bg-white py-2 px-2 focus:outline-none hover:bg-gray-200 text-base rounded-full dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A]'
      >
        <WalletIcon width='24' height='24' />
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

const Drawer: FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const { selectedChain, selectedDomain } = useDomains()
  const { subspaceAccount } = useWallet()

  const avatar = useMemo(
    () =>
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(minidenticon(subspaceAccount ?? 'no-wallet', 50, 50)),
    [subspaceAccount],
  )

  const handleNavigate = useCallback(
    (url: string) => {
      setIsOpen(false)
      navigate(url)
    },
    [setIsOpen, navigate],
  )

  const handleCopyWallet = useCallback(() => {
    if (subspaceAccount) {
      navigator.clipboard.writeText(subspaceAccount)
    }
  }, [subspaceAccount])

  return (
    <nav
      className={
        ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0 z-max '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
    >
      <section
        className={
          'w-screen max-w-lg right-0 absolute bg-light dark:bg-dark h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform -z-10' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <HeaderBackground />
        <article className='relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full gap-10'>
          <div className='flex items-center align-middle justify-between p-5'>
            <button
              onClick={() => handleNavigate(`/${selectedChain.urls.page}/${selectedDomain}`)}
              className='flex title-font font-medium items-center text-gray-900 text-[#282929] dark:text-white'
            >
              <LogoIcon fillColor='currentColor' />
            </button>
            <div className='flex gap-3 items-center'>
              <button
                className='bg-white px-4 py-2 items-center rounded-full dark:bg-[#1E254E] dark:text-white'
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>
          </div>
          <div className='p-5 m-2 mt-8 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
            {subspaceAccount && (
              <Link
                data-testid='wallet-link'
                className='hover:text-[#DE67E4]'
                to={INTERNAL_ROUTES.accounts.id.page(
                  selectedChain.urls.page,
                  'consensus',
                  subspaceAccount,
                )}
              >
                <div className='flex items-center m-2'>
                  <img src={avatar} alt={subspaceAccount} width={60} />
                  <span className='hidden sm:block ml-2 truncate w-5 text-lg underline md:w-full text-white'>
                    {shortString(subspaceAccount)}
                  </span>
                </div>
              </Link>
            )}

            <span className='text-[#241235] text-base font-medium dark:text-white'>
              Your Subspace Wallet Address
            </span>
            <div className='flex items-center m-2'>
              <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full text-white'>
                {subspaceAccount && subspaceAccount}
              </span>
              <CopyIcon onClick={handleCopyWallet} fill='white' />
            </div>
          </div>
          <div className='flex'>
            <div className='justify-items-end pt-10 pb-1 pl-5 flex flex-wrap sm:hidden flex-col sm:flex-row'>
              <p className='text-gray text-sm text-center sm:text-left'>
                © {dayjs().year()} Subspace Labs, Inc. All Rights Reserved
              </p>
            </div>
          </div>
        </article>
      </section>
    </nav>
  )
}
