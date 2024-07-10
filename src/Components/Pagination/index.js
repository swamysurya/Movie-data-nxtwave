import './index.css'

const Pagination = props => {
  const {pageNo, onPrevClick, onNextClick} = props

  return (
    <div className="pagination-container">
      <button type="button" className="prev-btn" onClick={onPrevClick}>
        Prev
      </button>
      <p className="page-no">{pageNo}</p>
      <button type="button" className="next-btn" onClick={onNextClick}>
        next
      </button>
    </div>
  )
}

export default Pagination
