import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// layout
import { DOMAINS } from 'layout/constants'
import BarsLeftIcon from 'common/icons/BarsLeftIcon'
import useDomains from 'common/hooks/useDomains'

// chains
import domains from 'layout/config/domains.json'
import { useSafeLocalStorage } from 'common/hooks/useSafeLocalStorage'

const DomainHeader: FC = () => {
  const [isActive, setIsActive] = useState(true)
  const [domainSelected, setDomainSelected] = useSafeLocalStorage(
    'domain-selected',
    'Consensus Chain',
  )
  const navigate = useNavigate()

  const { setSelectedChain, chains, selectedChain } = useDomains()

  const handleDomainSelected = (domain: string) => {
    if (domain === 'Consensus Chain') {
      setSelectedChain(chains[0])
      setDomainSelected(domain)
      navigate(`/${selectedChain.urls.page}`)
      return
    } else {
      setDomainSelected(domain)
      setSelectedChain(domains[0])
      navigate(`/${selectedChain.urls.page}`)
    }
  }

  const domainAvailable = selectedChain.title !== 'Gemini 3f' && selectedChain.title !== 'Gemini 2a'

  return (
    <div
      className='w-full h-[60px] bg-white dark:bg-[#1E254E] z-10'
      id='accordion-open'
      data-accordion='open'
    >
      <div className='w-full flex justify-between container py-3 items-center px-5 md:px-[25px] 2xl:px-0 mx-auto'>
        <div className='flex gap-9'>
          {DOMAINS.map((item, index) => {
            const isActive = domainSelected === item
            return (
              <div className='text-[13px] font-semibold items-center flex' key={`${item}-${index}`}>
                <button
                  disabled={!domainAvailable}
                  onClick={() => handleDomainSelected(item)}
                  className={
                    isActive
                      ? 'bg-[#241235] rounded-full py-2 px-4 dark:bg-[#DE67E4] text-white'
                      : domainAvailable
                      ? 'bg-white text-[#282929] dark:text-white dark:bg-[#1E254E]'
                      : 'bg-white text-[#5b6161] dark:text-white/50 dark:bg-[#1E254E]'
                  }
                >
                  {item}
                </button>
              </div>
            )
          })}
        </div>
        <div className='flex gap-4'>
          <span className='text-[#857EC2] dark:text-white font-medium text-[13px] leading-4'>
            All Domains
          </span>
          <button
            onClick={() => setIsActive(!isActive)}
            className=' w-4 h-4 text-[#241235] dark:text-white'
          >
            <BarsLeftIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DomainHeader
