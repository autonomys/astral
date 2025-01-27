import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Arguments } from 'components/common/Arguments'
import Image from 'next/image'
import { FC, useMemo } from 'react'
import { FileData } from 'utils/file'

type Props = {
  fileData: FileData
  fileType: string
  fileUrl: string
}

export const FilePreview: FC<Props> = ({ fileData, fileType, fileUrl }) => {
  const preview = useMemo(() => {
    if (!fileUrl) return <></>

    switch (true) {
      case fileData?.isEncrypted:
        return (
          <div className='flex items-center'>
            <LockClosedIcon className={'ml-2 size-6 shrink-0'} stroke='#DE67E4' />
            <p className='text-sm font-medium text-grayDarker dark:text-white md:text-xl'>
              No preview available for encrypted files
            </p>
          </div>
        )
      case fileType?.startsWith('image'):
        return (
          <Image
            src={fileUrl}
            alt='File Preview'
            width={520}
            height={520}
            style={{ width: '50%', height: 'auto' }}
          />
        )
      case fileType?.startsWith('application/pdf'):
      case fileType?.startsWith('application/ai'):
        return (
          <object data={fileUrl} type={fileType ?? ''} width='100%' height='800px'>
            <p>
              Alternative text - include a link <a href={fileUrl}>to the PDF!</a>
            </p>
          </object>
        )
      case fileType && fileData !== null: {
        try {
          return (
            <div className='mb-4 w-full break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
              <Arguments
                args={JSON.parse(Buffer.from(fileData.dataArrayBuffer).toString('utf-8'))}
                collapseAtEntry={25}
              />
            </div>
          )
        } catch {
          return <div>No preview available</div>
        }
      }
      default:
        return <div>No preview available</div>
    }
  }, [fileUrl, fileData, fileType])

  return (
    <div className='flex justify-center'>
      <div className='mb-4 flex w-full items-center justify-center break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
        {fileUrl && preview}
        {!fileUrl && <p>No preview available.</p>}
      </div>
    </div>
  )
}
