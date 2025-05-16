// Close welcome message
function closeWelcome() {
    document.getElementById('welcomeMessage').style.display = 'none';
}

// Show popup after 10 seconds
setTimeout(function() {
    document.getElementById('popupMessage').style.display = 'block';
}, 10000);

// Admin panel login
function promptLogin() {
    const password = prompt("Ingresa la contraseña para iniciar sesión:");
    if (password === "Josejavier20") {
        document.getElementById('adminPanel').style.display = 'block';
    } else {
        alert("Contraseña incorrecta");
    }
}

// Image upload and carousel with localStorage
let images = JSON.parse(localStorage.getItem('carouselImages')) || [];
let currentIndex = 0;

function uploadImages() {
    const fileInput = document.getElementById('imageUpload');
    const files = fileInput.files;
    const carouselContainer = document.getElementById('carouselContainer');

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            images.push(e.target.result);
            localStorage.setItem('carouselImages', JSON.stringify(images));
            const img = document.createElement('img');
            img.src = e.target.result;
            carouselContainer.appendChild(img);
        };
        reader.readAsDataURL(files[i]);
    }

    updateCarousel();
}

// Load saved images from localStorage on page load
window.onload = function() {
    const carouselContainer = document.getElementById('carouselContainer');
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        carouselContainer.appendChild(img);
    });
    updateCarousel();
};

function updateCarousel() {
    if (images.length === 0) return;
    const carouselContainer = document.getElementById('carouselContainer');
    carouselContainer.style.transform = `translateX(-${currentIndex * 310}px)`;
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }, 3000); // Change image every 3 seconds
}
