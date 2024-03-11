import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { Pagination } from './Pagination'

export default {
  title: 'Common/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [currentPage, setCurrentPage] = useState(1)

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const previousPage = () => {
    setCurrentPage((prev) => prev - 1)
  }

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  pageSize: 10,
  totalCount: 230,
  hasNextPage: true,
  hasPreviousPage: false,
}
