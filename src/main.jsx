import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './components/layout'
import ContextWrapper from './context/ContextWrapper'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextWrapper>
      <Layout>
        <App />
      </Layout>
    </ContextWrapper>
  </StrictMode>,

)
