import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
import SearchContext from '../../context/searchContext'
import './index.css'

const NavBar = props => {
  const {
    searchInputValue,
    onChangeSearchInputValue,
    onTriggerSearchQuery,
  } = useContext(SearchContext)

  const onChangeValue = event => onChangeSearchInputValue(event.target.value)

  const {history} = props
  const onClickSearch = () => {
    onTriggerSearchQuery(1)
    history.push('/search')
  }

  return (
    <nav className="nav-container">
      <h1 className="logo-name">MovieDB</h1>
      <ul className="page-links">
        <li>
          <Link to="/" className="nav-link">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/top-rated" className="nav-link">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/upcoming" className="nav-link">
            Upcoming
          </Link>
        </li>
      </ul>
      <div className="search-container">
        <input
          placeholder="search"
          type="text"
          value={searchInputValue}
          className="search-element"
          onChange={onChangeValue}
        />

        <button type="button" className="search-button" onClick={onClickSearch}>
          Search
        </button>
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
