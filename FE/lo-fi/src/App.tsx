import React from 'react';
import './App.css';
import FooterBar from './components/FooterBar';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <MainPage />

      <FooterBar/>
    </div>
  );
}

export default App;
