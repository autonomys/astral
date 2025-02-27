import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Arguments } from 'components/common/Arguments'
import Image from 'next/image'
import { FC, useEffect, useMemo, useState } from 'react'
import { FileData } from 'utils/file'
type Props = {
  fileData: FileData
  fileType: string
  fileUrl: string
  onConfirm: (password: string) => void
}

const Modal: FC<{ isOpen: boolean; onClose: () => void, onConfirm: (password: string) => void }> = ({ isOpen, onClose, onConfirm }) => {
  const [password,setPassword]=useState('');
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div
        className="rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-xl text-center"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Enter Decrypting Password
        </h4>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:shadow-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-4 rounded-lg px-4 py-2 text-white bg-buttonLightFrom font-semibold leading-4 dark:bg-primaryAccent"
          onClick={() => {
            onConfirm(password); // Send password back to parent
            onClose(); // Close the modal
            setPassword('');
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
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
  useEffect(()=>{
    // console.trace();
  })
  return (
    <>
    <div className='flex justify-center'>
      <div className='mb-4 flex w-full items-center justify-center break-all rounded-lg border border-blueLight bg-blueLight p-4 shadow dark:border-none dark:bg-white/10'>
        {fileUrl && preview}
        {!fileUrl && <p>No preview available.</p>}
        {fileData?.isEncrypted && (
        <div className="flex justify-center ml-4">
          <button
            onClick={() => setModalOpen(true)}
            className="block rounded-lg bg-buttonLightFrom px-3 py-3 text-[13px] font-semibold leading-4 text-white dark:bg-primaryAccent"
          >
            Decrypt File
          </button>
        </div>
      )}
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={onConfirm}/>
    </>
  )
}
