import { Provider } from 'next-auth/providers'
import { Discord } from './discord'

export const providers: Provider[] = [Discord()]
