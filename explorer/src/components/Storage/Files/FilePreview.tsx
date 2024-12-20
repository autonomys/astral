import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Arguments } from 'components/common/Arguments'
import { Spinner } from 'components/common/Spinner'
import { GetCidQuery, GetCidQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Image from 'next/image'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { detectFileType, extractFileData } from 'utils/file'
import { QUERY_CID } from './query'

type Props = {
  cid: string
}

type PreviewData = {
  type: string
  data: ArrayBuffer
  isEncrypted: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadOptions: any
}

export const FilePreview: FC<Props> = ({ cid }) => {
  const { ref, inView } = useInView()
  const inFocus = useWindowFocus()
  const [rawData, setRawData] = useState<PreviewData | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const { loading, data } = useIndexersQuery<GetCidQuery, GetCidQueryVariables>(QUERY_CID, {
    variables: { cid: cid ?? '' },
    skip: !inFocus || !inView,
  })

  const fetchData = useCallback(async () => {
    if (data) {
      const { dataArrayBuffer, isEncrypted, uploadOptions } = extractFileData(data)
      const fileType = await detectFileType(dataArrayBuffer)
      setRawData({
        type: fileType,
        data: dataArrayBuffer,
        isEncrypted,
        uploadOptions,
      })
    }
  }, [data])

  const getPreviewUrl = useCallback((rawData: PreviewData) => {
    if (rawData) {
      if (rawData.type.startsWith('image/svg')) {
        const url = `data:${rawData.type};charset=utf-8,${encodeURIComponent(Buffer.from(rawData.data).toString('utf-8'))}`
        setImageSrc(url)
        return () => {}
      } else {
        const url = URL.createObjectURL(new Blob([rawData.data], { type: rawData.type }))
        setImageSrc(url)
        return () => {
          URL.revokeObjectURL(url)
        }
      }
    }
  }, [])

  const preview = useMemo(() => {
    if (!imageSrc) return <></>

    switch (true) {
      case rawData?.isEncrypted:
        return (
          <div className='flex items-center'>
            <LockClosedIcon className={'ml-2 size-6 shrink-0'} stroke='#DE67E4' />
            <p className='text-sm font-medium text-grayDarker dark:text-white md:text-xl'>
              No preview available for encrypted files
            </p>
          </div>
        )
      case rawData?.type.startsWith('image'):
        return (
          <Image
            src={imageSrc}
            alt='File Preview'
            width={520}
            height={520}
            style={{ width: '50%', height: 'auto' }}
          />
        )
      case rawData?.type.startsWith('application/pdf'):
      case rawData?.type.startsWith('application/ai'):
        return (
          <object data={imageSrc} type={rawData?.type} width='100%' height='800px'>
            <p>
              Alternative text - include a link <a href={imageSrc}>to the PDF!</a>
            </p>
          </object>
        )
      case rawData?.type && rawData !== null: {
        try {
          return (
            <div className='border-blueLight bg-blueLight mb-4 w-full break-all rounded-lg border p-4 shadow dark:border-none dark:bg-white/10'>
              <Arguments
                args={JSON.parse(Buffer.from(rawData.data).toString('utf-8'))}
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
  }, [imageSrc, rawData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (rawData) getPreviewUrl(rawData)
  }, [rawData, getPreviewUrl])

  return (
    <div className='flex justify-center' ref={ref}>
      {loading && <Spinner isXSmall />}
      {imageSrc && preview}
      {!loading && !imageSrc && <p>No preview available.</p>}
    </div>
  )
}
