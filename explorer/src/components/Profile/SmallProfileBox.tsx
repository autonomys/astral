import { ArrowTopRightOnSquareIcon, GlobeAltIcon, PencilIcon } from '@heroicons/react/24/outline'
import { SocialLink } from 'components/common/SocialLink'
import { ImageType } from 'enum/profile'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { useProfileStates } from 'states/profile'
import { ImageCropModal } from '../common/ImageCropModal'
import { Spinner } from '../common/Spinner'

interface SmallProfileBoxProps {
  showPrivateDetails?: boolean
}

const defaultAvatar = '/images/avatar.svg'
const defaultBanner = '/images/autonomys-banner.webp'

export const SmallProfileBox: FC<SmallProfileBoxProps> = ({ showPrivateDetails }) => {
  const { data: session } = useSession()
  const { chain } = useParams()
  const { getUserProfile, shouldUpdate, setShouldUpdate, profile, isLoading } = useProfileStates(
    (state) => state,
  )
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  // Simplified state for image handling
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [showAvatarModal, setShowAvatarModal] = useState(false)

  // Reset previews when profile changes
  useEffect(() => {
    setBannerPreview(null)
    setAvatarPreview(null)
  }, [profile])

  useEffect(() => {
    if (session && session.user?.subspace && shouldUpdate) {
      const { account, message, signature } = session.user.subspace
      getUserProfile(account, message, signature)
    }
  }, [getUserProfile, session, shouldUpdate])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: ImageType) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (type === ImageType.Banner) {
        setBannerPreview(reader.result as string)
        setShowBannerModal(true)
      } else {
        setAvatarPreview(reader.result as string)
        setShowAvatarModal(true)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveCroppedImage = async (cid: string | undefined, type: ImageType) => {
    if (cid && session?.user?.subspace) {
      const loadingToastId = toast.loading(`Updating ${type}...`)
      try {
        const { account, message, signature } = session.user.subspace
        const values = {
          ...profile,
          [type]: `${process.env.NEXT_PUBLIC_FILE_GATEWAY_URL}/${cid}`,
        }

        const response = await fetch('/api/profile/save-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subspaceAccount: account,
            values,
            message,
            signature,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          const errorMessage = errorData?.message || `Failed to update ${type}`
          toast.error(errorMessage, { id: loadingToastId })
          throw new Error(errorMessage)
        }

        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`, {
          id: loadingToastId,
        })
        setShouldUpdate(true)
      } catch (error) {
        console.error(`Error updating ${type}:`, error)
        toast.error(`Failed to update ${type}. Please try again.`, { id: loadingToastId })
      }
    }
  }

  const handleCancelUpload = (type: ImageType) => {
    if (type === ImageType.Banner) {
      setBannerPreview(null)
      setShowBannerModal(false)
    } else {
      setAvatarPreview(null)
      setShowAvatarModal(false)
    }
  }

  return (
    <div className='flex flex-col space-y-4 text-grayDarker dark:text-white sm:w-1/3'>
      <div className='overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md dark:border-none dark:bg-boxDark'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <>
            <div className='relative h-48'>
              <div className='relative h-full w-full overflow-hidden'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bannerPreview || profile?.banner || defaultBanner}
                  alt='Profile Banner'
                  className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
                />
                <button
                  onClick={() => bannerInputRef.current?.click()}
                  className='absolute bottom-3 right-3 rounded-full bg-white p-2.5 shadow-lg transition-all hover:bg-gray-50 hover:shadow-md dark:bg-boxDark dark:hover:bg-gray-800'
                  aria-label='Upload banner image'
                >
                  <PencilIcon className='h-4 w-4 text-primaryAccent dark:text-gray-200' />
                </button>

                <input
                  ref={bannerInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleImageUpload(e, ImageType.Banner)}
                />
              </div>

              <div className='absolute -bottom-12 left-6 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105 dark:border-boxDark'>
                <div className='relative h-full w-full'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarPreview || profile?.avatar || defaultAvatar}
                    alt='Profile Icon'
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>

              <button
                onClick={() => avatarInputRef.current?.click()}
                className='absolute -bottom-0 left-[104px] z-20 rounded-md border border-gray-100 bg-white p-1 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg dark:border-gray-700 dark:bg-boxDark dark:hover:bg-gray-800'
                aria-label='Upload profile image'
              >
                <PencilIcon className='h-3 w-3 text-primaryAccent dark:text-gray-200' />
              </button>

              <input
                ref={avatarInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => handleImageUpload(e, ImageType.Avatar)}
              />
            </div>

            <div className='px-6 pb-6 pt-14'>
              {profile?.id && (
                <div className='mb-4'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                      {profile?.name || 'Profile Name'}
                    </h2>
                    <a
                      href={`/${chain}/profile/${profile?.id}`}
                      className='inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Public Profile
                      <ArrowTopRightOnSquareIcon className='ml-1.5 h-4 w-4' />
                    </a>
                  </div>
                  <p className='mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
                    {profile?.description || 'No description available'}
                  </p>
                </div>
              )}

              <div className='mt-4 flex items-center rounded-lg transition-colors'>
                <SocialLink
                  icon={<GlobeAltIcon className='h-4 w-4 text-gray-700 dark:text-gray-300' />}
                  value={profile?.website}
                  url={profile?.website}
                  iconBgClass='bg-gray-50 dark:bg-gray-800'
                  className='p-0 py-2'
                />
              </div>
            </div>
          </>
        )}
      </div>

      {showPrivateDetails && (
        <div className='rounded-[20px] bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-none dark:bg-boxDark'>
          {isLoading ? (
            <div className='flex h-full w-full items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <>
              <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>
                Contact Information
              </h3>

              <div className='space-y-4'>
                <SocialLink
                  icon={<MdEmail className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                  label='Email'
                  value={profile?.email}
                  url={profile?.email ? `mailto:${profile.email}` : null}
                  isExternal={false}
                />

                <SocialLink
                  icon={<FaDiscord className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                  label='Discord'
                  value={profile?.discord}
                  url={profile?.discord ? `https://discord.com/users/${profile.discord}` : null}
                />

                <SocialLink
                  icon={<FaGithub className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                  label='GitHub'
                  value={profile?.github}
                  url={profile?.github ? `https://github.com/${profile.github}` : null}
                />

                <SocialLink
                  icon={<FaXTwitter className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                  label='Twitter'
                  value={profile?.twitter}
                  url={
                    profile?.twitter
                      ? `https://twitter.com/${profile.twitter.replace('@', '')}`
                      : null
                  }
                />
              </div>
            </>
          )}
        </div>
      )}

      {bannerPreview && (
        <ImageCropModal
          isOpen={showBannerModal}
          onClose={() => handleCancelUpload(ImageType.Banner)}
          imageUrl={bannerPreview}
          onSaveImage={(cid) => {
            handleSaveCroppedImage(cid, ImageType.Banner)
          }}
          type={ImageType.Banner}
        />
      )}

      {avatarPreview && (
        <ImageCropModal
          isOpen={showAvatarModal}
          onClose={() => handleCancelUpload(ImageType.Avatar)}
          imageUrl={avatarPreview}
          onSaveImage={(cid) => {
            handleSaveCroppedImage(cid, ImageType.Avatar)
          }}
          type={ImageType.Avatar}
        />
      )}
    </div>
  )
}
