const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API
const imageCountLoad = 5;
const apiKey = 'OA39NSiSsrambWLH2lfvMfpBLCYz1c2r8i_Gie4eIFM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imageCountLoad = 30;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element , attributes) {
    for (const key in attributes) {
        element.setAttribute(key , attributes[key]);
    }
}


// CReate Elements for Links & Photos , Add to DOM 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function got each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item , {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img , {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener , check when each is finished loading 
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a> then put both in imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhoto() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error) {
        //Catch error Here
    }
    
}


// Check to see if scrolling near botton of page , Load More Photos
window.addEventListener('scroll' , () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready  = false;
        getPhoto();
    }
})

// On Load
getPhoto()
