import React from 'react'

const Registration1 = () => {
    return (
        <>
            <p><input className='form-input' type="text" id='name' placeholder='Ваше имя'/></p>
            <p><input className='form-input' type="email" id='email' placeholder='Ваш электронный адрес'/></p>
            <p><input className='form-input' type="phone" id='phone' placeholder='Ваш телефон'/></p>
            <button>Следующий шаг</button>
        </>
    )
}
 
export default Registration1;