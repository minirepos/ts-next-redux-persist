import { createSlice, combineReducers } from '@reduxjs/toolkit'

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: { isDarkMode: false },
  reducers: {
    setIsDarkMode: (state, { payload }) => {
      state.isDarkMode = payload
    },
  },
})

export const { setIsDarkMode } = userPreferencesSlice.actions

// We are forced to use combineReducers to use redux-persist with redux-toolkit
const rootReducer = combineReducers({ userPreferences: userPreferencesSlice.reducer })

export default rootReducer
