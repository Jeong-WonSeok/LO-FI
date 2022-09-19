import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterBar from './components/FooterBar';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import AddDetailPage from './pages/AddDetailPage';
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
          <Route path='/search/:id' element={<DetailPage />}/>
          <Route path='/add' element={<AddPage />}/>
          <Route path='/add/:category' element={<AddDetailPage/>}/>
        </Routes>
        <FooterBar/>
      </Router>
    </div>
  );
}

export default App;
