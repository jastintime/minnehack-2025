const dialog = document.querySelector(`dialog`);
const dialogCloseButton = document.querySelector(`.close`);
dialogCloseButton.addEventListener(`click`, () => dialog.close());

const carousel = document.getElementById(`carousel`);

export function showModalLocation(location) {
   console.log(`location:`, location);
   const images = location.images;
   const imageElements = images.map(img =>
   `<swiper-slide>
            <h1 class="title">${img.name}</h1>
            <img src="${img.location}">
            <p class="description">${img.description}</p>
   </swiper-slide>`);
   carousel.outerHTML = `<swiper-container id="carousel" navigation="true">
   ${imageElements.join('')}
</swiper-container>`;


   dialog.showModal();
}
