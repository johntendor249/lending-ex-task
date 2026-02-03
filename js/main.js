document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.burger');
    const navList = document.querySelector('.nav__list');
    const articlesSection = document.querySelector('.articles');

    if (burgerBtn && navList) {
        burgerBtn.addEventListener('click', function() {
            navList.classList.toggle('is-open');
            burgerBtn.classList.toggle('is-active');
            const expanded = navList.classList.contains('is-open');
            burgerBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && !e.target.closest('.burger')) {
                navList.classList.remove('is-open');
                burgerBtn.classList.remove('is-active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            }
        });

        navList.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('is-open');
                burgerBtn.classList.remove('is-active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    let overlay = null;
    let overlayImg = null;

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = '<button class="overlay__close" type="button" aria-label="Закрыть">&times;</button><img class="overlay__image" alt="">';
        overlayImg = overlay.querySelector('.overlay__image');

        overlay.querySelector('.overlay__close').addEventListener('click', closeOverlay);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeOverlay();
            }
        });

        document.body.appendChild(overlay);
    }

    function openOverlay(src) {
        if (!overlay) {
            createOverlay();
        }
        overlayImg.src = src;
        overlay.classList.add('is-active');
        document.body.classList.add('overlay-open');
    }

    function closeOverlay() {
        if (overlay) {
            overlay.classList.remove('is-active');
            document.body.classList.remove('overlay-open');
        }
    }

    if (articlesSection) {
        articlesSection.addEventListener('click', function(e) {
            if (e.target.matches('.article-card__image')) {
                const src = e.target.getAttribute('src');
                openOverlay(src);
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeOverlay();
        }
    });
});
