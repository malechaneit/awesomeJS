

document.addEventListener('click', function(event) {

    let target = event.target;

    if(target.tagName === 'A') {
        event.preventDefault();
    }

    history.pushState(null, null, event.target.href);
})