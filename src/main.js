// Number of Product
const plus = document.querySelector('.image-plus');
const minus = document.querySelector('.image-minus');
const number = document.querySelector('.no');

plus.addEventListener('click', () => {
  number.innerHTML = parseInt(number.innerHTML) + 1;
});
minus.addEventListener('click', () => {
  if (number.innerHTML > 0) {
    number.innerHTML = parseInt(number.innerHTML) - 1;
  } else {
    number.innerHTML = 0;
  }
});

/////////////////////////////////////
// Image Switch
const mainImage = document.querySelector('.productMain-image');
const thumbnailImages = document.querySelectorAll('.product-image');
const thumbnailBox = document.querySelectorAll('.img-box');

thumbnailImages.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    const newimage = thumbnail.getAttribute('data-src');
    console.log(newimage);
    mainImage.src = newimage;

    thumbnailImages.forEach((img) => img.classList.remove('img-active'));
    thumbnail.classList.add('img-active');
  });
});

thumbnailBox.forEach((box) => {
  box.addEventListener('click', () => {
    thumbnailBox.forEach((b) => b.classList.remove('img-active-border'));
    box.classList.add('img-active-border');
  });
});

/////////////////////////////////////////////////////
/////////////////////////////////////
//// LIGHTBOX
const lightbox = document.querySelector('.lightbox');
const closeBtn = document.querySelector('.btn-close');
const lightboxMainImage = document.querySelector('.lightboxMain-image');
const lightboxThumbnailImage = document.querySelectorAll(
  '.lightboxthumbnail-image',
);
const lightboxThumbnailImages = document.querySelector(
  '.lightboxthumbnailImages',
);
const lightboxThumbnailBox = document.querySelectorAll('.lightboxImg-box');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-previous');

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

mainImage.addEventListener('click', () => {
  lightbox.style.display = 'grid';
  goToSlide(curSlide);
});

// Slider
let curSlide = 0;

function goToSlide(index) {
  // Condition
  if (index < 0) index = lightboxThumbnailImage.length - 1;
  if (index >= lightboxThumbnailImage.length) index = 0;

  curSlide = index;

  const newImage = lightboxThumbnailImage[curSlide].getAttribute('data-src');
  lightboxMainImage.src = newImage;

  console.log(curSlide);

  lightboxThumbnailImage.forEach((img) =>
    img.classList.remove('lightboxImg-active'),
  );
  lightboxThumbnailBox.forEach((box) =>
    box.classList.remove('lightboxImg-active-border'),
  );

  lightboxThumbnailImage[curSlide].classList.add('lightboxImg-active');
  lightboxThumbnailBox[curSlide].classList.add('lightboxImg-active-border');
}

btnNext.addEventListener('click', () => goToSlide(curSlide + 1));
btnPrev.addEventListener('click', () => goToSlide(curSlide - 1));

window.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'grid') {
    if (e.key === 'ArrowRight') goToSlide(curSlide + 1);
    if (e.key === 'ArrowLeft') goToSlide(curSlide - 1);
  }
});

// Thumbnail clicks (sync index with slider)
lightboxThumbnailBox.forEach((box, index) => {
  box.addEventListener('click', () => goToSlide(index));
});

//  //  //
// OLD CODE ThumbmailImage Switch

// lightboxThumbnailImage.forEach((thumbnail) => {
//   thumbnail.addEventListener('click', () => {
//     const newimage = thumbnail.getAttribute('data-src');
//     lightboxMainImage.src = newimage;

//     lightboxThumbnailImages.forEach((img) =>
//       img.classList.remove('lightboxImg-active'),
//     );
//     thumbnail.classList.add('lightboxImg-active');
//   });
// });

// lightboxThumbnailBox.forEach((box) => {
//   box.addEventListener('click', () => {
//     lightboxThumbnailBox.forEach((b) =>
//       b.classList.remove('lightboxImg-active-border'),
//     );
//     box.classList.add('lightboxImg-active-border');
//   });
// });
//  // //
