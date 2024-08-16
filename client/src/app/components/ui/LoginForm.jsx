import React, { useState } from 'react'
import useAuth from '../../context/useAuth'
import { useDispatch } from 'react-redux'
import { signIn } from '../../store/authReducer'
import Input from '../common/form/Input'

const formFields = {
    login: 'login',
    password: 'password'
}

const LoginForm = () => {
    const { toggleIsLogin, toggleAuthModal } = useAuth()
    const dispatch = useDispatch()
    const { login, password } = formFields
    const [errors, setErrors] = useState({})

    const config = {
        invalidData: {
            message: 'Login or password is not correct'
        }
    }

    const [state, setState] = useState({
        [login]: '',
        [password]: ''
    })
    const [isIncoming, setIsIncoming] = useState(false)

    const handleChange = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }))
    }

    const handleClick = (e) => {
        e.preventDefault()
        toggleIsLogin()
    }

    const handleSubmit = async(e) => {
        setIsIncoming(true)
        e.preventDefault()
        const { status } = await dispatch(signIn(state))
        setIsIncoming(false)

        if (status === 400) {
            setErrors({ invalidData: config.invalidData.message })
            return
        }

        toggleAuthModal()
    }

    return (
        <div className="Login" style={{ maxWidth: '247px' }}>
            <h1 className="mb-3 text-center">Login</h1>
            <Input
                className={'mb-3'}
                id={login}
                placeholder={'Login'}
                value={state.login}
                onChange={e => handleChange(login, e.target.value)}
            />
            <Input
                className={'mb-3'}
                id={password}
                placeholder={'Password'}
                type={'password'}
                value={state.password}
                onChange={e => handleChange(password, e.target.value)}
                error={errors.invalidData}
            />
            <p className="mb-2"><button className="btn btn-outline-dark w-100 m-0" type='submit' onClick={handleSubmit}>
                {isIncoming ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    'Login'
                )}
            </button></p>
            <p className='AuthModal__ChangeAction'><a className="AuthModal__Link" onClick={handleClick}>Registration</a></p>
        </div>
    )
}

export default LoginForm
