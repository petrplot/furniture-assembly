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

//mask phone
document.addEventListener('DOMContentLoaded', function () {
    let phoneInput =  document.querySelectorAll('input[data-tel]')

    function getInputNumberValue(input) {
        return input.value.replace(/\D/g,"")
    }

    function onPhoneInput(e) {
        let input = e.target;
        let inputNumValue = getInputNumberValue(input); 
        let formattedInpValue = "";
        let selectionStart = input.selectionStart
        
        if(!inputNumValue){
            return input.value = ""
        } 

        if(input.value.length != selectionStart){
            if(e.data && /\D/g.test(e.data)){
                input.value = inputNumValue;
            }
            return
        }

        if(["7","8","9"].indexOf(inputNumValue[0]) > -1){

            if(inputNumValue[0] == 9){
                inputNumValue = "7 "+ inputNumValue;
            }

            let firstSimbol = inputNumValue[0] == "8"? "8": "+7"
            formattedInpValue = firstSimbol + " ";

            if(inputNumValue.length > 1){
                formattedInpValue += "(" +inputNumValue.substring(1, 4)
            }

            if(inputNumValue.length >= 5){
                formattedInpValue += ") " +inputNumValue.substring( 4, 7)
            }

            if(inputNumValue.length >= 8){
                formattedInpValue += "-" +inputNumValue.substring( 7, 9)
            }

            if(inputNumValue.length >= 10){
                formattedInpValue += "-" +inputNumValue.substring(9, 11)
            }
        }else{
            formattedInpValue = "+" + inputNumValue.substring(0,16)
        }
        input.value = formattedInpValue
    }

    function onPhoneKeydown(e) {
        let input = e.target
        if(e.keyCode == 8 && getInputNumberValue(input).length == 1){
            input.value = "";
        }
    }

    function onPhonePaste(e) {
        let pasted = e.clipboardData || window.clipboardData;
        let input = e.target;
        let inputNumValue = getInputNumberValue(input);

        if(pasted){
            let pastedText = pasted.getData("Text")
            if(/\D/g.test(pastedText)){
                input.value = inputNumValue;
            }
        }
    }

    for (let i = 0; i < phoneInput.length; i++) {
        let input = phoneInput[i];
        input.addEventListener('input', onPhoneInput)
        input.addEventListener('keydown', onPhoneKeydown)
        input.addEventListener('paste', onPhonePaste)
    }
})



