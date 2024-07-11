import './App.css'
import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import Popular from './Components/Popular'
import TopRated from './Components/TopRated'
import Upcoming from './Components/Upcoming'
import MovieDetails from './Components/MovieDetails'
import SearchMovies from './Components/SearchMovies'
import SearchContext from './context/searchContext'

const API_KEY = 'a5539a758abdb1b4d29b62856e61828e'

const App = () => {
  // state for search input value
  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchResponse, setSearchResponse] = useState({})
  const [isLoading, setLoading] = useState(true)
  const onChangeSearchInputValue = searchText => setSearchInputValue(searchText)

  const updateSearchData = data => {
    const responseObject = {
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
    return responseObject
  }

  const onTriggerSearchQuery = async (pageNo = 1) => {
    setLoading(true)
    const MOVIE_NAME = searchInputValue
    const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=${pageNo}`
    const response = await fetch(searchMoviesUrl)
    const data = await response.json()
    const updateData = updateSearchData(data)
    setSearchResponse(updateData)
    setLoading(false)
  }

  return (
    <SearchContext.Provider
      value={{
        searchInputValue,
        onChangeSearchInputValue,
        searchResponse,
        isLoading,
        onTriggerSearchQuery,
      }}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route exact path="/search" component={SearchMovies} />
      </Switch>
    </SearchContext.Provider>
  )
}

export default App
