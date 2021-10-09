//CSS
import './App.css';

//Require
import {BrowserRouter as Router,Switch,Route, useParams} from "react-router-dom";

//Components
import Market from './Pages/Market';
import Login from './Pages/Login';


function App() {

  return (
    <div className="">
    <Router>
      <div>
        <Switch>
          <Route path="/market/:id">
            <Market />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
