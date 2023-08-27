import React from 'react'
import PropTypes from 'prop-types'
import './Sidebar.scss'

const Sidebar = ({ data, onClick, name, current }) => {
    return (
        <section className="Sidebar">
            <ul className="Sidebar__List">
                {data?.map((item, i) =>
                    <li key={item._id} className={`Sidebar__Item${current === item._id ? ' _active' : ''}`} onClick={() => onClick(item._id)}>
                        {item[name]}
                    </li>
                )}
            </ul>
        </section>
    )
}

Sidebar.defaultProps = {
    name: 'name'
}
Sidebar.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
    onClick: PropTypes.func,
    current: PropTypes.string
}

export default Sidebar
