loadImages();

function attachLazyLoads() {
  // get our list of images
  const imageSet = document.querySelectorAll('.lazy-image')

  // create our image-visibility tracking event listener
  // to do this, we create an "IntersectionObserver" object,
  // and we attach an 'observe' method for each of the images
  // 
  const observer = new IntersectionObserver(imageIntersectionFn);
  imageSet.forEach(function (image) { observer.observe(image) });

  function imageIntersectionFn(imageData) {
    // an array of which images have been affected by this change in 
    // visibility event are passed in, usually it's just 1:
    console.log(`imageData`, imageData)
    // the passed in data is like this:
    // 0: { boundingClientRect: {x: 96, y: -1167, width: 200, height: 4020, top: -1167.28125, …}
    //      intersectionRatio: 0.0030423167627304792
    //      intersectionRect: {x: 96, y: 742, width: 200, height: 12, top: 742.3125, …}
    //      isIntersecting: true
    //      isVisible: false
    //      target: { .. element .. }
    //    }
    // because we only have 1 image affected by each intersection event, we can do this:
    const image = imageData[0]

    console.log(`[imageIntersectionFn] called for ${image.target.dataset.src}`)
    // check if the image is "visible"
    if (image.isIntersecting) {
      // stops listening for a change in image visibility
      observer.unobserve(image.target)
      // switches the IMG tag to load the image url
      // <IMG data-url="111" data-src="222" />
      // --> event.dataset = { url: "111", src="222" }
      image.target.src = image.target.dataset.src
    }
  }
}

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
  attachLazyLoads()
}

