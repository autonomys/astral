import { PageTabs } from 'components/common/PageTabs'
import { Spinner } from 'components/common/Spinner'
import { Tab } from 'components/common/Tabs'
import { NotFound } from 'components/layout/NotFound'
import { FileByIdQuery, GetCidDocument, GetCidQuery, GetCidQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'
import { decryptFileData, detectFileType, extractFileData, FileData } from 'utils/file'
import { FilePreview } from './FilePreview'
import { FileRawData } from './FileRawData'
import { FileUploadOptions } from './FileUploadOptions'

type Props = {
  file: NonNullable<FileByIdQuery['files_files'][number]>
  isDesktop?: boolean
}

export const FileDetailsTab: FC<Props> = ({ file, isDesktop = false }) => {
  const { ref, inView } = useInView()
  const inFocus = useWindowFocus()
  const [fileData, setFileData] = useState<FileData | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  const { loading, data } = useIndexersQuery<GetCidQuery, GetCidQueryVariables>(GetCidDocument, {
    variables: { cid: file.id ?? '' },
    skip: !inFocus || !inView,
  })

  const processFileData = useCallback(async (fileData: FileData) => {
    const _fileType = await detectFileType(fileData.dataArrayBuffer)

    const type = _fileType === 'unknown' ? 'application/json' : _fileType
    setFileData(fileData)
    setFileType(type)
    if (fileData) {
      if (type?.startsWith('image/svg')) {
        const url = `data:${type};charset=utf-8,${encodeURIComponent(Buffer.from(fileData.dataArrayBuffer).toString('utf-8'))}`
        setFileUrl(url)
        return () => {}
      } else {
        const url = URL.createObjectURL(new Blob([fileData.dataArrayBuffer], { type }))
        setFileUrl(url)
        return () => {
          URL.revokeObjectURL(url)
        }
      }
    }
  }, [])

  const handleConfirm = useCallback(
    async (password: string) => {
      if (!fileData) return

      let decryptedFileData
      try {
        decryptedFileData = await decryptFileData(password, fileData)
        if (!decryptedFileData) {
          throw new Error('Decryption failed: Incorrect password')
        }
      } catch (error) {
        toast.error('Decryption failed: Incorrect password', { position: 'bottom-center' })
        return
      }

      await processFileData(decryptedFileData)
    },
    [fileData, processFileData],
  )

  const getDataDetails = useCallback(async () => {
    if (!data) return
    const _fileData = extractFileData(data)
    if (!_fileData) return
    await processFileData(_fileData)
  }, [data, processFileData])

  const downloadFile = useCallback(async () => {
    if (!fileData || !fileUrl) return
    const a = document.createElement('a')
    a.href = fileUrl
    a.download = fileData.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [fileData, fileUrl])

  useEffect(() => {
    getDataDetails()
  }, [getDataDetails])

  if (loading) return <Spinner isXSmall />
  if (!data || !fileData) return <NotFound />

  return (
    <div ref={ref}>
      <PageTabs isDesktop={isDesktop}>
        {fileType && fileUrl ? (
          <Tab title='File Preview'>
            <FilePreview
              fileData={fileData}
              fileType={fileType}
              fileUrl={fileUrl}
              onConfirm={handleConfirm}
            />
          </Tab>
        ) : (
          <></>
        )}
        <Tab title='Download' onClick={downloadFile}>
          <div className='flex justify-center'>
            <div className='mb-4 flex w-full items-center justify-center break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
              Your download should start shortly.
            </div>
          </div>
        </Tab>
        <Tab title='File Upload Options'>
          <FileUploadOptions fileData={fileData} />
        </Tab>
        <Tab title='Raw File Data'>
          <FileRawData fileData={fileData} />
        </Tab>
      </PageTabs>
    </div>
  )
}
