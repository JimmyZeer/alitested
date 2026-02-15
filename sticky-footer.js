document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('.sticky-footer');
    if (!footer) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 600) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    });
});
