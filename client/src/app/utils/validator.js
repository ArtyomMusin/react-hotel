import authService from '../services/auth.service'

export async function validator(data, config) {
    const errors = {}
    async function validate(field, validateMethod, data, config) {
        if (!data.changed) return
        let statusValidate
        switch (validateMethod) {
        case 'isRequired': {
            statusValidate = data.value.trim() === ''
            break
        }
        case 'isEmail': {
            const emailRegExp = /^\S+@\S+\.\S+$/g
            statusValidate = !emailRegExp.test(data.value)
            break
        }
        case 'isExist': {
            if (!data.value) break
            const response = await authService.isExist({ [field]: data.value })
            statusValidate = Number(response.content.status) === 400
            break
        }
        case 'isMatch': {
            statusValidate = data.value !== config.password
            break
        }
        default:
            break
        }
        if (statusValidate) return config.message
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = await validate(
                fieldName,
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    return errors
}
