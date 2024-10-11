import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { getIsLoggedIn } from '../../store/authReducer'
import { getRole } from '../../store/userReducer'
import ContentWrapper from '../ui/hoc/ContentWrapper'
import PageLoaderLoader from '../common/ContentLoaderLarge'

const ProtectedRoute = ({ component: Component, children, role, ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const authRole = useSelector(getRole())

    const getComponent = (props) => {
        if (isLoggedIn && !authRole) {
            return (
                <ContentWrapper>
                    <PageLoaderLoader/>
                </ContentWrapper>
            )
        }
        if (isLoggedIn && (authRole === role || role === 'all')) {
            return Component ? <Component {...props}/> : children
        }
        return <Redirect to='/'/>
    }

    return (
        <Route {...rest} render={(props) => getComponent(props)} />
    )
}
ProtectedRoute.defaultProps = {
    role: 'user'
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    role: PropTypes.string
}

export default ProtectedRoute
