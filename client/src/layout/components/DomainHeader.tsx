import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// layout
import useDomains from 'common/hooks/useDomains'
import chains from 'layout/config/chains.json'
import domains from 'layout/config/domains.json'
import { DOMAINS, DOMAINS_NAMES } from 'layout/constants'

// common
import useWallet from 'common/hooks/useWallet'

// chains
import AccountListDropdown from './AccountListDropdown'
import PreferredExtensionModal from './PreferredExtensionModal'

const DomainHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const pathName = location.pathname

  const navigate = useNavigate()

  const { setSelectedChain, selectedChain, setSelectedDomain } = useDomains()
  const { actingAccount } = useWallet()

  const handleDomainSelected = (domain: string) => {
    if (domain === DOMAINS_NAMES.nova) {
      setSelectedDomain(domain)
      setSelectedChain(domains[0])
    } else {
      setSelectedDomain(domain)
      setSelectedChain(chains[0])
    }
    navigate(`/${selectedChain.urls.page}/${domain}`)
  }

  const handleConnectWallet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <div
      className='w-full h-[60px] bg-white dark:bg-[#1E254E] z-10'
      id='accordion-open'
      data-accordion='open'
    >
      <div className='w-full flex justify-between container py-3 items-center px-5 md:px-[25px] 2xl:px-0 mx-auto'>
        <div className='flex gap-9'>
          {DOMAINS.map((item, index) => {
            const isActive = pathName.includes(`${selectedChain.urls.page}/${item.name}`)
            return (
              <div className='text-[13px] font-semibold items-center flex' key={`${item}-${index}`}>
                <button
                  onClick={() => handleDomainSelected(item.name)}
                  className={
                    isActive
                      ? 'bg-[#241235] rounded-full py-2 px-4 dark:bg-[#DE67E4] text-white'
                      : 'bg-white text-[#282929] dark:text-white dark:bg-[#1E254E]'
                  }
                >
                  {item.title}
                </button>
              </div>
            )
          })}
        </div>
        <div className='flex gap-4'>
          {!actingAccount ? (
            <button
              onClick={(e) => handleConnectWallet(e)}
              className='h-10 w-36 text-white font-medium bg-gradient-to-r from-[#EA71F9] to-[#4D397A] rounded-full'
            >
              Connect Wallet
            </button>
          ) : (
            <AccountListDropdown />
          )}
        </div>
      </div>
      <PreferredExtensionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default DomainHeader
