import React from 'react'
import PropTypes from 'prop-types'

const Preloader = ({ color }) => {
    return (
        <div className={`spinner-border ${color}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

Preloader.defaultProps = {
    color: 'text-light'
}

Preloader.propTypes = {
    color: PropTypes.string
}

export default Preloader
