const dialog = document.querySelector(`#location`);
const dialogCloseButton = document.querySelector(`.close`);
dialogCloseButton.addEventListener(`click`, () => dialog.close());

export function showModalLocation(location) {
   console.log(`location:`, location);
   const carousel = document.getElementById(`carousel`);
   const images = location.images;
   const imageElements = images.map(img =>
   `<swiper-slide class="image-container">
            <h1 class="title">${img.name}</h1>
            <img src="http://localhost:8080/${img.location}">
            <p class="description">${img.description}</p>
   </swiper-slide>`);
   carousel.outerHTML = `<swiper-container id="carousel" navigation="true">
   ${imageElements.join('')}
</swiper-container>`;


   dialog.showModal();
}
