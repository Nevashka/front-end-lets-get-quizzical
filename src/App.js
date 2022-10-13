<<<<<<< HEAD

import { Routes, Route } from 'react-router-dom';
import { Settings, Home, Room ,Leaderboard } from './pages'
=======
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import { Settings, Home, Room ,Leaderboard } from './pages'
=======
import { default as Socket } from './Socket-io'
import { Router, Route, Link, Routes } from 'react-router-dom';
import { Settings, Home, Room,Questions, Leaderboard } from './pages'
>>>>>>> 596bec404ef34d6ddae0bd51b2ad30dd6010a12a
>>>>>>> c62af5de0ede7d2c2eec2eac9480633e306ba47f

import './App.css'

function App() {

  return (
    <>
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
    </>
  );

}

export default App;
