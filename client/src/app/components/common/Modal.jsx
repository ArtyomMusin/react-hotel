import React from 'react'
import './Modal.scss'
import useModal from '../../context/useModal'

const Modal = () => {
    const { content, modalIsShow, onClose } = useModal()

    const closeModal = (e) => {
        if (!e.target?.classList?.contains('Modal')) return
        onClose(e)
    }

    return (
        <div className={`Modal d-flex flex-column justify-content-center align-items-center w-100 h-100 ${modalIsShow ? '_visible' : ''}`} onClick={e => closeModal(e)}>
            <div className="Modal__Wrapper">
                {content}
            </div>
        </div>
    )
}

export default Modal
