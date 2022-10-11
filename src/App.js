import { default as Socket } from './Socket-io'
import { Routes, Route } from 'react-router-dom';
import { Settings, Home, Room, Questions, Leaderboard } from './pages'

import './App.css'
function App() {
 

  return (
    <>
      <div id = 'app'>
        <main>
          <Settings />
          <Socket />
        </main>
      </div>
    </>
  );

}

export default App;
