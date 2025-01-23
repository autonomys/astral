import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Arguments } from 'components/common/Arguments'
import Image from 'next/image'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { detectFileType, FileData } from 'utils/file'

type Props = {
  fileData: FileData
}

export const FilePreview: FC<Props> = ({ fileData }) => {
  const [fileType, setFileType] = useState<string | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    const fileType = await detectFileType(fileData.dataArrayBuffer)
    setFileType(fileType)
  }, [fileData])

  const getPreviewUrl = useCallback(
    (fileData: FileData) => {
      if (fileData) {
        if (fileType?.startsWith('image/svg')) {
          const url = `data:${fileType};charset=utf-8,${encodeURIComponent(Buffer.from(fileData.rawData).toString('utf-8'))}`
          setImageSrc(url)
          return () => {}
        } else {
          const url = URL.createObjectURL(new Blob([fileData.rawData], { type: fileType ?? '' }))
          setImageSrc(url)
          return () => {
            URL.revokeObjectURL(url)
          }
        }
      }
    },
    [fileType],
  )

  const preview = useMemo(() => {
    if (!imageSrc) return <></>

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
            src={imageSrc}
            alt='File Preview'
            width={520}
            height={520}
            style={{ width: '50%', height: 'auto' }}
          />
        )
      case fileType?.startsWith('application/pdf'):
      case fileType?.startsWith('application/ai'):
        return (
          <object data={imageSrc} type={fileType ?? ''} width='100%' height='800px'>
            <p>
              Alternative text - include a link <a href={imageSrc}>to the PDF!</a>
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
  }, [imageSrc, fileData, fileType])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (fileData) getPreviewUrl(fileData)
  }, [fileData, getPreviewUrl])

  return (
    <div className='flex justify-center'>
      <div className='mb-4 w-full break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
        {imageSrc && preview}
        {!imageSrc && <p>No preview available.</p>}
      </div>
    </div>
  )
}
