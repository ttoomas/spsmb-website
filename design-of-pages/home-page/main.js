// MENU
// Disable animation on first page load
setTimeout(() => {
    document.body.classList.remove('prealoadAni');
}, 0);

// Mobile menu animation
const menuHamBx = document.querySelector('.menu__hamBx');
const body = document.querySelector('body');
const nav = document.querySelector('.nav');

// If device is larger than 767px, delete inline height
function getWW(w){
    if(w < 767){
        nav.setAttribute('style', 'height: 110px');
    }
    else{
        nav.removeAttribute('style');
    }
    pushW(w);
}

// Cliked on hamburger menu
menuHamBx.addEventListener('click', () => {
    // console.log('cliked to mobile menu');

    if(body.classList.contains('noscroll')){
        body.classList.remove('noscroll');
        menuHamBx.classList.remove('menuOpened');
        nav.classList.remove('menuOpened');
    }
    else{
        body.classList.add('noscroll');
        menuHamBx.classList.add('menuOpened');
        nav.classList.add('menuOpened');
    }

    if (!nav.style.height || nav.style.height == '100vh') {
        nav.style.height = '110px';
    } else {
        nav.style.height = '100vh';
    }
})

// Mobile menu dropdown links
function pushW(w){
    if(w < 767){
        const mDropdown = document.querySelectorAll('.mDropdown');

        mDropdown.forEach(function(element){
            // or on click event and able delHeight function and disable mouseleave event
            const growDiv = element.querySelector('.mobileMenu__dropGrow');

            element.addEventListener('mouseenter', () => {
                element.classList.add('dropActive');

                const wrapper = element.querySelector('.mobileMenu__dropBx');
                if (growDiv.clientHeight) {
                    growDiv.style.height = 0;
                }
                else {
                    growDiv.style.height = wrapper.clientHeight + "px";
                }
            })
            element.addEventListener('mouseleave', () => {
                growDiv.style.height = 0;
                element.classList.remove('dropActive');
            })
        })
    }
}

const mobileMenuBx = document.querySelectorAll('.mobile__menuBx');

mobileMenuBx.forEach(function(ele){
    ele.addEventListener('mouseenter', () => {
        ele.classList.add('menuActive');
    })
    ele.addEventListener('mouseleave', () => {
        ele.classList.remove('menuActive');
    })
})

// Check window width
window.addEventListener('resize', windowWidth);
windowWidth();

function windowWidth(){
    let windowWidth = window.innerWidth;

    getWW(windowWidth);
}

// Add class on scroll
window.addEventListener('scroll', () => {
    if(window.pageYOffset > 30){
        // console.log('scrolled');

        nav.classList.remove('start-nav');
        nav.classList.add('scroll-on-nav');
    }
    else{
        nav.classList.remove('scroll-on-nav');
        nav.classList.add('start-nav');
    }
})