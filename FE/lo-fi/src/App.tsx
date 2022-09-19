import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterBar from './components/FooterBar';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KakaoLogin from './pages/KakaoLogin';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/kakaoLogin' element={<KakaoLogin />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/search' element={<SearchPage />}/>
        </Routes>
        <FooterBar/>
      </Router>
    </div>
  );
}

export default App;
