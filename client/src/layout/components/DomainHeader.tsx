import { FC } from 'react'

// common
import { Tabs, Tab } from 'common/components'
import { useDomains } from 'common/providers/DomainProvider'

const DomainHeader: FC = () => {
  const { updateDomainAddress, domains } = useDomains()

  return (
    <div className='px-4 xl:px-0 z-10'>
      <Tabs
        tabStyle='bg-[#241235] rounded-full mt-5 px-4 container mx-auto'
        pillStyle='bg-[#241235] text-white'
        activePillStyle='bg-[#DE67E4] text-white'
      >
        {domains.map((item, index) => (
          <Tab
            key={`${item.title}-${index}`}
            title={item.title}
            onClick={() => updateDomainAddress(item.urls.api)}
          ></Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default DomainHeader
