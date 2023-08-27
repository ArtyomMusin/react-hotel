import React from 'react'
import PropTypes from 'prop-types'

const ContainerWrapper = ({ children }) => {
    return (
        <main className="main d-flex flex-column justify-content-start flex-align-between h-100 flex-grow-1 flex-shrink-1">
            {children}
        </main>
    )
}

ContainerWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ContainerWrapper
