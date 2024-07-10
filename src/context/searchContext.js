import {createContext} from 'react'

const SearchContext = createContext({
  searchInputValue: '',
  onChangeSearchInputValue: () => {},
})

export default SearchContext
