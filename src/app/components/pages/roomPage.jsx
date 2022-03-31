import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const RoomPage = ({ obj, match }) => {
    const roomIndex = Number(Object.keys(obj).find(key => obj[key].room === Number(match.params.roomId)))
    const prevPage = match.path === '/myrooms/:roomId' ? '/myrooms' : '/allrooms'
    const quantityPages = Object.keys(obj).length
    const currentPage = Number(match.params.roomId)

    return (
        <>
            <Link className="back-link" to={prevPage}>
                <ul className="link-dark"><li>&#10229; Вернуться {match.path === '/myrooms/:roomId' ? 'к списку моих номеров' : 'ко всем доступным номерам'}</li></ul>
            </Link>
            <div className='roomPage'>
                <div className='roomPage__img'>
                    <img src={obj[roomIndex].img} alt="фото" />
                </div>
                <div>
                    <h2>Номер №{obj[roomIndex].room}</h2>
                    <p>Количество спальных мест: {obj[roomIndex].persons}</p>
                    <p>Этаж: {obj[roomIndex].floor}</p>
                    <p>Описание:<br/>{obj[roomIndex].description}</p>
                </div>
            </div>
            <div className='roomPage__box-buttons'>
                <button className={`btn btn-dark prev-next-room-but ${currentPage === 1 && '_hidden'}`} disabled={currentPage <= 1}>
                    <Link className='prev-next-room-link' to={`${prevPage}/${roomIndex - 1}`}>
                        &#10229; Перейти к номеру {roomIndex > 0 ? roomIndex - 1 : roomIndex}
                    </Link>
                </button>
                <button className={`btn btn-dark prev-next-room-but ${currentPage === quantityPages && '_hidden'}`} disabled={currentPage >= quantityPages}>
                    <Link className='prev-next-room-link' to={`${prevPage}/${roomIndex + 1}`}>
                        Перейти к номеру {roomIndex + 1} &#10230;
                    </Link>
                </button>
            </div>
        </>
    )
}

RoomPage.propTypes = {
    obj: PropTypes.object.isRequired,
    match: PropTypes.object
}

export default RoomPage
