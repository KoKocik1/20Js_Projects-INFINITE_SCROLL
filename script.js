const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

// Define the API URL you want to request data from
const client_id = '@kokocik'
const apiKey = '3KWWuSKc2JDJp3GlkYNf5TnsaCfGbH6TslzbFQW1ByQ'
const count = 30
const apiUrl = `https://api.unsplash.com/photos//random?client_id=${apiKey}&count=${count}&collections=201009`;

let ready = false;
let imagesLoaded = 0;
// Check if all images were loaded
function imageLoaded() {
    imagesLoaded ++;
    if(imagesLoaded%count===0) {
        loader.hidden=true;
        ready=true
    }
}
// Function to set Atribiutes
function setAttributes(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {

    totalLoaded=photosArray.length;

    photosArray.forEach((photo) => {
        let img = document.createElement('img');
        let item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}
//On Load

getPhotos();


let ticking = false;

function doSomething(scrollPos) {
    if (document.body.offsetHeight - scrollPos <= 1000 && ready) {
        ready=false;
        getPhotos();
    }
}

document.addEventListener("scroll", (event) => {
    let lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            doSomething(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});
