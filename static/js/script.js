// Neelima Girls Hostel - Dynamic Website JavaScript

const API_BASE_URL = (window && window.API_BASE_URL) ? window.API_BASE_URL : '';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initFileUpload();
    initGallery();
    initContactForm();
    initScrollAnimations();
    initMap();
    loadMedia();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Admin access functionality
function showAdminSection() {
    document.getElementById('adminUploadSection').style.display = 'block';
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminUploadArea').style.display = 'none';
}

function hideAdminSection() {
    document.getElementById('adminUploadSection').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

function checkAdminAccess() {
    const password = document.getElementById('adminPassword').value;
    const adminPassword = 'neelima2024'; // Set your admin password here
    
    if (password === adminPassword) {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminUploadArea').style.display = 'block';
        showMessage('Admin access granted!', 'success');
    } else {
        showMessage('Invalid password. Access denied.', 'error');
        document.getElementById('adminPassword').value = '';
    }
}

// File upload functionality
function initFileUpload() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const fileTypeRadios = document.querySelectorAll('input[name="fileType"]');

    // Click to upload
    uploadBox.addEventListener('click', function() {
        fileInput.click();
    });

    // Drag and drop functionality
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = '#5a4fcf';
        uploadBox.style.background = '#f0f0ff';
    });

    uploadBox.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = '#6c5ce7';
        uploadBox.style.background = '#f8f9ff';
    });

    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = '#6c5ce7';
        uploadBox.style.background = '#f8f9ff';
        
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        handleFileUpload(files);
    });
}

// Handle file upload
function handleFileUpload(files) {
    const fileType = document.querySelector('input[name="fileType"]:checked').value;
    
    Array.from(files).forEach(file => {
        // Validate file type
        const allowedTypes = {
            photos: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
            videos: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm', 'video/mkv']
        };

        if (!allowedTypes[fileType].includes(file.type)) {
            showMessage(`Invalid file type for ${file.name}. Please select a valid ${fileType.slice(0, -1)}.`, 'error');
            return;
        }

        // Validate file size (50MB max)
        if (file.size > 50 * 1024 * 1024) {
            showMessage(`File ${file.name} is too large. Maximum size is 50MB.`, 'error');
            return;
        }

        uploadFile(file, fileType);
    });
}

// Upload file to server
function uploadFile(file, fileType) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileType);

    // Show loading state
    const uploadBox = document.getElementById('uploadBox');
    const originalContent = uploadBox.innerHTML;
    uploadBox.innerHTML = '<div class="loading"></div><p>Uploading...</p>';

    fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage(`File ${file.name} uploaded successfully!`, 'success');
            loadMedia(); // Refresh gallery
        } else {
            showMessage(data.error || 'Upload failed', 'error');
        }
    })
    .catch(error => {
        console.error('Upload error:', error);
        showMessage('Upload failed. Please try again.', 'error');
    })
    .finally(() => {
        // Restore original content
        uploadBox.innerHTML = originalContent;
    });
}

// Gallery functionality
function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            const filter = this.getAttribute('data-filter');
            filterGalleryItems(filter);
        });
    });
}

// Filter gallery items
function filterGalleryItems(filter) {
    const galleryItems = document.querySelectorAll('.media-item');
    
    galleryItems.forEach(item => {
        const itemType = item.getAttribute('data-type');
        
        if (filter === 'all' || itemType === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// Load media from server
function loadMedia() {
    fetch(`${API_BASE_URL}/api/media`)
    .then(response => response.json())
    .then(data => {
        displayMedia(data);
    })
    .catch(error => {
        console.error('Error loading media:', error);
    });
}

// Display media in gallery
function displayMedia(mediaData) {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (mediaData.length === 0) {
        galleryGrid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No media uploaded yet. Be the first to share!</p>';
        return;
    }

    galleryGrid.innerHTML = '';

    mediaData.forEach(item => {
        const mediaItem = createMediaItem(item);
        galleryGrid.appendChild(mediaItem);
    });
}

// Create media item element
function createMediaItem(item) {
    const mediaItem = document.createElement('div');
    mediaItem.className = 'media-item';
    mediaItem.setAttribute('data-type', item.file_type);
    
    const isVideo = item.file_type === 'videos';
    const mediaSrc = `${API_BASE_URL}/uploads/${item.file_type}/${item.filename}`;
    const mediaElement = isVideo ? 
        `<video controls><source src="${mediaSrc}" type="video/${item.filename.split('.').pop()}"></video>` :
        `<img src="${mediaSrc}" alt="${item.original_name}">`;
    
    mediaItem.innerHTML = `
        ${mediaElement}
        <div class="media-overlay">
            <div class="media-actions">
                <button class="media-action" onclick="viewMedia('${item.id}')" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="media-action" onclick="deleteMedia('${item.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="media-info">
            <h4>${item.original_name}</h4>
            <p>Uploaded: ${new Date(item.upload_date).toLocaleDateString()}</p>
        </div>
    `;
    
    return mediaItem;
}

// View media in full screen
function viewMedia(mediaId) {
    // This would open a modal or full-screen view
    // For now, we'll just show an alert
    alert('View media functionality would open a modal here');
}

// Delete media
function deleteMedia(mediaId) {
    if (confirm('Are you sure you want to delete this media?')) {
        fetch(`${API_BASE_URL}/api/media/${mediaId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Media deleted successfully', 'success');
                loadMedia(); // Refresh gallery
            } else {
                showMessage(data.error || 'Delete failed', 'error');
            }
        })
        .catch(error => {
            console.error('Delete error:', error);
            showMessage('Delete failed. Please try again.', 'error');
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.facility-card, .stat-card, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Map initialization
function initMap() {
    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Hostel coordinates (provided by user)
    const hostelLat = 17.405168072322876;
    const hostelLng = 78.45612569621241;

    // Initialize the map
    const map = L.map('map').setView([hostelLat, hostelLng], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create custom icon for the hostel
    const hostelIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"><i class="fas fa-building"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    // Add marker for the hostel
    const marker = L.marker([hostelLat, hostelLng], { icon: hostelIcon }).addTo(map);

    // Add popup with hostel information
    marker.bindPopup(`
        <div class="map-popup">
            <h4><i class="fas fa-building"></i> Neelima Girls Hostel</h4>
            <p><i class="fas fa-map-marker-alt"></i> 10-1-18/8, Shyam Nagar Colony<br>Masab Tank, Hyderabad 500004</p>
            <p><i class="fas fa-phone"></i> +91 9866978943</p>
            <p><i class="fas fa-envelope"></i> Naidu7700@gmail.com</p>
        </div>
    `);

    // Open popup by default
    marker.openPopup();

    // Add click event to open popup
    marker.on('click', function() {
        marker.openPopup();
    });
}

// Show message to user
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Utility function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.facility-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .filter-btn, .media-action');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
