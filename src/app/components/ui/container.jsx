import React from 'react'
import PropTypes from 'prop-types'

const ContainerWrapper = ({ children }) => {
    return (
        <div className="container d-flex flex-column flex-align-between mt-4 h-100" style={{ paddingBottom: 60 }}>
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
