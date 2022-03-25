import React from 'react'

const Main = () => {
    return (
        <div className='slider'>
            <ul className="slides">
                <li>
                    <img className='slide' src="https://photos.mandarinoriental.com/is/image/MandarinOriental/miami-suite-oriental-suite-bedroom?wid=4000&fmt=jpeg,rgb&qlt=63,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&icc=sRGB%20IEC61966-2.1&iccEmbed=1&printRes=72&fit=wrap" alt="slide1" />
                </li>
                <li>
                    <img className='slide' src="https://get.wallhere.com/photo/room-interior-vases-fireplace-bedroom-interior-design-design-floor-home-apartment-furniture-property-real-estate-living-room-suite-186742.jpg" alt="slide2" />
                </li>
                <li>
                    <img className='slide'src="https://get.wallhere.com/photo/room-bed-bedroom-interior-design-cottage-estate-home-apartment-property-real-estate-living-room-suite-109655.jpg" alt="slide3" />
                </li>
            </ul>
        </div>
    )
}

export default Main
