import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SitePreferencesProvider } from './context/SitePreferences.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SitePreferencesProvider>
      <App />
    </SitePreferencesProvider>
  </StrictMode>,
)
