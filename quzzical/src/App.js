// import { default as Socket } from './Socket-io'
import { Settings } from './pages'
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="settings" element={<Settings />} />
      </Routes>
    </>
  );

}

export default App;
