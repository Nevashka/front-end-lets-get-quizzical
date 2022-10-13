<<<<<<< HEAD

import { Routes, Route } from 'react-router-dom';
import { Settings, Home, Room ,Leaderboard } from './pages'

=======
import { Routes, Route } from 'react-router-dom';
import { Settings, Home, Room ,Leaderboard } from './pages'
>>>>>>> 5e66a0135a95f212cada44a74acc95bf4b7e2644

import './App.css'

function App() {

  return (
    <>
      <div id = 'app'>

          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Settings' element={<Settings />}/>
              <Route path='/Room' element={<Room />}/>
              <Route path='/Leaderboard' element={<Leaderboard />}/>
          </Routes>  
<<<<<<< HEAD
        </main>
            
=======

>>>>>>> 5e66a0135a95f212cada44a74acc95bf4b7e2644
      </div>
    </>
  );

}

export default App;
