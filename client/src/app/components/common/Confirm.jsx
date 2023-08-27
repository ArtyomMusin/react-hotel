import React from 'react'
import PropTypes from 'prop-types'

const Confirm = ({ onClick, description }) => {
    return (
        <div className="d-flex flex-column">
            <h3 className={`text-center ${description ? 'mb-0' : 'mb-3'}`}>Are you sure?</h3>
            {description && <p className="mb-3">{description}</p>}
            <div className="d-flex flex-row gap-3 justify-content-center">
                <button className="btn btn-success" onClick={() => onClick(true)}>Yes</button>
                <button className="btn btn-danger" onClick={() => onClick(false)}>No</button>
            </div>
        </div>
    )
}
Confirm.propTypes = {
    onClick: PropTypes.func,
    description: PropTypes.string
}

export default Confirm
