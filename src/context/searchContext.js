import {createContext} from 'react'

const SearchContext = createContext({
  searchInputValue: '',
  onChangeSearchInputValue: () => {},
  onTriggerSearchQuery: () => {},
  searchResponse: {},
  isLoading: true,
})

export default SearchContext
