import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ data, value, allItemsName, onChange }) => {
    return (
        <select className="form-select mb-3" aria-label="Disabled select example" value={value} onChange={e => onChange(e.target.value)}>
            <option value="all">{ allItemsName }</option>
            {data ? (
                data.map(item =>
                    <option key={item._id} value={item._id}>{item.name}</option>
                )
            ) : (
                <option value="Loading" disabled>Loading...</option>
            )}
        </select>
    )
}

Select.defaultProps = {
    allItemsName: 'All'
}

Select.propTypes = {
    data: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    allItemsName: PropTypes.string,
    onChange: PropTypes.func
}

export default Select
