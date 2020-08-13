import { useSelector } from 'react-redux'

import { useAppDispatch, RootState as S, setIsDarkMode } from '../redux'

const IndexPage = () => {
  const isDarkMode = useSelector((s: S) => s.userPreferences.isDarkMode)
  const dispatch = useAppDispatch()

  return (
    <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
      {isDarkMode ? 'Dark' : 'Light'}
    </button>
  )
}

export default IndexPage
