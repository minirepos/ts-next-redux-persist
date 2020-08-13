import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit'
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
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import storage from './redux-storage'

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: { isDarkMode: false },
  reducers: {
    setIsDarkMode: (state, { payload }) => {
      state.isDarkMode = payload
    },
  },
})

const rootReducer = combineReducers({ userPreferences: userPreferencesSlice.reducer })

const persistConfig = {
  key: 'persist',
  storage,
  whitelist: ['userPreferences'],
  stateReconciler: hardSet,
}

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const { setIsDarkMode } = userPreferencesSlice.actions
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const AppStoreProvider = ({ children }) => {
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={children} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default AppStoreProvider
