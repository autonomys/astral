import { render } from '@testing-library/react'

// account
import AccountDetailsCard from 'Account/components/AccountDetailsCard'

const mockAccount = {
  id: 'some-address',
  updatedAt: '2022-01-01T00:00:00Z',
  extrinsics: [],
  rewards: [],
}

describe('AccountDetailsCard', () => {
  it('renders correctly with valid props', () => {
    const { getByText } = render(
      <AccountDetailsCard account={mockAccount} accountAddress='some-address' />,
    )

    expect(getByText('some-address')).toBeInTheDocument()
    expect(getByText('Public key')).toBeInTheDocument()
    expect(getByText('Nonce')).toBeInTheDocument()
  })

  it('renders Identicon with correct value prop', () => {
    const { container } = render(
      <AccountDetailsCard account={mockAccount} accountAddress='some-address' />,
    )

    const identicon = container.querySelector('svg')

    expect(identicon).toHaveAttribute('data-testid', 'polkadot-identicon')
    expect(identicon).toHaveAttribute('data-value', 'some-address')
    expect(identicon).toHaveAttribute('height', '48')
  })

  it('renders CopyButton with correct props', () => {
    const { getByText } = render(
      <AccountDetailsCard account={mockAccount} accountAddress='some-address' />,
    )

    const copyButton = getByText(/public key/i)

    expect(copyButton).toHaveTextContent('12345...')
    expect(copyButton).toHaveAttribute(
      'value',
      '0x1234567890123456789012345678901234567890123456789012345678901234',
    )
    expect(copyButton).toHaveAttribute('message', 'Public key copied')
  })

  it('shortens publicKey with shortString function when !isDesktop', () => {
    const { getByText } = render(
      <AccountDetailsCard account={mockAccount} accountAddress='some-address' />,
    )

    const publicKeyShortened = getByText('12345...')

    expect(publicKeyShortened).toBeInTheDocument()
  })

  it('shows full publicKey when isDesktop', () => {
    const { getByText } = render(
      <AccountDetailsCard account={mockAccount} accountAddress='some-address' isDesktop />,
    )

    const publicKeyFull = getByText(
      '0x1234567890123456789012345678901234567890123456789012345678901234',
    )

    expect(publicKeyFull).toBeInTheDocument()
  })

  it('renders Accordion with valid props', () => {
    const { getByText } = render(
      <AccountDetailsCard account={mockAccount} accountAddress='some-address' />,
    )

    const accordionTitle = getByText('some-address')
    const accordionList = getByText('Public key')

    expect(accordionTitle).toBeInTheDocument()
    expect(accordionList).toBeInTheDocument()
  })

  it('renders StyledListItem with valid props', () => {
    const { getByText } = render(
      <AccountDetailsCard account={mockAccount} accountAddress='some-address' />,
    )

    const publicKeyListItem = getByText('Public key')
    const nonceListItem = getByText('Nonce')

    expect(publicKeyListItem).toBeInTheDocument()
    expect(nonceListItem).toBeInTheDocument()

    expect(publicKeyListItem.nextElementSibling).toHaveTextContent('12345...')
    expect(nonceListItem.nextElementSibling).toHaveTextContent(mockAccount.updatedAt)
  })
})
