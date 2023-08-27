import React from 'react'
import PropTypes from 'prop-types'

const ItemCard = ({ children }) => {
    return (
        <article className='qwe d-flex flex-column align-items-center p-4 shadow w-100 rounded-2'>
            {children}
        </article>
    )
}

ItemCard.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default ItemCard
