import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersonProvider } from './ContextApi/CPCContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersonProvider>
      <App />
    </PersonProvider>
  </StrictMode>,
)
