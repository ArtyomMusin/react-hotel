import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../form/login'
import Registration from '../form/registration'

const Autorization = () => {
    return (
        <div className="container form-box">
            <form className='autorization-form'>
                <Switch>
                    <Route path='/autorization/registration/' component={Registration} />
                    <Route path='/autorization' component={Login} />
                </Switch>
            </form>
        </div>
    )
}

export default Autorization
