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
        <Route path="/join" render={() => <JoinComponent {...props}/>}></Route>
        <Route path="/login" render={() => <LoginComponent {...props}/>}></Route>
        <Route path={["/", "/:path"]} render={() => <MainComponent {...props}/>}></Route>
      </Switch>
    </div>
  );
}

export default withStyles(styles)(App);
