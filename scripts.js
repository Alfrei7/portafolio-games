document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        let currentIndex = 0;
        const images = carousel.querySelectorAll('img');

        const showImage = index => {
            images.forEach((image, i) => {
                if (i === index) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        };

        const nextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        };

        const prevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        };

        setInterval(nextImage, 3000); // Cambiar de imagen cada 3 segundos

        // Agregar botones para cambiar de imagen manualmente
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.classList.add('carousel-button', 'next'); // Agregamos clase 'next' para flecha hacia adelante
        nextButton.addEventListener('click', nextImage);

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.classList.add('carousel-button', 'prev'); // Agregamos clase 'prev' para flecha hacia atrás
        prevButton.addEventListener('click', prevImage);

        carousel.appendChild(nextButton);
        carousel.appendChild(prevButton);

        // Mostrar la primera imagen al cargar la página
        showImage(currentIndex);
    });
});