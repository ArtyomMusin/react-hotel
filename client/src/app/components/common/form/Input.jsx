import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Input = ({ className, inputClassName, type, id, placeholder, onChange, value, error }) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    return (
        <div className={`${className}`}>
            <div className="input-group has-validation">
                <input
                    className={`AuthModal__Input ${inputClassName} form-control ${error ? 'is-invalid' : ''}`}
                    type={showPassword ? 'text' : type}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                {type === 'password' && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i className={`bi bi-eye ${showPassword ? '-slash' : ''}`}></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}
Input.defaultProps = {
    type: 'text',
    inputClassName: '',
    className: ''
}
Input.propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.string
}

export default Input
