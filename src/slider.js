var gallery = (function() {
    const galleryContainer = document.querySelector('.gallery');

    const imgWidth = document.querySelector('.gallery-container').offsetWidth;

    var position = 0;

    var slides = galleryContainer.querySelectorAll('img'),
        track = galleryContainer.querySelector('.gallery-track'),
        slidesCount = slides.length,
        currentIndex = 0,
        galleryWidth;

        //sliderLeft = galleryContainer.querySelector('.slide-left'),
        //sliderRight = galleryContainer.querySelector('.slide-right'),
        //galleryTrack = galleryContainer.querySelector('.gallery-track'),
        //dotsContainer = galleryContainer.querySelector('.gallery-dots-container'),
        //
        //dotsCounter = galleryContainer.querySelector('.counter'),
        //dots = galleryContainer.querySelector('.dots');

    computeStyles();

    window.addEventListener('resize', computeStyles);

    galleryContainer.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            if(event.target.dataset.dir === 'prev') {
                currentIndex--;
                console.log('----');
            } else {
                currentIndex++;

                console.log('+++');
            }

            moveTo(currentIndex);
        }

    });

    function computeStyles() {

        galleryWidth = document.body.clientWidth;
        slides.forEach(function(slide){
            slide.style.width = galleryWidth + 'px';
        });

        track.style.width = slidesCount * galleryWidth + 'px';
    }


    //sliderLeft.addEventListener('click', function() {
    //    if (position !== 0) {
    //        position += imgWidth;
    //    } else {
    //        position = - (imgCount - 1)*imgWidth;
    //    }
    //
    //    setXPosition(position);
    //});
    //
    //sliderRight.addEventListener('click', function() {
    //    if (position !== - (imgCount - 1)*imgWidth) {
    //        position -= imgWidth;
    //    } else {
    //        position = 0;
    //    }
    //
    //    setXPosition(position);
    //});

    function setXPosition(x) {
        track.style.left =  x + 'px';
        console.log(track.style);
    }

    function moveTo(index, imageWidth) {

        imageWidth = imageWidth || galleryWidth;

        index = (index >= slidesCount) ? index % slidesCount : index;

        index = (index < 0) ? (slidesCount - Math.abs(index) % slidesCount - 1) : index;

        var x = index * imageWidth;

        console.log(x);

        setXPosition(-x);
    }

    return {
        moveTo: moveTo
    };

})();