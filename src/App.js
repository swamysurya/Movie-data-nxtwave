import './App.css'
import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import Popular from './Components/Popular'
import TopRated from './Components/TopRated'
import Upcoming from './Components/Upcoming'
import SearchContext from './context/searchContext'

const App = () => {
  // state for search input value
  const [searchInputValue, setSearchInputValue] = useState('')

  const onChangeSearchInputValue = searchText => setSearchInputValue(searchText)

  return (
    <SearchContext.Provider
      value={{searchInputValue, onChangeSearchInputValue}}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
      </Switch>
    </SearchContext.Provider>
  )
}

export default App
