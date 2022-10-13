
import { Route, Routes } from 'react-router-dom';
import { Settings, Home, Room, Leaderboard } from './pages'

import './App.css'

function App() {

  return (
    
      <div id = 'app'>
        <main>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Settings' element={<Settings />}/>
              <Route path='/Room' element={<Room />}/>
              <Route path='/Leaderboard' element={<Leaderboard />}/>
          </Routes>  
        </main>
      </div>
   
  );

}

export default App;
