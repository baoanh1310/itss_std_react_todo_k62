import React from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import Auth from "./components/Auth";

function App() {
  return (
    <div className="container is-fluid">
      <Auth />
    </div>
  );
}

export default App;
