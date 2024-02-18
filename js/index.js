const sliderImages = document.querySelectorAll('.slider__img')
const sliderLine = document.querySelector('.slider__line')
const sliderBtnNext = document.querySelector('.slider__btn_next')
const sliderBtnPrev = document.querySelector('.slider__btn_prev')
const sliderDots = document.querySelectorAll('.slider__dot')

let sliderCount = 0
let sliderWidth = 0

window.addEventListener('resize',sliderShow)
sliderBtnNext.addEventListener('click', sliderNext)
sliderBtnPrev.addEventListener('click', sliderPrev)

function sliderShow() {
    sliderWidth = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + 'px'
    sliderImages.forEach(i => i.style.width = sliderWidth + 'px')
    rollSlider()
}
sliderShow()

function sliderNext() {
    sliderCount++;
    if(sliderCount >= sliderImages.length) sliderCount = 0
    rollSlider()
    sliderActive(sliderCount)
}

function sliderPrev() {
    sliderCount--;
    if(sliderCount < 0) sliderCount = sliderImages.length -1
    rollSlider()
    sliderActive(sliderCount)
}

function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`
}

function sliderActive(index) {
    sliderDots.forEach(i => i.classList.remove('active-dot'))
    sliderDots[index].classList.add('active-dot')
}

sliderDots.forEach((dot,index)=>{
    dot.addEventListener('click', () => {
        sliderCount = index;
        rollSlider()
        sliderActive(index)
    })
})

//swipe

document.querySelector('.slider').addEventListener("touchstart", handleTouchStart, false);
document.querySelector('.slider').addEventListener("touchmove", handleTouchMove, false);

let x1 = 0

function handleTouchStart(event) {
    const oneTouch = event.touches[0];
    x1 = oneTouch.clientX
}


function handleTouchMove(event) {
    if(!x1){
        return false
    }
    let x2 = event.touches[0].clientX
    
    let xDiff = x2 - x1

    if(xDiff > 0){
        sliderPrev()
    }
    else{
        sliderNext()
    }
    x1=null
}



