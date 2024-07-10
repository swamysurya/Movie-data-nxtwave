import './index.css'

const MovieCard = ({movieDetails}) => {
  const {posterPath, title, voteAverage} = movieDetails

  return (
    <li className="list-item">
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
      />
      <div className="movie-details-container">
        <h3 className="movie-title">{title}</h3>
        <p className="rating">rating: {voteAverage}</p>
        <button className="view-details-btn" type="button">
          View Details
        </button>
      </div>
    </li>
  )
}

export default MovieCard
