'use strict';

function hightlightCurrent(el) {
    el.style.border = '2px solid red';
}

let currentEl = document.querySelector('body');

function moveDown() {
    currentEl = currentEl.firstElementChild;
    hightlightCurrent(currentEl);
}

function moveRight() {
    currentEl = currentEl.nextElementSibling;
    hightlightCurrent(currentEl);
}

function handler(e) {

    const {id, tagName} = e.target;
    if (tagName === 'BUTTON') {
        switch(id) {
            case 'down':
                return moveDown();
            case 'right':
                return moveRight();
        }
    }
}

document.querySelector('.buttons')
        .addEventListener('click', handler);

