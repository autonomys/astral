import { Button } from '@/components/common/Button'
import { NetworkId } from '@autonomys/auto-utils'
import { PageTabs } from 'components/common/PageTabs'
import { Spinner } from 'components/common/Spinner'
import { Tab } from 'components/common/Tabs'
import { NotFound } from 'components/layout/NotFound'
import { FileByIdQuery, GetCidDocument, GetCidQuery, GetCidQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
// import toast from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'
import { decryptFileData, detectFileType, extractFileData, FileData } from 'utils/file'
// import { FilePreview } from './FilePreview'
import { OffchainMetadata } from '@autonomys/auto-dag-data'
import { FilePreview } from '@autonomys/auto-design-system'
import { FileRawData } from './FileRawData'
import { FileUploadOptions } from './FileUploadOptions'

type Props = {
  file: NonNullable<FileByIdQuery['files_files'][number]>
  isDesktop?: boolean
}

const EXTERNAL_ROUTES = {
  gatewayObjectDownload: (cid: string) => `https://gateway.autonomys.xyz/file/${cid}`,
}

export const FileDetailsTab: FC<Props> = ({ file, isDesktop = false }) => {
  const { ref, inView } = useInView()
  const inFocus = useWindowFocus()
  const [fileData, setFileData] = useState<FileData | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  const [isFilePreview, setIsFilePreview] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const [decryptionError, setDecryptionError] = useState<string | null>(null)
  const [fileBlob, setFileBlob] = useState<Blob | null>(null)
  const [textContent, setTextContent] = useState<string | null>(null)

  const [cleanupFn, setCleanupFn] = useState<(() => void) | null>(null)

  const { loading: loadingCid, data } = useIndexersQuery<GetCidQuery, GetCidQueryVariables>(
    GetCidDocument,
    {
      variables: { cid: file.id ?? '' },
      skip: !inFocus || !inView,
    },
  )

  const gatewayUrl = useMemo(() => {
    if (file.id) {
      return EXTERNAL_ROUTES.gatewayObjectDownload(file.id)
    }
    return null
  }, [file.id])

  const processFileData = useCallback(async (fileData: FileData) => {
    const _fileType = await detectFileType(fileData.dataArrayBuffer)

    const type = _fileType === 'unknown' ? 'application/json' : _fileType
    setFileData(fileData)
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

  // const handleConfirm = useCallback(
  //   async (password: string) => {
  //     if (!fileData) return

  //     let decryptedFileData
  //     try {
  //       decryptedFileData = await decryptFileData(password, fileData)
  //       if (!decryptedFileData) {
  //         throw new Error('Decryption failed: Incorrect password')
  //       }
  //     } catch (error) {
  //       toast.error('Decryption failed: Incorrect password', { position: 'bottom-center' })
  //       return
  //     }

  //     await processFileData(decryptedFileData)
  //   },
  //   [fileData, processFileData],
  // )

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

  const metadata: OffchainMetadata = useMemo(
    () => ({
      name: fileData?.name ?? '',
      type: 'file',
      chunks: [],
      dataCid: file.id,
      mimeType: fileBlob?.type ?? '',
      totalSize: BigInt(0),
      totalChunks: 1,
      uploadOptions: fileData?.uploadOptions ?? undefined,
    }),
    [fileData, fileBlob, file.id],
  )
  console.log('metadata', metadata)
  console.log('fileData', fileData)
  console.log('fileBlob', fileBlob)
  console.log('file', file)

  const processFileDataFromGateway = useCallback(
    async (fileData: FileData) => {
      // Cleanup previous URL if exists
      if (cleanupFn) {
        cleanupFn()
        setCleanupFn(null)
      }

      const detectedType = await detectFileType(fileData.dataArrayBuffer)
      const type = detectedType === 'unknown' ? 'application/octet-stream' : detectedType

      console.log('Detected file type:', type)
      console.log('File size:', fileData.dataArrayBuffer.byteLength)

      if (type?.startsWith('image/svg')) {
        const url = `data:${type};charset=utf-8,${encodeURIComponent(
          Buffer.from(fileData.dataArrayBuffer).toString('utf-8'),
        )}`
        setFileUrl(url)
        setFileBlob(new Blob([fileData.dataArrayBuffer], { type }))
        setCleanupFn(() => () => {}) // No cleanup needed for data URLs
      } else {
        const blob = new Blob([fileData.dataArrayBuffer], { type })
        const url = URL.createObjectURL(blob)
        setFileUrl(url)
        setFileBlob(blob)
        setCleanupFn(() => () => {
          URL.revokeObjectURL(url)
        })
      }
    },
    [cleanupFn],
  )

  const fetchFile = useCallback(
    async (password?: string) => {
      if (metadata.totalSize > BigInt(1000000000) || !gatewayUrl) {
        setIsFilePreview(false)
        setLoading(false)
        return
      }

      console.log('fetching file')

      // If file is encrypted and no password provided, don't fetch but allow preview to show modal
      if (metadata.uploadOptions?.encryption && !password && !isDecrypted) {
        setIsFilePreview(true)
        setLoading(false)
        return
      }

      setIsFilePreview(true)
      setLoading(true)
      setError(null)
      setDecryptionError(null)

      try {
        const response = await fetch(gatewayUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
        }

        const blob = await response.blob()

        console.log('blob', blob)

        // Handle decryption if needed
        if (metadata.uploadOptions?.encryption && password) {
          try {
            console.log('Decrypting file with password:', password)

            // Create FileData object from encrypted blob
            const encryptedFileData: FileData = {
              dataArrayBuffer: await blob.arrayBuffer(),
              name: metadata?.name ?? '',
              uploadOptions: metadata.uploadOptions,
              isEncrypted: true,
              rawData: '',
            }

            // Use enhanced decryption function (handles both decryption and decompression)
            const decryptedFileData = await decryptFileData(password, encryptedFileData)

            console.log(
              'Decryption successful, file size:',
              decryptedFileData.dataArrayBuffer.byteLength,
            )

            // Process with enhanced pattern (includes file type detection)
            await processFileDataFromGateway(decryptedFileData)
            setIsDecrypted(true)
            setLoading(false)
            return
          } catch (decryptError) {
            console.error('Decryption failed:', decryptError)
            setDecryptionError('Invalid password or decryption failed')
            setLoading(false)
            return
          }
        }

        setFileBlob(blob)
        console.log('Final blob set to file state:', blob)
        console.log('Final blob type:', blob.type)
        console.log('Final blob size:', blob.size)

        // For text-based files, also read the content
        const extension = metadata.name?.split('.').pop()?.toLowerCase() || ''
        const mimeType =
          'mimeType' in metadata ? (metadata.mimeType as string)?.toLowerCase() || '' : ''

        if (
          mimeType.startsWith('text/') ||
          [
            'js',
            'jsx',
            'ts',
            'tsx',
            'html',
            'css',
            'py',
            'java',
            'rb',
            'go',
            'rust',
            'php',
            'json',
            'md',
            'txt',
            'csv',
            'xml',
          ].includes(extension)
        ) {
          try {
            const text = await blob.text()
            setTextContent(text)
          } catch (err) {
            console.error('Failed to read text from blob:', err)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching file:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch file')
        setLoading(false)
      }
    },
    [metadata, gatewayUrl, isDecrypted, processFileDataFromGateway],
  )

  useEffect(() => {
    fetchFile()
  }, [])

  console.log('loading', loading)

  if (loadingCid) return <Spinner isXSmall />
  if (!data || !fileData) return <NotFound />

  return (
    <div ref={ref}>
      <PageTabs pillStyle='py-2' activePillStyle='py-2' isDesktop={isDesktop}>
        <Tab title='File Preview'>
          <FilePreview
            metadata={metadata}
            network={NetworkId.TAURUS}
            isAstral={true}
            file={fileBlob}
            error={error}
            decryptionError={decryptionError}
            textContent={textContent}
            gatewayUrl={EXTERNAL_ROUTES.gatewayObjectDownload(file.id)}
            handleDecrypt={fetchFile}
            isDecrypted={isDecrypted}
            loading={loading}
            isFilePreview={isFilePreview}
          />
        </Tab>
        <Tab title='Download'>
          <div className='flex justify-center'>
            <div className='mb-4 flex w-full flex-col items-center justify-center gap-4 break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
              <Button onClick={downloadFile} className='w-full'>
                Download
              </Button>

              <ul className='text-sm text-gray-500'>
                File name: <b>{fileData.name}</b>
              </ul>
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
