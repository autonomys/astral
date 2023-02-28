import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'

// home
import Home from 'Home'
import { SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE } from 'Home/test/mocks'

describe('Home unit tests', () => {
  it('renders without error', async () => {
    render(
      <MockedProvider mocks={[SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE]} addTypename={false}>
        <Home />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )

    expect(await screen.findByText(/latest blocks/i)).toBeInTheDocument()
    expect(await screen.findByText(/latest extrinsics/i)).toBeInTheDocument()
  })
})
