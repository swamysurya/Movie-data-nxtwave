import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../Loader'
import NavBar from '../NavBar'
import './index.css'

const API_KEY = 'a5539a758abdb1b4d29b62856e61828e'
const MovieDetails = () => {
  const [isLoading, setLoading] = useState(true)
  const [movieAndCast, setMovieAndCast] = useState({})
  // const [movieDeatils, setMovieDetails] = useState({})
  // const [movieCastDetails, setMovieCastDetails] = useState({})

  const {id} = useParams()

  const updateMovieDetailsData = data => {
    const res = {
      adult: data.adult,
      backdropPath: data.backdrop_path,
      belongsToCollection: data.belongs_to_collection,
      budget: data.budget,
      genres: data.genres,
      homepage: data.homepage,
      id: data.id,
      imdbId: data.imdb_id,
      originCountry: data.origin_country,
      originalLanguage: data.origin_country,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      posterPath: data.poster_path,
      productionCompanies: data.production_companies,
      productionCountries: data.production_countries,
      releaseDate: data.release_date,
      revenue: data.revenue,
      runtime: data.runtime,
      spokenLanguages: data.spoken_languages,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      video: data.video,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }
    return res
  }

  const updateCastDetailsData = data => {
    const res = {
      cast: data.cast.map(eachItem => ({
        adult: eachItem.adult,
        castId: eachItem.cast_id,
        character: eachItem.character,
        creditId: eachItem.credit_id,
        gender: eachItem.gender,
        id: eachItem.id,
        knownForDepartment: eachItem.known_for_department,
        name: eachItem.name,
        order: eachItem.order,
        originalName: eachItem.original_name,
        popularity: eachItem.popularity,
        profilePath: eachItem.profile_path,
      })),
      crew: data.crew.map(eachItem => ({
        adult: eachItem.adult,
        creditId: eachItem.credit_id,
        department: eachItem.department,
        gender: eachItem.gender,
        id: eachItem.id,
        job: eachItem.job,
        knownForDepartment: eachItem.known_for_department,
        name: eachItem.name,
        originalName: eachItem.original_name,
        popularity: eachItem.popularity,
        profilePath: eachItem.profile_path,
      })),
      id: data.id,
    }

    return res
  }

  useEffect(() => {
    const MOVIE_ID = id
    const getMovieAndCastDetails = async () => {
      const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`
      const movieDetailsResponse = await fetch(movieDetailsUrl)
      const movieDetailsData = await movieDetailsResponse.json()
      const updatedMovieDetailsData = updateMovieDetailsData(movieDetailsData)
      const movieCastDetailsUrl = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`
      const movieCastDetailsResponse = await fetch(movieCastDetailsUrl)
      const movieCastDetailsData = await movieCastDetailsResponse.json()
      const updatedMovieCastDetais = updateCastDetailsData(movieCastDetailsData)
      setMovieAndCast({
        movieDetils: updatedMovieDetailsData,
        castDetails: updatedMovieCastDetais,
      })
      setLoading(false)
    }

    getMovieAndCastDetails()
    // we use id in dependecy array because of id the fetch happen
  }, [id])

  const {movieDetils, castDetails} = movieAndCast
  const MovieDetailsComponent = () => (
    <div className="movie-deatils-container">
      <div className="movie-poster">
        <img
          className="posters"
          src={`https://image.tmdb.org/t/p/w500/${movieDetils.posterPath}`}
          alt={movieDetils.title}
        />
      </div>
      <div className="movie-info">
        <p>
          <strong>Rating: </strong> {movieDetils.voteAverage}
        </p>
        <p>
          <strong>Duration: </strong> {movieDetils.runtime} minutes
        </p>
        <p>
          <strong>Genres: </strong>
          {movieDetils.genres.map(genre => genre.name).join(', ')}
        </p>
        <p>
          <strong>Release Date: </strong> {movieDetils.releaseDate}
        </p>
        <p>
          <strong>Overview: </strong> {movieDetils.overview}
        </p>
      </div>
    </div>
  )

  const CastCard = ({item}) => (
    <li className="member-item">
      <img
        className="cast-member-image"
        src={`https://image.tmdb.org/t/p/w500${item.profilePath}`}
        alt="item.name"
      />
      <p>
        <strong>original name: </strong>
        {item.name}
      </p>
      <p>
        <strong>Character name: </strong>
        {item.character}
      </p>
    </li>
  )

  const CastDeatilsComponent = () => (
    <ul className="cast-members">
      {castDetails.cast.map(eachItem => (
        <CastCard key={eachItem.id} item={eachItem} />
      ))}
    </ul>
  )

  const renderSingleMoviePage = () => (
    <div className="single-movie-page-container">
      <MovieDetailsComponent />
      <CastDeatilsComponent />
    </div>
  )
  return (
    <>
      <NavBar />
      {isLoading ? <Loading /> : renderSingleMoviePage()}
    </>
  )
}

export default MovieDetails
