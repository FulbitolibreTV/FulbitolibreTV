// Close welcome message
function closeWelcome() {
    document.getElementById('welcomeMessage').style.display = 'none';
}

// Show popup after 10 seconds
setTimeout(function() {
    const popup = document.getElementById('popupMessage');
    if (popup) popup.style.display = 'block';
}, 10000);

// Admin panel login (for index.html)
function promptLogin() {
    window.location.href = 'admin.html';
}

// Image upload and carousel with localStorage
let images = JSON.parse(localStorage.getItem('carouselImages')) || [];

function uploadImages() {
    const fileInput = document.getElementById('imageUpload');
    const durationInput = document.getElementById('imageDuration');
    const duration = parseInt(durationInput.value) || 3; // Default to 3 seconds
    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            images.push({ src: e.target.result, duration: duration * 1000 });
            localStorage.setItem('carouselImages', JSON.stringify(images));
            const carouselContainer = document.getElementById('carouselContainer');
            if (carouselContainer) {
                const img = document.createElement('img');
                img.src = e.target.result;
                carouselContainer.appendChild(img);
            }
            loadImages(); // Update admin image list
        };
        reader.readAsDataURL(files[i]);
    }

    fileInput.value = '';
    durationInput.value = '';
}

// Load saved images from localStorage
function loadImages() {
    const carouselContainer = document.getElementById('carouselContainer');
    const imageList = document.getElementById('imageList');

    if (carouselContainer) {
        carouselContainer.innerHTML = '';
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.src;
            carouselContainer.appendChild(img);
        });
        updateCarousel();
    }

    if (imageList) {
        imageList.innerHTML = '';
        images.forEach((image, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${image.src}" alt="Carousel Image"> Duración: ${image.duration / 1000}s <button onclick="deleteImage(${index})">Eliminar</button>`;
            imageList.appendChild(li);
        });
    }
}

function deleteImage(index) {
    images.splice(index, 1);
    localStorage.setItem('carouselImages', JSON.stringify(images));
    loadImages();
}

function updateCarousel() {
    if (images.length === 0) return;
    const carouselContainer = document.getElementById('carouselContainer');
    if (carouselContainer) {
        carouselContainer.style.transform = `translateX(-${currentIndex * 310}px)`;
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }, images[currentIndex].duration); // Use image-specific duration
    }
}

// Event management
let events = JSON.parse(localStorage.getItem('events')) || [
    { time: '21:00', title: 'Copa Sudamericana: Once Caldas vs Gualberto Villarroel SJ', link: 'https://streamtp4.com/global1.php?stream=espn', channel: 'ESPN' },
    { time: '21:00', title: 'Copa Sudamericana: Cienciano vs Deportes Iquique', link: 'https://streamtp4.com/global1.php?stream=dsportsplus', channel: 'DSports Plus' },
    { time: '21:00', title: 'Liga MX: Cruz Azul vs América', link: 'https://streamtp4.com/global1.php?stream=tudn_usa', channel: 'TUDN USA' },
    { time: '21:00', title: 'Liga MX: Cruz Azul vs América', link: 'https://streamtp4.com/global1.php?stream=canal5mx', channel: 'Canal 5 MX' }
];

function addEvent() {
    const time = document.getElementById('eventTime').value;
    const title = document.getElementById('eventTitle').value;
    const link = document.getElementById('eventLink').value;
    const channel = document.getElementById('eventChannel').value;

    if (time && title && link && channel) {
        events.push({ time, title, link, channel });
        localStorage.setItem('events', JSON.stringify(events));
        document.getElementById('eventTime').value = '';
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventLink').value = '';
        document.getElementById('eventChannel').value = '';
        loadEvents();
    } else {
        alert('Por favor, completa todos los campos del evento.');
    }
}

function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}

function loadEvents() {
    const eventList = document.getElementById('eventList');
    const adminEventList = document.getElementById('adminEventList');
    
    if (eventList) {
        eventList.innerHTML = '';
        events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${event.link}" target="_blank">${event.time} - ${event.title} (${event.channel})</a>`;
            eventList.appendChild(li);
        });
    }

    if (adminEventList) {
        adminEventList.innerHTML = '';
        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${event.time} - ${event.title} (${event.channel}) <button onclick="deleteEvent(${index})">Eliminar</button>`;
            adminEventList.appendChild(li);
        });
    }
}

// Announcement management
let announcements = JSON.parse(localStorage.getItem('announcements')) || [];

function addAnnouncement() {
    const text = document.getElementById('announcementText').value;
    if (text) {
        announcements.push(text);
        localStorage.setItem('announcements', JSON.stringify(announcements));
        document.getElementById('announcementText').value = '';
        loadAnnouncements();
    } else {
        alert('Por favor, ingresa el texto del anuncio.');
    }
}

function deleteAnnouncement(index) {
    announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(announcements));
    loadAnnouncements();
}

function loadAnnouncements() {
    const announcementList = document.getElementById('announcementList');
    const adminAnnouncementList = document.getElementById('adminAnnouncementList');
    
    if (announcementList) {
        announcementList.innerHTML = '';
        announcements.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            announcementList.appendChild(li);
        });
    }

    if (adminAnnouncementList) {
        adminAnnouncementList.innerHTML = '';
        announcements.forEach((text, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${text} <button onclick="deleteAnnouncement(${index})">Eliminar</button>`;
            adminAnnouncementList.appendChild(li);
        });
    }
}

// Load data on page load
let currentIndex = 0;
window.onload = function() {
    loadImages();
    loadEvents();
    loadAnnouncements();
};
