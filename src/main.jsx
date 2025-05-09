import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyTree from './Tree.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyTree />
  </StrictMode>,
)
