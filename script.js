/* =========================================================
   script.js
   File ini berisi "perintah" untuk browser. Tugasnya hanya 3:
   1. Membuka & menutup menu saat dilihat di HP
   2. Menampilkan inisial "YM" kalau foto belum diunggah,
      dan kotak keterangan kalau gambar proyek belum ada
   3. Mengisi tahun di bagian paling bawah website secara otomatis

   Semua tulisan di dalam kotak catatan ini, dan tulisan
   setelah tanda garis miring dua ( // ), adalah CATATAN.
   Catatan tidak dibaca browser dan tidak tampil di website.
   ========================================================= */


// ---------- TUGAS 1: MENU DI HP ----------
// Di HP, menu atas disembunyikan dan diganti tombol bergaris tiga (☰).
// Kode ini membuat tombol itu bisa membuka dan menutup menu.

// Mencari tombol ☰ di halaman dan memberinya nama "toggle"
const toggle = document.querySelector('.nav-toggle');
// Mencari daftar menu (About, Experience, dst.) dan memberinya nama "menu"
const menu = document.querySelector('.nav-links');

// "if" artinya "jika". Baris ini memastikan tombol dan menu benar-benar ada
// sebelum dipakai, supaya tidak terjadi error.
if (toggle && menu) {

  // "Saat tombol ☰ diklik, lakukan hal di bawah ini"
  toggle.addEventListener('click', () => {
    // Menempelkan / melepas label "open" pada menu.
    // Di style.css sudah diatur: menu yang punya label "open" akan TAMPIL.
    // Jadi: klik pertama = menu muncul, klik kedua = menu hilang.
    const open = menu.classList.toggle('open');

    // Mengubah tombol ☰ menjadi tanda ✕ saat menu terbuka (diatur di style.css)
    toggle.setAttribute('aria-expanded', open);
    // Keterangan tombol untuk pembaca layar (alat bantu tunanetra)
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Setelah pengunjung mengklik salah satu menu (misalnya "Projects"),
  // menu otomatis tertutup lagi supaya tidak menutupi isi halaman.
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}


// ---------- TUGAS 2a: FOTO PROFIL ----------
// Jika file foto (assets/photo.jpg) sudah ada → foto ditampilkan.
// Jika belum ada → foto disembunyikan, dan yang terlihat adalah inisial "YM".
// Tujuannya: website tetap rapi walaupun foto belum diunggah
// (tidak muncul ikon "gambar rusak").

const portrait = document.getElementById('portrait');   // panel foto di bagian atas
if (portrait) {
  const photo = portrait.querySelector('img');            // gambar foto di dalam panel
  const showPhoto = () => portrait.classList.add('has-photo');   // tampilkan foto, sembunyikan "YM"
  const hidePhoto = () => { photo.style.display = 'none'; };     // sembunyikan foto, "YM" tetap terlihat

  if (photo.complete) {
    // Kalau browser sudah selesai mencoba memuat foto:
    // lebar foto lebih dari 0 berarti foto berhasil dimuat
    photo.naturalWidth > 0 ? showPhoto() : hidePhoto();
  } else {
    // Kalau masih proses memuat: tunggu hasilnya
    photo.addEventListener('load', showPhoto);    // berhasil → tampilkan
    photo.addEventListener('error', hidePhoto);   // gagal → sembunyikan
  }
}


// ---------- TUGAS 2b: GAMBAR PROYEK ----------
// Jika gambar proyek gagal dimuat (misalnya grafik Harga Pangan belum diunggah),
// kotaknya diberi label "missing". Di style.css sudah diatur: kotak berlabel
// "missing" menampilkan tulisan keterangan seperti "Chart preview coming soon",
// bukan ikon gambar rusak.

document.querySelectorAll('.shot img').forEach(img => {
  const markMissing = () => img.parentElement.classList.add('missing');
  if (img.complete && img.naturalWidth === 0) markMissing();
  img.addEventListener('error', markMissing);
});


// ---------- TUGAS 3: TAHUN DI FOOTER ----------
// Mengisi tahun di tulisan "© 2026 Yasyfa Maisun Majidah" paling bawah
// dengan tahun sekarang. Tahun depan otomatis berubah jadi 2027,
// jadi kamu tidak perlu mengubahnya sendiri.

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
