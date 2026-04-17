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
