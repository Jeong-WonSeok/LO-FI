import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterBar from './components/FooterBar';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import AddDetailPage from './pages/AddDetailPage';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/search/:id' element={<DetailPage />}/>
          <Route path='/add' element={<AddPage />}/>
          <Route path='/add/:category' element={<AddDetailPage/>}/>
          <Route path='/profile/' element={<ProfilePage/>}/>
        </Routes>
        <FooterBar/>
      </Router>
    </div>
  );
}

export default App;
