// MOBILE
const isMobile = window.matchMedia('(max-width: 500px)').matches;

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

// // /// //// ///// //
// Mobile Slider variable
// // /// /////
const productMainImg = document.querySelector('.productMain-image');
const productImg = document.querySelectorAll('.product-image');
///////////////////////////
///////////////////////////\

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

mainImage.addEventListener('click', () => {
  if (isMobile) return;
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
  const newImage2 = productImg[curSlide].getAttribute('data-src');
  lightboxMainImage.src = newImage;
  productMainImg.src = newImage2;

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

////////////////////////////////////////////
/////////////////////////
/// CART
const cartIcon = document.querySelector('.cart-img');
const cart = document.querySelector('.cart');
const cartInfoCon = document.querySelector('.cartINfoCon');
const addToCartBtn = document.querySelector('.add-cart-btn');
const numOnCart = document.querySelector('.productNoCart');

cartIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  cart.style.display = 'block';
});

window.addEventListener('click', (e) => {
  if (
    cart.style.display === 'block' &&
    !cart.contains(e.target) &&
    !addToCartBtn.contains(e.target) &&
    !numOnCart.contains(e.target)
  )
    cart.style.display = 'none';
});

const AddToCartDetails = function (data) {
  return `
   <div class="cartInfo">
            <img
              src="${data.img}"
              alt="cart-img"
              class="cartSec-img"
            />
            <p>
              ${data.tittle} <br />
              $${data.price}.00 x <span class="cart-no">${data.qrt}</span>
              <span class="total-price">$${data.total}.00</span>
            </p>
            <img
              src="./images/icon-delete.svg"
              alt="delete-image"
              class="delete-img"
            />
          </div>
          <button>Checkout</button>
  `;
};

addToCartBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  cart.style.display = 'block';

  const qrt = Number(number.textContent);

  if (qrt > 0) {
    const cartData = {
      tittle: 'Fall Limited Edition Sneakers',
      price: 125,
      qrt: Number(number.textContent),
      total: 125 * qrt,
      img: './images/image-product-1-thumbnail.jpg',
    };

    cartInfoCon.innerHTML = AddToCartDetails(cartData);
    updateCartBadge(qrt);
  } else {
    cartInfoCon.innerHTML = `<p class='emptyCart'>Your Cart is empty</p>`;
    updateCartBadge();
  }
});

cartInfoCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-img')) {
    cart.style.display = 'none';

    cartInfoCon.innerHTML = `<p class='emptyCart'>Your Cart is empty</p>`;

    number.textContent = 0;

    updateCartBadge();
  }
});

const updateCartBadge = function (no) {
  if (number.textContent === 0) numOnCart.textContent = '';
  else numOnCart.textContent = no;
};

////////////////////////  ///////////////////////////
////////////////////////  ///////////////////////////
////////////////////////  ///////////////////////////
////////////////////////  ///////////////////////////
// /////////////////////
//  MOBILE LAYOUT
const mobileNavClose = document.querySelector('.mobileClose-btn');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

const mobileBtnNext = document.querySelector('.mobilebtn-next');
const mobileBtnPre = document.querySelector('.mobilebtn-previous');

mobileNavClose.addEventListener('click', () => {
  navLinks.classList.remove('active');
});
menuBtn.addEventListener('click', () => {
  navLinks.classList.add('active');
});

mobileBtnNext.addEventListener('click', () => goToSlide(curSlide + 1));
mobileBtnPre.addEventListener('click', () => goToSlide(curSlide - 1));
