import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider' 
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider.jsx'
import { Toaster } from './components/ui/toaster.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
      <Toaster/>
    </Provider>
  </StrictMode>,
)
