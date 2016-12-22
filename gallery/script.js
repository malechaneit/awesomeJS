'use strict';

var gallery = (function() {
    var gallery          = document.querySelector('#gallery1');
    var track            = gallery.querySelector('.gallery__track');
    var slidesCollection = track.querySelectorAll('.gallery__slide');
    // перетворюємо колекцію елементів (псевдомасив) на справжній масив
    var slides           = Array.prototype.slice.call(slidesCollection);
    var slidesCount      = slides.length;
    var lastIndex        = slidesCount - 1;
    var currentIndex     = 0;

    console.dir(gallery);
    console.dir(track);
    console.dir(slides);

    /**
     * Головна функція, яка активує галерею і запускає початкові налаштування
     */
    function initGallery() {
        gallery.classList.add('js-gallery');
        track.style.transition = 'transform 0.5s ease';

        updateStyles();
        slideTo(0);

        // виконуємо clickHandler() кожен раз при кліку на галерею
        gallery.addEventListener('click', clickHandler);
        // при зміні розмірів вікна виконуємо updateStyles()
        window.addEventListener('resize', updateStyles);

        emit('galleryInit', {
            gallery: gallery,
            slides: slides,
            currentIndex: currentIndex
        });
    }

    /**
     * Оновлює всі необхідні для роботи галереї інлайнові стилі
     */
    function updateStyles() {
        // встановлюємо ширину track рівною сумі ширин слайдів
        track.style.width = gallery.clientWidth * slides.length + 'px';
        // кожному слайду становлюємо ширину рівну ширині галереї
        slides.forEach(function(element, index) {
            element.style.width = gallery.clientWidth + 'px';
        });
        // рухаємо track до початкового слайду (currentIndex)
        setTrackXPos(-slides[currentIndex].offsetLeft);
    }

    /**
     * Функція, яка контролює зміну слайдів галереї
     * @param  {number} index індекс слайду, до якого потрібно перейти
     */
    function slideTo(index) {
        var xPos, leftEdge, rightEdge;
        // якщо переданий index, якому не відповідає жоден зі слайдів,
        // або індекс рівний активному індексу (тобто ми намагаємось перейти
        // на уже активний слайд) то припиняємо виконання функції
        if (
            index < 0
            || index > lastIndex
            || index === currentIndex
            || index == null
        ) return;
        // х - координата наступно слайду відносно галереї
        xPos = slides[index].offsetLeft;
        // рухаємо track до нових координат
        setTrackXPos(-xPos);
        // за допомогою event'a даємо змогу зовнішньому коду
        // зрозуміти, що відбулася зміна слайдів
        emit('gallerySlideChange', {
            slides: slides,
            currentIndex: index,
            prevIndex: currentIndex
        });
        // записуємо індекс нового слайду як активний
        currentIndex = index;
        // якщо слайдів зліва вже не лишилося, то генеруємо event,
        // який сповіщає про це зовнішній код
        if (currentIndex === 0) emit('galleryLeftEdge');
        // якщо слайдів зправа вже не лишилося, то генеруємо event,
        // який сповіщає про це зовнішній код
        if (currentIndex === lastIndex) emit('galleryRightEdge');
    }

    /**
     * Займається створення кастомної події (CustomEvent) для галереї,
     * щоб не повторювати один і той самий код багато разів
     * @param  {string} type назва для кастомної події
     * @param  {object} data дані у вигляді об'єкту, які ми передаємо зовнішньому коду
     */
    function emit(type, data) {
        gallery.dispatchEvent(
            new CustomEvent(type, {
                bubbles: true,
                detail: data || null
            })
        );
    }

    // $('div').on('afterchange', function(e, currentSlide, nextSlide) {
    //     if (currentSlide < 1) {
    //         //...
    //     }
    // });

    /**
     * Рухає track до заданої позиції за допомогою css translate
     * @param {number} pos нова координата x для track
     */
    function setTrackXPos(pos) {
        track.style.transform = 'translate3d(' + (pos) + 'px, 0, 0)';
    }


    /**
     * Обробник події click по галереї.
     * Якщо клік відбувся на кнопці prev чи next,
     * то викликається функція slideTo для відповідного напрямку
     * @param  {Event} e об'єкт події
     */
    function clickHandler(e) {
        var target = e.target;
        if (target.tagName === 'BUTTON') {
            switch (target.getAttribute('data-direction')) {
                case 'prev':
                    slideTo(currentIndex - 1);
                    break;
                case 'next':
                    slideTo(currentIndex + 1);
                    break;
            }
        }
    }

    // API
    return {
        init: initGallery,
        slideTo: slideTo,
        getCurrentSlide: function() {
            return currentIndex;
        }
    };
})();

gallery.init();

el.dispatchEvent(event);

const event = new CustomEvent()
