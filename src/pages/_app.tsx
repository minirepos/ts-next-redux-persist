import type { AppProps } from 'next/app'

import AppStoreProvider from '../redux/store'

const App = ({ Component, pageProps }: AppProps) => (
  <AppStoreProvider initialState={pageProps.initialReduxState}>
    <Component {...pageProps} />
  </AppStoreProvider>
)

export default App
