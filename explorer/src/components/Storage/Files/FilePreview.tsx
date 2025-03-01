import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Arguments } from 'components/common/Arguments'
import { Modal } from 'components/common/Modal'
import Image from 'next/image'
import { FC, useCallback, useMemo, useState } from 'react'
import { FileData } from 'utils/file'
type Props = {
  fileData: FileData
  fileType: string
  fileUrl: string
  onConfirm: (password: string) => void
}

const PasswordModal: FC<{
  isOpen: boolean
  onClose: () => void
  onConfirm: (password: string) => void
}> = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('')

  const handleConfirm = useCallback(() => {
    onConfirm(password)
    onClose()
    setPassword('')
  }, [onConfirm, onClose, setPassword, password])

  return (
    <Modal title='Enter Decryption Password' isOpen={isOpen} onClose={onClose}>
      <div className='text-center'>
        <input
          id='password'
          type='password'
          placeholder='Enter Password'
          className='w-full rounded-full border p-2 text-gray-900 dark:border-gray-700 dark:bg-blueAccent dark:text-white'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='mt-4 rounded-full bg-buttonLightFrom px-4 py-2 font-semibold leading-4 text-white dark:bg-primaryAccent'
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </Modal>
  )
}

export const FilePreview: FC<Props> = ({ fileData, fileType, fileUrl, onConfirm }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const preview = useMemo(() => {
    if (!fileUrl) return <></>

    switch (true) {
      case fileData?.isEncrypted:
        return (
          <div className='flex items-center'>
            <LockClosedIcon className={'ml-2 size-6 shrink-0'} stroke='#DE67E4' />
            <p className='text-sm font-medium text-grayDarker dark:text-white md:text-xl'>
              No preview due to the file been encrypted.
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
    <>
      <div className='flex justify-center'>
        <div className='mb-4 flex w-full items-center justify-center break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
          {fileUrl && preview}
          {!fileUrl && <p>No preview available.</p>}
          {fileData?.isEncrypted && (
            <div className='ml-4 flex justify-center'>
              <button
                onClick={() => setModalOpen(true)}
                className='block rounded-lg bg-buttonLightFrom px-3 py-3 text-[13px] font-semibold leading-4 text-white dark:bg-primaryAccent'
              >
                Decrypt File
              </button>
            </div>
          )}
        </div>
      </div>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={onConfirm}
      />
    </>
  )
}
