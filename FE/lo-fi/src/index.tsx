import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/modules/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// store 불러오기

const render = () => root.render(
  // 개발단계시 오류를 잡기 위해 2번씩 실행된다.
    <Provider store={store}>
      <App />
    </Provider>
);

render();
store.subscribe(render);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
