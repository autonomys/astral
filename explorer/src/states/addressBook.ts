import type { AddressBookEntry } from 'types/wallet'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AddressBookDefaultState {
  addresses: AddressBookEntry[]
}

interface AddressBookState extends AddressBookDefaultState {
  addAddress: (address: AddressBookEntry) => void
  removeAddress: (address: AddressBookEntry) => void
  clear: () => void
}

const initialState: AddressBookDefaultState = {
  addresses: [],
}

export const useAddressBookStates = create<AddressBookState>()(
  persist(
    (set) => ({
      ...initialState,
      addAddress: (address: AddressBookEntry) =>
        set((state) => ({
          addresses: [...state.addresses, address],
        })),
      removeAddress: (address: AddressBookEntry) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.address !== address.address),
        })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'address-book-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
