// Navbar Scroll Effect & Mobile Menu
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Pastikan icon bar hitam saat menu terbuka meskipun belum di-scroll
    if(mobileMenu.classList.contains('active')) {
        navbar.classList.add('scrolled');
    } else if (window.scrollY <= 50) {
        navbar.classList.remove('scrolled');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Animation
const animateElements = document.querySelectorAll('.animate-on-scroll');

const checkScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    animateElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('show');
        }
    });
};

window.addEventListener('scroll', checkScroll);
checkScroll(); // Check on initial load

// Back to Top Button
const backToTopBtn = document.getElementById('btn-back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Form Validation
const form = document.getElementById('formKontak');
const nama = document.getElementById('nama');
const email = document.getElementById('email');
const pesan = document.getElementById('pesan');
const successMsg = document.getElementById('form-success');

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorMsg = formGroup.querySelector('.error-msg');
    errorMsg.innerText = message;
}

function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nama.value.trim() === '') {
        showError(nama, 'Nama wajib diisi');
        isValid = false;
    } else {
        clearError(nama);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email wajib diisi');
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showError(email, 'Format email tidak valid');
        isValid = false;
    } else {
        clearError(email);
    }

    if (pesan.value.trim() === '') {
        showError(pesan, 'Pesan wajib diisi');
        isValid = false;
    } else {
        clearError(pesan);
    }

    if (isValid) {
        // Simulasi pengiriman berhasil
        successMsg.style.display = 'block';
        form.reset();
        
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }
});


// IoT Dashboard Simulation
function formatTime(date) {
    return date.toLocaleTimeString('id-ID') + ' WIB';
}

function updateIoTData() {
    // Helper function to update card styles
    const setStatus = (cardId, statusId, msg, isOk) => {
        const card = document.getElementById(cardId);
        const stat = document.getElementById(statusId);
        
        stat.innerText = msg;
        stat.className = 'dash-status ' + (isOk ? 'stat-ok' : 'stat-warning');
        if(isOk) {
            card.style.borderLeftColor = 'var(--primary)';
        } else {
            card.style.borderLeftColor = 'var(--warning)';
        }
    };

    // Suhu (25 - 35)
    const suhu = Math.floor(Math.random() * 11) + 25;
    document.getElementById('val-suhu').innerText = suhu;
    setStatus('card-suhu', 'stat-suhu', suhu > 31 ? 'Panas' : 'Normal', suhu <= 31);

    // Kelembapan (55 - 80)
    const kel = Math.floor(Math.random() * 26) + 55;
    document.getElementById('val-kel').innerText = kel;
    setStatus('card-kelembapan', 'stat-kel', kel > 75 ? 'Tinggi' : 'Normal', kel <= 75);

    // Kipas (Otomatis menyala jika suhu > 31)
    const kipasOn = suhu > 31;
    document.getElementById('val-kipas').innerText = kipasOn ? 'ON' : 'OFF';
    document.getElementById('val-kipas').style.color = kipasOn ? 'var(--primary)' : 'var(--text-light)';
    setStatus('card-kipas', 'stat-kipas', kipasOn ? 'Aktif' : 'Standby', true);

    // Lampu Penghangat (Menyala jika suhu < 27)
    const lampuOn = suhu < 27;
    document.getElementById('val-lampu').innerText = lampuOn ? 'ON' : 'OFF';
    document.getElementById('val-lampu').style.color = lampuOn ? 'var(--warning)' : 'var(--text-light)';
    setStatus('card-lampu', 'stat-lampu', lampuOn ? 'Aktif' : 'Standby', true);

    // Status Keseluruhan
    const statusMsg = (suhu > 31 || kel > 75) ? 'Perlu Perhatian' : 'Aman';
    const isAman = statusMsg === 'Aman';
    document.getElementById('val-status').innerText = statusMsg;
    setStatus('card-status', 'stat-status', isAman ? 'Sistem Stabil' : 'Menyesuaikan', isAman);

    // Update time
    document.getElementById('last-update').innerText = formatTime(new Date());
}

// Initial update and set interval for every 3 seconds
updateIoTData();
setInterval(updateIoTData, 3000);
