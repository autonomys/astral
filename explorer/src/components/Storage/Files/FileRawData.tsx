import { Arguments } from 'components/common/Arguments'
import { FC, useEffect, useState } from 'react'
import { FileData } from 'utils/file'

type Props = {
  fileData: FileData
}

export const FileRawData: FC<Props> = ({ fileData }) => {
  const [rawData, setRawData] = useState<object | null>(null)

  useEffect(() => {
    try {
      setRawData(Object.values(JSON.parse(fileData.rawData)))
    } catch (error) {
      console.error(error)
    }
  }, [fileData])

  return (
    <div className='flex justify-center'>
      <div className='mb-4 w-full break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
        <Arguments args={rawData} collapseAtEntry={25} />
      </div>
    </div>
  )
}
