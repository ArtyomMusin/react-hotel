import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
