import {useState, useEffect} from 'react'
import Loading from '../Loader'

import './index.css'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const API_KEY = 'a5539a758abdb1b4d29b62856e61828e'
const TopRated = () => {
  const [isLoading, setLoading] = useState(true)
  const [apiResponse, setApiResponse] = useState({})
  const [pageNo, setPageNo] = useState(1)

  const updateData = data => {
    const res = {
      page: data.page,
      results: data.results.map(eachItem => ({
        adult: eachItem.adult,
        backdropPath: eachItem.backdrop_path,
        genreIds: eachItem.genre_ids,
        id: eachItem.id,
        originalLanguage: eachItem.original_language,
        originalTitle: eachItem.original_title,
        overview: eachItem.overview,
        popularity: eachItem.popularity,
        posterPath: eachItem.poster_path,
        releaseDate: eachItem.release_date,
        title: eachItem.title,
        video: eachItem.video,
        voteAverage: eachItem.vote_average,
        voteCount: eachItem.vote_count,
      })),
      totalPages: data.total_pages,
      totalResults: data.total_results,
    }
    return res
  }

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNo}`
      const response = await fetch(apiUrl)
      const apiData = await response.json()
      const updatedData = updateData(apiData)
      setApiResponse(updatedData)
      setLoading(false)
    }

    getTopRatedMovies()
  }, [pageNo])

  const renderTopRatedMovieList = () => (
    <ul className="movie-cards-container">
      {apiResponse.results.map(eachItem => (
        <MovieCard key={eachItem.id} movieDetails={eachItem} />
      ))}
    </ul>
  )

  const onPrevClick = () => {
    if (pageNo !== 1) {
      setPageNo(prevPageNo => prevPageNo - 1)
    }
  }

  const onNextClick = () => {
    if (pageNo !== apiResponse.totalPages - 1) {
      setPageNo(prevPageNo => prevPageNo + 1)
    }
  }

  console.log(apiResponse, isLoading)
  return (
    <>
      <NavBar />
      {isLoading ? <Loading /> : renderTopRatedMovieList()}
      <Pagination
        pageNo={pageNo}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
    </>
  )
}

export default TopRated
