import React from 'react'
import ReactDOM from 'react-dom/client'

import { enableMSW } from './api/mocks/index.ts'
import { App } from './app.tsx'

enableMSW().then(() => {
  const rootElement = document.getElementById('root')

  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    console.error('root element not found')
  }
})
