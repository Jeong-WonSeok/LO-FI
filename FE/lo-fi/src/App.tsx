import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 컴포넌트
import FooterBar from './components/FooterBar';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import AddDetailPage from './pages/AddDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoogleLogin from './pages/GoogleLogin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/search/:category/:id' element={<DetailPage />}/>
          <Route path='/add' element={<AddPage />}/>
          <Route path='/add/:category' element={<AddDetailPage/>}/>
          <Route path='/profile/' element={<ProfilePage/>}/>
          <Route path='/oauth2/:token' element={<GoogleLogin/>}/>
        </Routes>
        <FooterBar/>
      </Router>
    </div>
  );
}

export default App;