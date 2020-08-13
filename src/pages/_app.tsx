import type { AppProps } from 'next/app'

import AppStoreProvider from '../redux'

const App = ({ Component, pageProps }: AppProps) => (
  <AppStoreProvider>
    <Component {...pageProps} />
  </AppStoreProvider>
)

export default App
