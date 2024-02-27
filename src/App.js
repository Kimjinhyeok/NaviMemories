import { Route, Routes } from 'react-router';
import './App.css';
import JoinComponent from './Layout/Join';
import LoginComponent from './Layout/Login/login';
import MainComponent from './Layout/main';
import { styled } from '@mui/system';

const styles = styled(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '4px',
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: "#e8eaf6a5"
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
      <Routes>
        <Route path="/" excat element={<MainComponent />}></Route>
        <Route path="/join" element={<JoinComponent />}></Route>
        <Route path="/login" element={<LoginComponent />}></Route>
        <Route path="/*" element={<MainComponent />}></Route>
      </Routes>
    </div>
  );
}

export default App;
