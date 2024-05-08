import { Provider } from 'next-auth/providers'
import { Discord } from './discord'
import { Nova } from './nova'
import { Subspace } from './subspace'

export const providers: Provider[] = [Discord(), Subspace(), Nova()]
