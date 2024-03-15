import { FC, useMemo } from 'react'

type Props = {
  children: React.ReactNode
}
export const List: FC<Props> = ({ children }) => {
  return <ul className='divide-y divide-gray-200 dark:divide-white/20'>{children}</ul>
}

export const ListItem: FC<Props> = ({ children }) => {
  return <li className='py-3 sm:py-4'>{children}</li>
}

type StyledListItemProps = {
  title: string | React.ReactNode
  children: React.ReactNode
}

export const StyledListItem: FC<StyledListItemProps> = ({ title, children }) => {
  const Title = useMemo(() => {
    if (typeof title !== 'string') return title
    return (
      <p className='truncate break-all text-xs font-light text-gray-900 dark:text-white/75 md:text-sm'>
        {title}
      </p>
    )
  }, [title])

  return (
    <ListItem>
      <div className='flex justify-between space-x-4'>
        <div className='min-w-0'>{Title}</div>

        <div className='inline-flex items-end break-all text-xs font-normal capitalize text-gray-600 dark:text-white md:text-sm'>
          {children}
        </div>
      </div>
    </ListItem>
  )
}
