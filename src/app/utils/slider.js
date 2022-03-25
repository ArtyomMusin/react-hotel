const slideRow = document.querySelector('.slides')
const slides = slideRow.querySelectorAll('.slide')
const left = 0

setInterval(() => {
    left = left / 100 <= slides.length ? left - 100 : 0 
    slideRow.style.left = `-${left}%`
}, 2000)

