import { Arguments } from 'components/common/Arguments'
import { FC } from 'react'
import { FileData } from 'utils/file'

type Props = {
  fileData: FileData
}

export const FileUploadOptions: FC<Props> = ({ fileData }) => {
  return (
    <div className='flex justify-center'>
      <div className='mb-4 w-full break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
        <Arguments args={fileData.uploadOptions} collapseAtEntry={25} />
      </div>
    </div>
  )
}
