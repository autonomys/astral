import { FC } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// common
import { EXTERNAL_ROUTES } from 'common/routes'
import { LogoIcon } from 'common/icons'

const Footer: FC = () => {
  return (
    <footer className="container font-['Montserrat'] mb-[50px] px-4 xl:px-0 sm:mx-auto">
      <div className='text-white body-font rounded-xl bg-[#241235] p-10 dark:bg-[#1E254E]'>
        <div className='md:grid md:grid-cols-2'>
          <div className='flex mb-20 md:mb-0 justify-center md:justify-start'>
            <div className='flex flex-col md:justify-between'>
              <div className='flex-shrink-0 md:mx-0 text-center md:text-left'>
                <Link to='/' className='flex title-font font-medium items-center'>
                  <LogoIcon />
                </Link>
              </div>
              <div className='container mx-auto pt-20 pb-1 pr-5 sm:flex flex-wrap hidden flex-col sm:flex-row'>
                <p className='text-white text-sm text-center sm:text-left'>
                  © {dayjs().year()} Subspace Labs, Inc. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2'>
            <div>
              <h2 className='mb-6 title-font uppercase font-semibold text-white text-sm'>Links:</h2>
              <ul className='text-gray-600 dark:text-gray-400'>
                <li className='mb-4'>
                  <a
                    href={EXTERNAL_ROUTES.forum}
                    target='_blank'
                    className='text-[#ffffffb3] hover:text-gray-800'
                    rel='noreferrer'
                  >
                    Forum
                  </a>
                </li>
                <li className='mb-4'>
                  <a
                    href={EXTERNAL_ROUTES.docs}
                    target='_blank'
                    className='text-[#ffffffb3] hover:text-gray-800'
                    rel='noreferrer'
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    target='_blank'
                    href={EXTERNAL_ROUTES.subspace}
                    className='text-[#ffffffb3] hover:text-gray-800'
                    rel='noreferrer'
                  >
                    Website
                  </a>
                </li>
              </ul>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <h2 className='mb-6 title-font uppercase font-semibold text-white text-sm'>
                  Social:
                </h2>
                <ul className='text-gray-600 dark:text-gray-400'>
                  <li className='mb-4'>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.twitter}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      Twitter
                    </a>
                  </li>
                  <li className='mb-4'>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.discord}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      Discord
                    </a>
                  </li>
                  <li className='mb-4'>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.telegram}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.github}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className='text-gray-600 dark:text-gray-400 mt-11'>
                  <li className='mb-4'>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.reddit}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      Reddit
                    </a>
                  </li>
                  <li className='mb-4'>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.medium}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      Medium
                    </a>
                  </li>
                  <li className='mb-4'>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.youtube}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      Youtube
                    </a>
                  </li>
                  <li>
                    <a
                      target='_blank'
                      href={EXTERNAL_ROUTES.social.linkedin}
                      className='text-[#ffffffb3] hover:text-gray-800'
                      rel='noreferrer'
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto pt-20 pb-1 pr-5 flex flex-wrap sm:hidden flex-col sm:flex-row'>
          <p className='text-white text-sm text-center sm:text-left'>
            © {dayjs().year()} Subspace Labs, Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
