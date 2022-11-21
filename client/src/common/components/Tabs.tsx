import { FC, ReactElement, useState } from 'react'

type Tab = {
  title: string
  content: string | ReactElement
}

type Props = {
  id: string
  tabs: Tab[]
  initialIndex?: number
  bgColor?: string
}

const Tabs: FC<Props> = ({ id, bgColor = 'bg-[#241235]', tabs, initialIndex = 0 }) => {
  const [openTab, setOpenTab] = useState(initialIndex)

  return (
    <>
      <div className='flex flex-wrap bg-white border border-slate-100 shadow rounded-lg p-4'>
        <div className='w-full'>
          <ul className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row' role='tablist'>
            {tabs.map(({ title }, index) => (
              <li key={`${id}-tab-${index}`} className='-mb-px mr-2 last:mr-0 text-center'>
                <a
                  className={
                    'text-xs font-semibold px-5 py-3 rounded-full block leading-normal ' +
                    (openTab === index ? `text-white ${bgColor}` : 'text-gray-600 bg-white')
                  }
                  data-toggle='tab'
                  href={`#link${index}`}
                  role='tablist'
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(index)
                  }}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded'>
            <div className='px-4 py-5 flex-auto'>
              <div className='tab-content tab-space'>
                {tabs.map(({ content }, index) => (
                  <div
                    key={`${id}-content-${index}`}
                    className={openTab === index ? 'block' : 'hidden'}
                    id={`link${index}`}
                  >
                    {content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tabs
