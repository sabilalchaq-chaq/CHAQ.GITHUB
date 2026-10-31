// Nav Mobile Burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close nav when link clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Update Time function
function updateTime() {
    const timeDisplay = document.getElementById('last-update');
    const now = new Date();
    timeDisplay.innerText = now.toLocaleTimeString('id-ID') + " WIB";
}

// Simulasi Data IoT
function simulateIoTData() {
    // Suhu 25 - 35
    const suhu = Math.floor(Math.random() * 11) + 25;
    const valSuhu = document.getElementById('val-suhu');
    const statSuhu = document.getElementById('stat-suhu');
    const boxSuhu = document.getElementById('suhu-box');
    
    valSuhu.innerText = suhu + "°C";
    if(suhu > 32 || suhu < 26) {
        statSuhu.innerText = "Waspada";
        boxSuhu.classList.add('warning');
    } else {
        statSuhu.innerText = "Normal";
        boxSuhu.classList.remove('warning');
    }

    // Kelembapan 50 - 80
    const kelembapan = Math.floor(Math.random() * 31) + 50;
    const valKel = document.getElementById('val-kelembapan');
    const statKel = document.getElementById('stat-kelembapan');
    const boxKel = document.getElementById('kelembapan-box');

    valKel.innerText = kelembapan + "%";
    if(kelembapan < 55 || kelembapan > 75) {
        statKel.innerText = "Waspada";
        boxKel.classList.add('warning');
    } else {
        statKel.innerText = "Normal";
        boxKel.classList.remove('warning');
    }

    // Pakan 10 - 100
    // Simulasi turun perlahan
    let pakanVal = parseInt(document.getElementById('val-pakan').innerText);
    if(isNaN(pakanVal)) pakanVal = 80;
    
    // Kurangi pakan
    if(Math.random() > 0.5) pakanVal -= 1;
    if(pakanVal <= 10) pakanVal = 100; // Isi ulang otomatis simulasi

    const valPakan = document.getElementById('val-pakan');
    const statPakan = document.getElementById('stat-pakan');
    const boxPakan = document.getElementById('pakan-box');

    valPakan.innerText = pakanVal + "%";
    if(pakanVal <= 20) {
        statPakan.innerText = "Hampir Habis";
        boxPakan.classList.add('warning');
    } else {
        statPakan.innerText = "Tersedia";
        boxPakan.classList.remove('warning');
    }

    updateTime();
}

// Inisialisasi dan jalankan interval
updateTime();
simulateIoTData();
// Update setiap 5 detik
setInterval(simulateIoTData, 5000);

// Simulasi Form Kontak
const contactForm = document.getElementById('contact-form');
const notif = document.getElementById('form-notif');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Tampilkan notifikasi
    notif.style.display = 'block';
    setTimeout(() => {
        notif.classList.remove('hidden');
    }, 10);

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        notif.classList.add('hidden');
        setTimeout(() => {
            notif.style.display = 'none';
        }, 500);
    }, 3000);

    // Reset form
    contactForm.reset();
});
