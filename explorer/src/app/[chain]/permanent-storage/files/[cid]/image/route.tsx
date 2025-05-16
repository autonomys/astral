/* eslint-disable react/no-unknown-property */
import { DocumentIcon } from '@heroicons/react/24/outline'
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { FileByIdDocument, FileByIdQuery, GetCidDocument, GetCidQuery } from 'gql/graphql'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { ChainPageProps, CIDPageProps } from 'types/app'
import { detectFileType, extractFileData } from 'utils/file'

export async function GET(
  req: NextRequest,
  { params: { chain, cid } }: ChainPageProps & CIDPageProps,
) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)

  if (!cid || !chainMatch) notFound()

  // Fetch file metadata
  const {
    data: { files_files: fileById },
  }: {
    data: FileByIdQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: FileByIdDocument['loc']?.source.body,
      variables: { cid },
    }),
  }).then((res) => res.json())

  if (!fileById || fileById.length === 0) notFound()

  // Fetch file content
  const {
    data: fileData,
  }: {
    data: GetCidQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GetCidDocument['loc']?.source.body,
      variables: { cid },
    }),
  }).then((res) => res.json())

  try {
    const file = fileById[0]
    let filePreviewInfo = null

    // Extract file data if available
    if (fileData) {
      const extractedFileData = extractFileData(fileData)
      if (extractedFileData) {
        const fileType = await detectFileType(extractedFileData.dataArrayBuffer)
        filePreviewInfo = {
          type: fileType,
          isImage: fileType.startsWith('image'),
          isEncrypted: extractedFileData.isEncrypted,
        }
      }
    }

    return new ImageResponse(
      <Screen chainMatch={chainMatch} cid={cid} file={file} filePreviewInfo={filePreviewInfo} />,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error('Error in image route', e)
    notFound()
  }
}

function Screen({
  chainMatch,
  cid,
  file,
  filePreviewInfo,
}: {
  chainMatch: (typeof indexers)[number]
  cid: string
  file: FileByIdQuery['files_files'][number]
  filePreviewInfo: { type: string; isImage: boolean; isEncrypted: boolean } | null
}) {
  const title = `${metadata.title} - ${chainMatch.title} - File`

  const fileIcon = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '4rem',
        height: '4rem',
        backgroundColor: '#3B82F6',
        borderRadius: '9999px',
      }}
    >
      <DocumentIcon style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
    </div>
  )

  // File details to display
  const fileName = file.name || 'Unnamed File'
  // Use cid timestamp instead of size/created_at which may not exist on the type
  const timestamp = file.cid?.timestamp
    ? new Date(parseInt(file.cid.timestamp)).toLocaleString()
    : 'Unknown'
  const fileType = filePreviewInfo?.type || 'Unknown type'
  const encryptionStatus = filePreviewInfo?.isEncrypted ? 'Encrypted' : 'Not encrypted'

  return (
    <div
      tw='relative w-full h-full flex flex-col items-center justify-between'
      style={{
        background: 'linear-gradient(180deg, #050D26 0%, #27355D 100%)',
      }}
    >
      <div
        tw='absolute flex flex-row border-none rounded-[20px] p-4 w-240 h-40'
        style={{
          background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
        }}
      >
        <h2
          style={{
            fontFamily: 'Montserrat',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          tw='absolute text-4xl text-white p-4 font-bold'
        >
          <AutonomysSymbol fill='white' />
          {title}
        </h2>
        <h3
          style={{
            fontFamily: 'Montserrat',
          }}
          tw='absolute text-2xl text-white p-4 mt-18 font-bold'
        >
          {fileName}
        </h3>
      </div>

      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-30 mt-70 mb-4 p-6 w-100 h-40'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-100 m-6'>
            {fileIcon()}
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              CID: {cid.substring(0, 10)}...
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Type: {fileType}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-16 font-bold'
            >
              Status: {encryptionStatus}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-140 mt-70 mb-4 p-6 w-130 h-40'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-130 m-6'>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-md text-white p-4 font-bold'
            >
              Block: {file.cid?.blockHeight || 'Unknown'}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-md text-white p-4 mt-8 font-bold'
            >
              Uploaded: {timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
