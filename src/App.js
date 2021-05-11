import { Route, Switch } from 'react-router';
import './App.css';
import LoginComponent from './Layout/login';
import MainComponent from './Layout/main';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/Login" component={LoginComponent}></Route>
        <Route path="/" strict component={MainComponent}></Route>
      </Switch>
    </div>
  );
}

export default App;
