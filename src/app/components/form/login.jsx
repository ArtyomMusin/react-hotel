import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <h1>Login</h1>
            <p><input className='form-input' type="text" id='name' placeholder='Login'/></p>
            <p><input className='form-input' type="password" id='password' placeholder='Password'/></p>
            <p><button className="btn btn-outline-dark form-but" type='submit'>Login</button></p>
            <p className='registration-p'><Link to="/autorization/registration">Registration</Link></p>
        </>
    )
}

export default Login
