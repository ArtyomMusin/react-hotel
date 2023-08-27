import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../src/index.css'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from './app/store'
import { Provider } from 'react-redux'

export const store = createStore()

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
