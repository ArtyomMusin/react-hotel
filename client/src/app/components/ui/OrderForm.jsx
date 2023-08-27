import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../common/form/Input'
import { validator } from '../../utils/validator'
import Preloader from '../common/Preloader'

const OrderForm = ({ onSubmit, isSending }) => {
    const [userDataFromForm, setUserDataFromForm] = useState({
        name: {
            value: '',
            changed: false
        },
        tel: {
            value: '',
            changed: false
        }
    })

    const [errors, setErrors] = useState({})

    const config = {
        name: {
            isRequired: {
                message: 'Name is required'
            }
        },
        tel: {
            isRequired: {
                message: 'Phone is required'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [userDataFromForm])

    const onChange = (field, value) => {
        setUserDataFromForm(prevState => ({ ...prevState, [field]: { value, changed: true } }))
    }

    const validate = async() => {
        const errors = await validator(userDataFromForm, config)
        setErrors(errors)
        return errors
    }

    const allWasChanged = async() => {
        let changed = true
        await setUserDataFromForm(prevState => Object.keys(prevState).reduce((newState, field) => {
            if (prevState[field].changed === false) {
                changed = false
            }
            return { ...newState, [field]: { value: prevState[field].value, changed: true } }
        }, {}))
        return changed
    }

    const { name, tel } = userDataFromForm

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const changed = await allWasChanged()
        const errors = await validate()
        if (!Object.keys(errors).length && changed) {
            const finalData = Object.keys(userDataFromForm).reduce((obj, field) => ({ ...obj, [field]: userDataFromForm[field].value }), {})
            onSubmit(finalData)
        }
    }

    return (
        <form onSubmit={handlerSubmit} className="d-flex flex-column align-items-center" style={{ maxWidth: '207px' }}>
            <h5>Book for:</h5>
            <Input
                className={'mb-2'}
                id="name"
                type="text"
                value={name.value}
                placeholder="Customer name"
                onChange={(e) => onChange('name', e.target.value)}
                error={errors.name}
            />
            <Input
                className={'mb-2'}
                id="tel"
                type="tel"
                value={tel.value}
                placeholder="Customer phone"
                onChange={(e) => onChange('tel', e.target.value)}
                error={errors.tel}
            />
            <button className="btn btn-outline-dark">{isSending ? <Preloader /> : 'to book'}</button>
        </form>
    )
}

OrderForm.propTypes = {
    onSubmit: PropTypes.func,
    isSending: PropTypes.bool
}

export default OrderForm
