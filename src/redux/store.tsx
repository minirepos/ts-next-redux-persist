import { useMemo } from 'react'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch, Provider } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import storage from './storage-fix'
import rootReducer from './reducers'

let store

const persistConfig = {
  key: 'persist',
  storage,
  whitelist: ['userPreferences'],
}

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const makeStore = (preloadedState?: Object) =>
  configureStore({
    reducer: persistedRootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    ...(preloadedState ? { preloadedState } : {}),
  })

// Only instanciated for typing dispatch
const storeForTyping = makeStore()

// https://github.com/vercel/next.js/blob/canary/examples/with-redux-persist/store.js
// Still doesn't seem to do what I want when navigating pages with server-side preloadedState
const initializeStore = (preloadedState?: Object) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

const AppStoreProvider = ({ children, initialState }: { children: any; initialState?: Object }) => {
  // Without the memo, the store is reset at each page change
  const store = useMemo(() => initializeStore(initialState), [initialState])
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={children} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof storeForTyping.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default AppStoreProvider
