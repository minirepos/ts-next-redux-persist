import { useSelector } from 'react-redux'
import Link from 'next/Link'

import { useAppDispatch, RootState as S } from '../redux/store'
import { setIsDarkMode } from '../redux/reducers'

const IndexPage = () => {
  const isDarkMode = useSelector((s: S) => s.userPreferences.isDarkMode)
  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
        {isDarkMode ? 'Dark' : 'Light'}
      </button>
      <Link href="/">
        <a>Page 1</a>
      </Link>
    </div>
  )
}

export default IndexPage
