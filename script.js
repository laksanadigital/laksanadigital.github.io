// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Desktop    // macOS Style Clock (Jakarta Time / WIB)
function updateClock() {
    const clockElement = document.getElementById('nav-clock');
    if (clockElement) {
        const options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', options);
        clockElement.textContent = timeString + " WIB";
    }
}
setInterval(updateClock, 1000);
updateClock();

// Typewriter effect
const tText = "Membangun Ekosistem Digital Berkelanjutan_";
let i = 0;
const speed = 60;

function typeWriter() {
    const target = document.getElementById("typewriter-text");
    if (target && i < tText.length) {
        target.innerHTML += tText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else if (target) {
        setInterval(() => {
            // Blinking cursor
            if (target.innerHTML.endsWith('_')) {
                target.innerHTML = target.innerHTML.slice(0, -1) + '<span style="color: transparent;">_</span>';
            } else {
                target.innerHTML = target.innerHTML.slice(0, -32) + '_';
            }
        }, 500);
    }
}

// Smooth scrolling and Nav active state handling
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.mobile-nav .nav-item, .nav-links a');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll(`a[href="${targetId}"]`).forEach(nav => {
                nav.classList.add('active');
            });

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('href') && nav.getAttribute('href').includes(current)) {
            nav.classList.add('active');
        }
    });
});

// Advanced Scroll Animation Observer (Modern appearance)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            // Remove class when out of view to re-animate when scrolling back
            entry.target.classList.remove('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});


// Web3Forms AJAX Submission Script
const form = document.getElementById('contactForm');
const result = document.getElementById('form-result');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = this.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Memproses Transmisi <i class="fas fa-spinner fa-spin"></i>';
        result.style.display = 'none';

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = 'Data Terkirim! Pesan Anda telah diterima server kami. <i class="fas fa-check-circle" style="color:#00ff41"></i>';
                    result.style.color = '#00ff41';
                    btn.innerHTML = 'Terkirim <i class="fas fa-check"></i>';
                    btn.style.background = "#00FF41";
                    btn.style.color = "#000";
                    form.reset();
                } else {
                    result.innerHTML = json.message || "Oops! Terjadi kesalahan jalur komunikasi.";
                    result.style.color = '#ff4444';
                    btn.innerHTML = originalText;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Oops! Gangguan sistem jaringan.";
                result.style.color = '#ff4444';
                btn.innerHTML = originalText;
            })
            .then(function () {
                result.style.display = 'block';
                setTimeout(() => {
                    result.style.display = 'none';
                    if (btn.innerHTML.includes('Terkirim')) {
                        btn.innerHTML = originalText;
                        btn.style.background = "";
                        btn.style.color = "";
                    }
                }, 5000);
            });
    });
}

// Initialize particles.js for the dynamic tech background
window.onload = () => {
    typeWriter();

    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff41" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#008f11", "opacity": 0.5, "width": 1 },
                "move": { "enable": true, "speed": 1.2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 180, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
};
