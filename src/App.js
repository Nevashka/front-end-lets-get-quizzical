import { default as Socket } from './Socket-io'
import { Routes, Route } from 'react-router-dom';
import { Settings, Home, Room, Questions, Leaderboard } from './pages'

import './App.css'
function App() {
 

  return (
    <>
      <div id = 'app'>
        <main>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/Settings' element={<Settings/>}/>
              <Route path='/Room' element={<Room/>}/>
              <Route path='/Questions' element={<Questions/>}/>
              <Route path='/Leaderboard' element={<Leaderboard/>}/>
          </Routes>  
        </main>
            <Socket />
      </div>
    </>
  );

}

export default App;
