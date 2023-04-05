"use strict"

const burger = document.querySelector('.header__burger');
const burgerItem = document.querySelectorAll('.burger-item');
const navList = document.querySelector('.header__nav-list');
const navLink = document.querySelectorAll('.header__nav-link');
const header = document.querySelector('.header');

burger.addEventListener('click', toggleNavMenu);

navList.addEventListener('click', (e) => {
    if (e.target.tagName == 'A') {
        navLink.forEach((elem => {
            elem.classList.remove('header__nav-link--active');
        }))
        e.target.classList.add('header__nav-link--active');
        toggleNavMenu();
    };
});

header.addEventListener('click', (e) => {
    if (e.target == e.currentTarget) {
        burgerItem[0].classList.remove('header__burger-top');
        burgerItem[1].classList.remove('header__burger-middle');
        burgerItem[2].classList.remove('header__burger-bottom');
        navList.classList.remove('header__nav-list--disable');
    };
});

function toggleNavMenu() {
    burgerItem[0].classList.toggle('header__burger-top');
    burgerItem[1].classList.toggle('header__burger-middle');
    burgerItem[2].classList.toggle('header__burger-bottom');
    navList.classList.toggle('header__nav-list--disable');
};