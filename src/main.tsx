import React from 'react'
import ReactDOM from 'react-dom/client'
import NovaVentureLanding from './NovaVentureLanding'
import './index.css'

// Handle GitHub Pages base path
const basename = import.meta.env.BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NovaVentureLanding />
  </React.StrictMode>,
) 