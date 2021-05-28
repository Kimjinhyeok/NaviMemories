import { Route, Switch } from 'react-router';
import './App.css';
import JoinComponent from './Layout/Join';
import LoginComponent from './Layout/Login/login';
import MainComponent from './Layout/main';
function App(props) {

  
  return (
    <div className="App">
      <Switch>
        <Route path="/join" component={JoinComponent}></Route>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/:path" component={MainComponent}></Route>
      </Switch>
    </div>
  );
}

export default App;
