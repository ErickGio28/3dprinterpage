// VoxelForge 3D — script.js
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
if (navToggle && menu){
  navToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Portfolio filtering
const chips = document.querySelectorAll('.chip');
const items = document.querySelectorAll('.gallery .item');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  items.forEach(it => {
    const show = f === 'all' || (it.dataset.tags || '').includes(f);
    it.style.display = show ? '' : 'none';
  });
}));

// Contact form (front validation only)
const form = document.getElementById('contactForm');
if (form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()){
      form.reportValidity();
      return;
    }
    const status = form.querySelector('.form-status');
    if (status){
      status.textContent = '¡Gracias! Tu mensaje se ha validado (demo).';
      setTimeout(() => status.textContent = '', 4000);
    }
    form.reset();
  });
}

// Reveal on scroll (IntersectionObserver)
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.2});
reveals.forEach(el => io.observe(el));
