import React from 'react'
import PropTypes from 'prop-types'

const ContainerWrapper = ({ children }) => {
    return (
        <div className="main d-flex flex-column justify-content-center flex-align-between h-100">
            {children}
        </div>
    )
}

ContainerWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ContainerWrapper
