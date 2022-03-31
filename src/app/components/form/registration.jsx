import React from 'react'
import { Link } from 'react-router-dom'

const Registration = () => {
    return (
        <div className='registration-box'>
            <h1>Registration</h1>
            <div className="reg-box">
                <div className="reg-wrapper">
                    <div className='reg-part1'>
                        <p><input className='form-input' type="text" id='name' placeholder='Ваше имя'/></p>
                        <p><input className='form-input' type="email" id='email' placeholder='Ваш электронный адрес'/></p>
                        <p><input className='form-input' type="phone" id='phone' placeholder='Ваш телефон'/></p>
                    </div>
                    <div className='reg-part2'>
                        <p><input className='form-input' type="text" id='login' placeholder='Придумайте логин'/></p>
                        <p><input className='form-input' type="password" id='password' placeholder='Придумайте пароль'/></p>
                        <p><input className='form-input' type="password" id='password' placeholder='Повторите пароль'/></p>
                    </div>
                </div>
            </div>
            <p><button className="btn btn-outline-dark form-but" type='submit'>Register</button></p>
            <p className='registration-p'><Link to="/autorization">Login</Link></p>
        </div>
    )
}

// для 2 шага добавить класс _step2 к div 'reg-wrapper'

export default Registration
