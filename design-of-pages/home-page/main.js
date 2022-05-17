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

// Clicked on hamburger menu
menuHamBx.addEventListener('click', () => {
    // console.log('clicked to mobile menu');

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



// HEADER
const headerBxs = document.querySelectorAll('.header__bx');
const prevBtn = document.querySelector('.headerBtn-prev');
const nextBtn = document.querySelector('.headerBtn-next')
let autoHeaderMove;

let index = 0;
headerBxs[index].classList.add('acHeader');

function prevHeader(){
    headerBxs[index].style.animation = null;
    headerBxs[index].style.animation = "headerOutPrev 500ms ease-in-out forwards";
    index = index === 0 ? headerBxs.length - 1 : index - 1;
    headerBxs[index].style.animation = "headerInPrev 500ms ease-in-out forwards";
}

function nextHeader(){
    headerBxs[index].style.animation = null;
    headerBxs[index].style.animation = "headerOutNext 500ms ease-in-out forwards";
    index = index === headerBxs.length - 1 ? 0 : index + 1;
    headerBxs[index].style.animation = "headerInNext 500ms ease-in-out forwards";
}

// Click listeners on arrows
prevBtn.addEventListener('click', () => {
    prevHeader();
    prevBtn.disabled = true;
    clearInterval(autoHeaderMove);
    setTimeout(function(){
        prevBtn.disabled = false;
        autoHeaderStart();
    }, 800);
});

nextBtn.addEventListener('click', () => {
    nextHeader();
    nextBtn.disabled = true;
    clearInterval(autoHeaderMove);
    setTimeout(function(){
        nextBtn.disabled = false;
        autoHeaderStart();
    }, 800);
});

// Auto header move
function autoHeaderStart(){
    autoHeaderMove = setInterval(function(){
        nextHeader();
    }, 5000);
}
autoHeaderStart();


// ABOUT 3D SECTION
const aboutContainers = document.querySelectorAll('.about__3dContainer');

aboutContainers.forEach(aboutContainer => {
    let aboutBx = aboutContainer.querySelector('.about__box');
    let mouseX;
    let mouseY;
    let transformAmount = 4;

    function handleMouseEnter(){
        setTimeout(() => {
            aboutBx.style.transition = "";
        }, 100);
        
        aboutBx.style.transition = "transform 0.1s";
    }

    function transformMouseMove(mouse){
        mouseX = mouse.pageX;
        mouseY = mouse.pageY;

        let centerX = aboutContainer.offsetLeft + aboutContainer.clientWidth / 2;
        let centerY = aboutContainer.offsetTop + aboutContainer.clientHeight / 2;

        let percentX = (mouseX - centerX) / (aboutContainer.clientWidth / 2);
        let percentY = -((mouseY - centerY) / (aboutContainer.clientHeight / 2));

        aboutBx.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
    }

    function handleMouseLeave(){
        aboutBx.style.transition = "transform 0.1s";

        setTimeout(() => {
            aboutBx.style.transition = "";
        }, 100);

        aboutBx.style.transform = "perspective(400px) rotateX(0deg) rotateY(0deg)";
    }

    aboutContainer.addEventListener('mouseenter', handleMouseEnter);
    aboutContainer.addEventListener('mousemove', transformMouseMove);
    aboutContainer.addEventListener('mouseleave', handleMouseLeave);
})