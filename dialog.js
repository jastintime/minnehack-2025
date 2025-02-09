const dialog = document.querySelector(`dialog`);
const dialogCloseButton = document.querySelector(`.close`);
dialogCloseButton.addEventListener(`click`, () => dialog.close());

const carousel = document.getElementById(`carousel`);

export function showModalLocation(location) {
   console.log(`location:`, location);
   const images = location.images;
   const imageElements = images.map(img => {
      let slide = document.createElement(`swiper-slide`);
      let imageElement = document.createElement(`img`);
      imageElement.src = img.location;
      slide.appendChild(imageElement);
      return slide;
   });
   console.log(imageElements);
   // carousel.shadowRoot.replaceChildren(imageElements);

   dialog.showModal();
}
