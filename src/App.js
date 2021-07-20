import { makeStyles, withStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import './App.css';
import JoinComponent from './Layout/Join';
import LoginComponent from './Layout/Login/login';
import MainComponent from './Layout/main';

const styles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '4px',
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: 'transparent'
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '3px',
      backgroundColor: theme.palette.primary.dark
    }
  }
}))
function App(props) {

  return (
    <div className="App">
      <Switch>
        <Route path="/join" component={JoinComponent}></Route>
        <Route path="/login" component={LoginComponent}></Route>
        <Route path={["/", "/:path"]} component={MainComponent}></Route>
      </Switch>
    </div>
  );
}

export default withStyles(styles)(App);
