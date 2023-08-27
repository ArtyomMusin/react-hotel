import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const modalContext = createContext({})

const useModal = () => {
    return useContext(modalContext)
}

export const ModalProvider = ({ children }) => {
    const [modalIsShow, setModalIsShow] = useState(false)
    const [content, setContent] = useState('')
    const [onClose, setOnClose] = useState(closeModal)
    const [modalClosedListener, setListener] = useState(null)

    function closeModal() {
        setModalIsShow(false)
    }

    const openModal = () => {
        setModalIsShow(true)
    }

    const toggleModal = () => {
        setModalIsShow(prevState => !prevState)
    }

    const setCloseHandler = (callback) => {
        setOnClose(() => callback)
    }

    const setModalClosedListener = (callback) => {
        setListener(() => callback)
    }

    const dropLogic = () => {
        setCloseHandler(closeModal)
        setListener(null)
    }

    useEffect(() => {
        dropLogic()
    }, [content])

    useEffect(() => {
        if (modalIsShow && modalClosedListener) {
            modalClosedListener()
        }
    }, [modalIsShow])

    const modalValues = { content, setContent, modalIsShow, toggleModal, openModal, closeModal, onClose, setCloseHandler, setModalClosedListener }

    return (
        <modalContext.Provider value={modalValues}>
            {children}
        </modalContext.Provider>
    )
}
ModalProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export default useModal
