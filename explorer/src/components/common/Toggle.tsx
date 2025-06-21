import { Switch } from '@headlessui/react'
import { FC } from 'react'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  name?: string
  className?: string
}

export const Toggle: FC<ToggleProps> = ({ checked, onChange, name, className }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      name={name}
      className={`${className} ${
        checked ? 'bg-buttonLightFrom dark:bg-primaryAccent' : 'bg-gray-200 dark:bg-gray-700'
      } relative inline-flex h-6 w-11 items-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primaryAccent focus:ring-offset-2`}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-lg bg-white transition-transform`}
      />
    </Switch>
  )
}
