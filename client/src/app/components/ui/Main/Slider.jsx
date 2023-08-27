import React, { useEffect, useRef } from 'react'
import './Slider.scss'

const Slider = () => {
    const slider = useRef()
    const isListener = useRef(false)

    useEffect(() => {
        if (!isListener.current) {
            sliderSwitcher()
            isListener.current = true
        }
    }, [slider.current])

    const sliderSwitcher = () => {
        if (!slider.current) return
        const items = Array.from(slider.current?.querySelectorAll('.Slider__Item'))
        setInterval(() => {
            const currentSlideIndex = items.findIndex(item => item.classList.contains('_active'))
            items[currentSlideIndex].classList.remove('_active')
            if (currentSlideIndex !== items.length - 1) {
                items[currentSlideIndex + 1].classList.add('_active')
            } else {
                items[0].classList.add('_active')
            }
        }, 7000)
    }
    return (
        <section className='Slider' ref={slider}>
            <ul className="Slider__Slides">
                <li className="Slider__Item _active">
                    <section className="Slider__Slogan slogan">
                        <p className="slogan__info-1">Hotels around the world</p>
                        <p className="slogan__info-2 mb-1">More than 150 cities</p>
                        <p className="slogan__info-3">Convenient location</p>
                    </section>
                    <img className='Slider__Slide' src="/img/slider/1.png" alt="slide1" />
                </li>
                <li className="Slider__Item">
                    <section className="Slider__Slogan slogan">
                        <p className="slogan__info-1">Modern rooms</p>
                        <p className="slogan__info-2 mb-1">Comfortable conditions</p>
                        <p className="slogan__info-3">Beautiful views</p>
                    </section>
                    <img className='Slider__Slide' src="/img/slider/2.jpg" alt="slide2" />
                </li>
                <li className="Slider__Item">
                    <section className="Slider__Slogan slogan">
                        <p className="slogan__info-1">Quality service</p>
                        <p className="slogan__info-2 mb-1">The joy of the trip</p>
                        <p className="slogan__info-3">Home comfort</p>
                    </section>
                    <img className='Slider__Slide' src="/img/slider/3.jpg" alt="slide3" />
                </li>
            </ul>
        </section>
    )
}

export default Slider
