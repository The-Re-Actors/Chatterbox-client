import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

// Define the JSX for the app
const appJsx = (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
)

// Render the app JSX to the 'root' element in the DOM
ReactDOM.render(appJsx, document.getElementById('root'))
