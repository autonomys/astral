import { Dialog, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ImageType } from 'enum/profile'
import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export type ImageCropModalProps = {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onSaveImage: (cid: string) => void
  type: ImageType
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
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

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

  // Upload image to server and get CID
  const uploadImageToCID = async (imageDataUrl: string) => {
    try {
      setIsUploading(true)
      setUploadProgress(0)

      // Convert data URL to Blob
      const fetchRes = await fetch(imageDataUrl)
      const blob = await fetchRes.blob()

      // Create FormData
      const formData = new FormData()
      formData.append('file', blob, `${type}_image.jpg`)

      // Upload using the profile-upload API
      const response = await fetch('/api/profile/profile-upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      setUploadProgress(100)
      return data.cid
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  // Poll for upload progress
  const checkUploadProgress = useCallback(async () => {
    if (!isUploading) return

    try {
      // In a real implementation, you might have an endpoint to check progress
      // For demonstration, we'll simulate progress
      let progress = 10
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5
        if (progress > 90) {
          progress = 90 // Max out at 90% until complete
          clearInterval(interval)
        }
        setUploadProgress(progress)
      }, 500)

      return () => clearInterval(interval)
    } catch (error) {
      console.error('Error checking upload progress:', error)
    }
  }, [isUploading])

  // Start polling when uploading begins
  useEffect(() => {
    let cleanup: (() => void) | undefined

    if (isUploading) {
      const setup = async () => {
        cleanup = await checkUploadProgress()
      }
      setup()
    }

    return () => {
      if (cleanup) cleanup()
    }
  }, [isUploading, checkUploadProgress])

  // Add an onImageLoad handler to set initial crop values
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget

    // Calculate initial crop based on the aspect ratio
    const initialCrop: Crop = {
      unit: '%',
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    }

    // Set both the crop and completedCrop states
    setCrop(initialCrop)

    // Also set the completedCrop with pixel values
    setCompletedCrop({
      unit: 'px',
      width,
      height,
      x: 0,
      y: 0,
    })
  }

  // Save the cropped image
  const handleSave = async () => {
    if (imgRef.current && completedCrop) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, completedCrop)
        if (croppedImageUrl) {
          setIsUploading(true)
          const cid = await uploadImageToCID(croppedImageUrl)
          onSaveImage(cid)
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
                      onLoad={onImageLoad}
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

                {/* Progress bar */}
                {isUploading && (
                  <div className='mb-4 mt-2 w-full'>
                    <div className='mb-1 text-sm text-gray-700 dark:text-gray-300'>
                      Uploading: {uploadProgress}%
                    </div>
                    <div className='h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
                      <div
                        className='h-2.5 rounded-full bg-blue-600 transition-all duration-300 ease-in-out'
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className='mt-4 flex justify-end space-x-3'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    onClick={() => onClose()}
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isUploading}
                    className={`inline-flex justify-center rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none ${
                      isUploading
                        ? 'cursor-not-allowed bg-gray-400'
                        : 'bg-buttonLightFrom hover:bg-buttonLightTo dark:bg-primaryAccent dark:hover:bg-blue-700'
                    }`}
                  >
                    {isUploading ? 'Uploading...' : 'Save'}
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
