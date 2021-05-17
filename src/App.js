import { Route, Switch } from 'react-router';
import './App.css';
import LoginComponent from './Layout/login';
import MainComponent from './Layout/main';
function App(props) {

  
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path="/main" component={MainComponent}></Route>
      </Switch>
    </div>
  );
}

export default App;
