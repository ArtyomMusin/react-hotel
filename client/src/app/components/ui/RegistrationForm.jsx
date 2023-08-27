import React, { useEffect, useState } from 'react'
import './RegistrationForm.scss'
import useAuth from '../../context/useAuth'
import { useDispatch } from 'react-redux'
import { validator } from '../../utils/validator'
import { register } from '../../store/authReducer'
import Input from '../common/form/Input'

const fields = {
    name: 'name',
    email: 'email',
    tel: 'tel',
    login: 'login',
    password: 'password',
    passwordRepeated: 'passwordRepeated'
}

const RegistrationForm = () => {
    const { toggleIsLogin, toggleAuthModal } = useAuth()
    const dispatch = useDispatch()

    const [stage, setStage] = useState(true)
    const [isClear, setIsClear] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [errors, setErrors] = useState({})
    const { name, email, tel, login, password, passwordRepeated } = fields
    const [data, setData] = useState({
        [name]: {
            value: '',
            changed: false
        },
        [email]: {
            value: '',
            changed: false
        },
        [tel]: {
            value: '',
            changed: false
        },
        [login]: {
            value: '',
            changed: false
        },
        [password]: {
            value: '',
            changed: false
        },
        [passwordRepeated]: {
            value: '',
            changed: false
        }
    })

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Name is required'
            }
        },
        email: {
            isRequired: {
                message: 'Email is required'
            },
            isEmail: {
                message: 'Email is not correct'
            },
            isExist: {
                message: 'Such email already is exist'
            }
        },
        tel: {
            isRequired: {
                message: 'Tel is required'
            },
            isExist: {
                message: 'Such number phone already in use'
            }
        },
        login: {
            isExist: {
                message: 'Such login already is exist'
            }
        },
        password: {
            isRequired: {
                message: 'Password is required'
            }
        },
        passwordRepeated: {
            isRequired: {
                message: 'Repeat password'
            },
            isMatch: {
                message: 'Passwords are not match',
                password: data.password.value
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = async() => {
        const errors = await validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const refreshState = (field, value) => {
        setData(prevState => ({ ...prevState, [field]: { value: value, changed: true } }))
    }

    const changeAction = (e) => {
        e.preventDefault()
        toggleIsLogin()
    }

    const handleSubmit = async(e) => {
        setIsSending(true)
        e.preventDefault()
        const isValid = await validate()
        if (!isValid) return

        const finallyData = Object.keys(data).reduce((obj, field) => ({ ...obj, [field]: data[field].value }), {})
        await dispatch(register(finallyData))
        setIsSending(false)
        dropState()
        setStage(true)
        toggleAuthModal()
    }

    const dropState = () => {
        Object.keys(data).reduce((obj, key) => ({
            ...obj,
            [data[key]]: {
                value: '',
                changed: false
            }
        }), {})
    }

    const handleNext = () => {
        setStage(prevState => !prevState)
        if (!isClear) {
            refreshState('login', '')
            refreshState('password', '')
            refreshState('passwordRepeated', '')
            setIsClear(true)
        }
    }

    const { name: nameValue, email: emailValue, tel: telValue, login: loginValue, password: passwordValue, passwordRepeated: passwordRepeatedValue } = data

    const isDisabledSubmit = () => {
        return Boolean(Object.keys(errors).length)
    }

    return (
        <form className='RegistrationForm' onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className="RegistrationForm__Box mb-1">
                <div className={`RegistrationForm__Wrapper ${stage ? '_stage1' : '_stage2'}`}>
                    <div className='RegistrationForm__Part AuthModal__padding'>
                        <Input
                            className={'mb-2'}
                            inputClassName = {'RegistrationForm__Input'}
                            id={name}
                            placeholder={'Your name'}
                            value={nameValue.value}
                            onChange={e => refreshState(name, e.target.value)}
                            error={errors.name}
                        />
                        <Input
                            className={'mb-2'}
                            inputClassName = {'RegistrationForm__Input'}
                            type={'email'}
                            id={email}
                            placeholder={'Your email'}
                            value={emailValue.value}
                            onChange={e => refreshState(email, e.target.value)}
                            error={errors.email}
                        />
                        <Input
                            inputClassName = {'RegistrationForm__Input'}
                            type={'tel'}
                            id={tel}
                            placeholder={'Your number phone'}
                            value={telValue.value}
                            onChange={e => refreshState(tel, e.target.value)}
                            error={errors.tel}
                        />
                    </div>
                    <div className='RegistrationForm__Part AuthModal__padding'>
                        <Input
                            className={'mb-2'}
                            inputClassName = {'RegistrationForm__Input'}
                            id={login}
                            placeholder={'Your login'}
                            value={loginValue.value}
                            onChange={e => refreshState(login, e.target.value)}
                            error={errors.login}
                        />
                        <Input
                            className={'mb-2'}
                            inputClassName = {'RegistrationForm__Input'}
                            type={'password'}
                            id={password}
                            placeholder={'Your password'}
                            value={passwordValue.value}
                            onChange={e => refreshState('password', e.target.value)}
                            error={errors.password}
                        />
                        <Input
                            inputClassName = {'RegistrationForm__Input'}
                            type={'password'}
                            id={passwordRepeated}
                            placeholder={'Repeat password'}
                            value={passwordRepeatedValue.value}
                            onChange={e => refreshState(passwordRepeated, e.target.value)}
                            error={errors.passwordRepeated}
                        />
                    </div>
                </div>
            </div>
            <p className="AuthModal__padding mb-1">
                <button className="btn btn-outline-dark w-100 m-0" type="button" onClick={handleNext}>{stage ? 'next step >' : '< prev state'}</button>
            </p>
            <p className="AuthModal__padding  mb-1">
                <button className="btn btn-outline-dark w-100 m-0" type="submit" disabled={isDisabledSubmit()}>
                    {isSending ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Register'
                    )}
                </button>
            </p>
            {/* <p className='registration-p'><Link to="/autorization">LoginForm</Link></p> */}
            <p className='AuthModal__ChangeAction'>
                <a className="AuthModal__Link" onClick={changeAction}>Login</a>
            </p>
        </form>
    )
}

// для 2 шага добавить класс _step2 к div 'reg-wrapper'

export default RegistrationForm
