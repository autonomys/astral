import { Dialog, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { FC, Fragment, useCallback, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onSaveImage: (croppedImageUrl: string) => void
  type: 'banner' | 'avatar'
  aspectRatio?: number // Optional: default will depend on type
}

export const ImageCropModal: FC<ImageCropModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onSaveImage,
  type,
  aspectRatio,
}) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const isAvatar = type === 'avatar'

  // Set default aspect ratio based on type if not provided
  const defaultAspectRatio = isAvatar ? 1 : 3 / 1
  const calculatedAspectRatio = aspectRatio || defaultAspectRatio

  // Internal state for crop and zoom
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [zoom, setZoom] = useState(1)

  // Zoom controls
  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 3))
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5))

  // Generate cropped image data
  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop) => {
      const canvas = document.createElement('canvas')
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return null
      }

      canvas.width = crop.width
      canvas.height = crop.height

      // Apply zoom factor
      ctx.drawImage(
        image,
        (crop.x * scaleX) / zoom,
        (crop.y * scaleY) / zoom,
        (crop.width * scaleX) / zoom,
        (crop.height * scaleY) / zoom,
        0,
        0,
        crop.width,
        crop.height,
      )

      // For avatars, create a circular crop
      if (isAvatar) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = Math.min(centerX, centerY)

        ctx.globalCompositeOperation = 'destination-in'
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true)
        ctx.fill()
      }

      return new Promise<string>((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            return
          }
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
        }, 'image/jpeg')
      })
    },
    [zoom, isAvatar],
  )

  // Save the cropped image
  const handleSave = async () => {
    if (imgRef.current && completedCrop) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop)
        if (croppedImageUrl) {
          onSaveImage(croppedImageUrl)
        }
      } catch (e) {
        console.error('Error saving cropped image:', e)
      }
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`w-full ${isAvatar ? 'max-w-md' : 'max-w-xl'} rounded-lg bg-white p-6 shadow-lg dark:bg-boxDark`}
              >
                <Dialog.Title className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>
                  {isAvatar ? 'Adjust Profile Picture' : 'Adjust Banner Image'}
                </Dialog.Title>

                {/* Cropping area */}
                <div className={isAvatar ? 'mx-auto max-w-[200px]' : 'relative w-full'}>
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    circularCrop={isAvatar}
                    aspect={calculatedAspectRatio}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={imgRef}
                      src={imageUrl}
                      alt={`${isAvatar ? 'Avatar' : 'Banner'} Preview`}
                      className={`w-full ${!isAvatar ? 'rounded-md' : ''} object-cover`}
                      style={{ transform: `scale(${zoom})` }}
                    />
                  </ReactCrop>
                </div>

                {/* Zoom controls */}
                <div className='my-4 flex items-center justify-center space-x-4'>
                  <button
                    onClick={handleZoomOut}
                    className='rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                  >
                    <MinusIcon className='h-5 w-5' />
                  </button>
                  <span className='text-sm text-gray-900 dark:text-white'>
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className='rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                  >
                    <PlusIcon className='h-5 w-5' />
                  </button>
                </div>

                <div className='mt-4 flex justify-end space-x-3'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className='inline-flex justify-center rounded-full border border-transparent bg-buttonLightFrom px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none dark:bg-primaryAccent'
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
