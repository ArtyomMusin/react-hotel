import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './NavProfile.scss'
// import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authReducer'
import useOutsideClick from '../../hooks/useOutsideClick'

const NavProfile = ({ name }) => {
    const dispatch = useDispatch()
    const [isOpen, setOpen] = useState(false)

    const handlerOutsideClick = (e) => {
        if (e.target?.classList.contains('NavProfile__Toggle') && !isOpen) return
        setOpen(false)
    }

    useEffect(() => {
        useOutsideClick.subscribe('NavProfile', handlerOutsideClick)
        return () => useOutsideClick.unsubscribe('NavProfile')
    }, [])

    return (
        <div className="NavProfile dropdown">
            <div className="NavProfile__Toggle dropdown-toggle" onClick={() => setOpen(prevState => !prevState)}>
                {name}
            </div>
            <div className={`NavProfile__Menu dropdown-menu  ${isOpen ? 'show' : ''}`}>
                {/* <Link to={'/settings'} className="NavProfile__Item dropdown-item"><i className="NavProfile__Icon bi bi-gear"></i>Settings</Link> */}
                <button className="NavProfile__Item dropdown-item" onClick={() => dispatch(logOut())}><i className="NavProfile__Icon bi bi-door-open"></i>Logout</button>
            </div>
        </div>
    )
}
NavProfile.propTypes = {
    name: PropTypes.string
}

export default NavProfile
