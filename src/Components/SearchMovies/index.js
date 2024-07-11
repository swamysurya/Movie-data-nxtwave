import {useState, useEffect, useContext} from 'react'
import SearchContext from '../../context/searchContext'

import './index.css'
import NavBar from '../NavBar'
import Loading from '../Loader'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const API_KEY = 'a5539a758abdb1b4d29b62856e61828e'
const SearchMovies = () => {
  const [pageNo, setPageNo] = useState(1)
  const {searchResponse, isLoading, onTriggerSearchQuery} = useContext(
    SearchContext,
  )

  const {totalResults, results} = searchResponse

  const onPrevClick = () => {
    if (pageNo !== 1) {
      setPageNo(prevPageNo => prevPageNo - 1)
      console.log(pageNo)
      onTriggerSearchQuery(pageNo)
    }
  }

  const onNextClick = () => {
    if (pageNo !== searchResponse.totalPages - 1) {
      setPageNo(prevPageNo => prevPageNo + 1)
      console.log(pageNo)
      onTriggerSearchQuery(pageNo)
    }
  }

  const renderSearchMovieList = () => (
    <ul className="movie-cards-container">
      {results.map(eachItem => (
        <MovieCard key={eachItem.id} movieDetails={eachItem} />
      ))}
    </ul>
  )

  const noResultsView = () => (
    <div className="emty-res-container">
      <h1 className="emty-res-msg">No Results found</h1>
    </div>
  )

  const renderSearchMovies = () => {
    if (totalResults === 0) {
      return noResultsView()
    }
    return renderSearchMovieList()
  }

  return (
    <>
      <NavBar />
      {isLoading ? <Loading /> : renderSearchMovies()}
      <Pagination
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        pageNo={pageNo}
      />
    </>
  )
}

export default SearchMovies
