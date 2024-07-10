import './App.css'

import {Switch, Route} from 'react-router-dom'
import Popular from './Components/Popular'
import TopRated from './Components/TopRated'
import Upcoming from './Components/Upcoming'

const App = () => (
  <Switch>
    <Route exact path="/" component={Popular} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
  </Switch>
)

export default App
