import React from 'react'
import Canvas from './components/Canvas'
import SettingsBar from './components/SettingsBar'
import ToolBar from './components/ToolBar'
import './styles/app.scss'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/:id' element={<><ToolBar /><SettingsBar /><Canvas /></>}>
          </Route>
          <Route path='*' element={<Navigate to={`f${(+new Date()).toString(16)}`} />} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App