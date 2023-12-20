import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// layout
import { DOMAINS } from 'layout/constants'
import useDomains from 'common/hooks/useDomains'

// chains
import domains from 'layout/config/domains.json'
import chains from 'layout/config/chains.json'
import AccountListDropdown from './AccountListDropdown'

const DomainHeader: FC = () => {
  const location = useLocation()
  const pathName = location.pathname

  const navigate = useNavigate()

  const { setSelectedChain, selectedChain, setSelectedDomain, selectedAccount, connectWallet } =
    useDomains()

  const handleDomainSelected = (domain: string) => {
    if (domain === 'evm') {
      setSelectedDomain(domain)
      setSelectedChain(domains[0])
    } else {
      setSelectedDomain(domain)
      setSelectedChain(chains[0])
    }
    navigate(`/${selectedChain.urls.page}/${domain}`)
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
            const isActive = pathName.includes(item.name)
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
          {selectedAccount === undefined ? (
            <button
              onClick={(event) => connectWallet(event)}
              className='h-10 w-36 text-white font-medium bg-gradient-to-r from-[#EA71F9] to-[#4D397A] rounded-full'
            >
              Connect Wallet
            </button>
          ) : (
            <AccountListDropdown />
          )}
        </div>
      </div>
    </div>
  )
}

export default DomainHeader
