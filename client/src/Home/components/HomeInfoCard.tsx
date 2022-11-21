import { FC, ReactElement } from 'react'

type Props = {
  title: string
  value: string
  icon: ReactElement
  additionalClass?: string
}

const HomeInfoCard: FC<Props> = ({
  title,
  icon,
  value,
  additionalClass = '',
}) => {
  return (
    <div className={`w-full lg:w-1/2 md:w-full ${additionalClass}`}>
      <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-6 sm:flex-row flex-col">
        <div className="flex-grow">
          <h2 className="text-gray-900 text-md title-font font-medium mb-3">
            {title}
          </h2>
          <p className="leading-relaxed text-base">{value}</p>
        </div>
        <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center flex-shrink-0 justify-end">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default HomeInfoCard
