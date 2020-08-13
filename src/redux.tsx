import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useDispatch, Provider } from 'react-redux'

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: { isDarkMode: false },
  reducers: {
    setIsDarkMode: (state, { payload }) => {
      state.isDarkMode = payload
    },
  },
})

const store = configureStore({
  reducer: userPreferencesSlice.reducer,
})

export const { setIsDarkMode } = userPreferencesSlice.actions

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

const AppStoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

export default AppStoreProvider
