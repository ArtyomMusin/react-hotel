import React from 'react'
import PropTypes from 'prop-types'
import './ContentWrapper.scss'

const ContentWrapper = ({ children, className, ...props }) => {
    return (
        <section className={`container d-flex flex-column justify-content-start ${className}`} {...props}>
            {children}
        </section>
    )
}

ContentWrapper.defaultProps = {
    className: ''
}

ContentWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    className: PropTypes.string
}

export default ContentWrapper
