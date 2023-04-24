import { FC } from 'react'

// common
import { Tabs, Tab } from 'common/components'
import useDomains from 'common/hooks/useDomains'

// TODO: add DomainHeader to the App.tsx once we have support for domains
const DomainHeader: FC = () => {
  const { setSelectedChain, chains } = useDomains()
  return (
    <div className='px-4 xl:px-0 z-10'>
      <Tabs
        tabStyle='bg-[#241235] rounded-full mt-5 px-4 container mx-auto dark:bg-[#1E254E]'
        pillStyle='bg-[#241235] text-white dark:bg-[#1E254E]'
        activePillStyle='bg-[#DE67E4] text-white'
      >
        {chains.map((item, index) => (
          <Tab
            key={`${item.title}-${index}`}
            title={item.title}
            onClick={() => setSelectedChain(item)}
          ></Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default DomainHeader
