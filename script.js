/* =========================================================
   script.js — Perilaku sederhana website
   1. Menu HP buka-tutup
   2. Menampilkan foto / cadangan jika gambar belum diunggah
   3. Tahun otomatis di footer
   ========================================================= */

// 1. Menu HP: tombol garis tiga membuka dan menutup daftar menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-links');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  // Tutup menu setelah salah satu link diklik
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}

// 2a. Foto profil: kalau assets/photo.jpg ada, tampilkan foto; kalau belum, tampilkan inisial "YM"
const portrait = document.getElementById('portrait');
if (portrait) {
  const photo = portrait.querySelector('img');
  const showPhoto = () => portrait.classList.add('has-photo');
  const hidePhoto = () => { photo.style.display = 'none'; };
  if (photo.complete) {
    photo.naturalWidth > 0 ? showPhoto() : hidePhoto();
  } else {
    photo.addEventListener('load', showPhoto);
    photo.addEventListener('error', hidePhoto);
  }
}

// 2b. Screenshot proyek: kalau gambar gagal dimuat, tampilkan kotak keterangan
document.querySelectorAll('.shot img').forEach(img => {
  const markMissing = () => img.parentElement.classList.add('missing');
  if (img.complete && img.naturalWidth === 0) markMissing();
  img.addEventListener('error', markMissing);
});

// 3. Tahun di footer selalu mengikuti tahun sekarang
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
