import { Route, Routes } from 'react-router';
import './App.css';
import JoinComponent from './Layout/Join';
import LoginComponent from './Layout/Login/login';
import MainComponent from './Layout/main';

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
