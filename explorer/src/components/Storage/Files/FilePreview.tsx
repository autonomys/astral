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
      const { dataArrayBuffer } = extractFileData(data)
      const fileType = await detectFileType(dataArrayBuffer)
      setRawData({
        type: fileType,
        data: dataArrayBuffer,
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
            <div className='mb-4 w-full break-all rounded-lg border border-purpleLight bg-purpleLight p-4 shadow dark:border-none dark:bg-white/10'>
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
