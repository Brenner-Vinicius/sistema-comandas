import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
// 👇 Importando seus estilos aqui
import './styles/tailwind.css'
import './styles/index.css'
import './styles/fonts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)