import {Link} from 'react-router-dom'
import './index.css'

const NavBar = () => (
  <nav className="nav-container">
    <h1 className="logo-name">Movie DB</h1>
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
      <input placeholder="search" type="search" className="search-element" />
      <button type="button" className="search-button">
        Search
      </button>
    </div>
  </nav>
)

export default NavBar
