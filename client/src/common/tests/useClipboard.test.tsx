import copy from 'copy-to-clipboard'
import { renderHook, act } from '@testing-library/react'

// common - useClipboard
import { useClipboard } from 'common/hooks/useClipboard'

const valueToRaiseMockException = 'fake input causing exception in copy to clipboard'
jest.mock('copy-to-clipboard', () =>
  jest.fn().mockImplementation((input) => {
    if (input === valueToRaiseMockException) {
      throw new Error(input)
    }
    return true
  }),
)

describe('useClipboard', () => {
  it('renders properly', async () => {
    const { result } = renderHook(() => useClipboard('Text to copy'))

    expect(result.current.value).toBe('Text to copy')
    expect(result.current.hasCopied).toBe(false)

    act(() => {
      result.current.onCopy()
    })

    expect(copy).toBeCalled()
  })
})
