loadImages();


// function attachLazyImages() {
//   const lazyImages = document.querySelectorAll(".lazy-image");

//   function onIntersection(imageEntities) {
//     imageEntities.forEach(image => {
//       if (image.isIntersecting) {
//         observer.unobserve(image.target);
//         image.target.src = image.target.dataset.src;
//       }
//     });
//   }

//   const observer = new IntersectionObserver(onIntersection);

//   lazyImages.forEach(image => observer.observe(image));
// }

async function loadImages() {
  const imageList = await fetch("/images.json").then(res => res.json())

  // build the container
  const cardContainer = document.querySelector(".container")
  cardContainer.innerHTML = "";
  // fill the image source tag with invisible pixel
  // see: https://fvdm.com/code/transparent-1px-png
  const invisiblePixel = "data:image/png;base64, wolQTkcNChoKAAAADUlIRFIAAAABAAAAAQgGAAAAHxXDhMKJAAAACklEQVR4AWMAAQAABQABNsOQwojDnQAAAABJRU5Ewq5CYMKC"

  // every 3 images we wrap in a row
  imageList.forEach(function (imageData) {

    cardContainer.innerHTML += `
    <div class="col-md-4 mt-4">
      <div class="card">
        <div class="card__image-container">
          <img class="card-img-top card__image--cover lazy-image" 
              src="${invisiblePixel}" 
              data-src="${imageData.image}" 
              alt="Day At The Library">
        </div>
        <div class="card-body">
          <p class="card-text font-weight-bold mt-2">${imageData.description}</p>
        </div>
      </div>
    </div>
    `
  })

  // now add the lazy load capability to each of these IMG tags...
}

