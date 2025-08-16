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



// === Calculadora de impresión 3D (aproximada) ===
(function(){
  const $ = (s)=>document.querySelector(s);
  const materialSel = $('#material');
  const peso = $('#peso');
  const infill = $('#infill');
  const calidad = $('#calidad');
  const soportes = $('#soportes');
  const acabado = $('#acabado');

  const infillVal = $('#infill-val');
  const precioOut = $('#precio');
  const bdMat = $('#bd-material');
  const bdTiempo = $('#bd-tiempo');
  const bdSop = $('#bd-soportes');
  const bdAca = $('#bd-acabado');

  function estimateTimeHours(pesoG, calidadIdx, infillPct){
    // Heurística simple: más calidad = más tiempo. Más infill = más tiempo.
    // base: 40 g/h en estándar (índice 1)
    const baseRate = 40; // g por hora estándar
    const calidadFactor = [0.65, 1.0, 1.5][calidadIdx]; // rápida, estándar, fina
    const infillFactor = 0.6 + (infillPct/100)*0.8; // 0.6–1.4
    const effectiveRate = baseRate / (calidadFactor * infillFactor);
    return Math.max(0.3, pesoG / effectiveRate); // horas
  }

  function formatMXN(n){
    return n.toLocaleString('es-MX', { style:'currency', currency:'MXN', maximumFractionDigits:0 });
  }

  function recalc(){
    infillVal.textContent = infill.value;
    const matCostPerG = parseFloat(materialSel.selectedOptions[0].dataset.cost); // MXN/g
    const weight = Math.max(1, parseFloat(peso.value||0));

    const timeH = estimateTimeHours(weight, parseInt(calidad.value), parseInt(infill.value));
    const machineRate = 55; // MXN por hora máquina (estándar)
    const machineCost = timeH * machineRate;

    const materialCost = weight * matCostPerG;

    const soporteCost = soportes.checked ? Math.max(30, weight*0.08) : 0;
    const acabadoCost = acabado.checked ? Math.max(80, weight*0.25) : 0;

    // Margen + manejo (10%)
    const subtotal = materialCost + machineCost + soporteCost + acabadoCost;
    const total = Math.ceil(subtotal * 1.10);

    // Update UI
    precioOut.textContent = formatMXN(total).replace('MX$', '$');
    bdMat.textContent = formatMXN(materialCost).replace('MX$', '$');
    bdTiempo.textContent = formatMXN(machineCost).replace('MX$', '$');
    bdSop.textContent = formatMXN(soporteCost).replace('MX$', '$');
    bdAca.textContent = formatMXN(acabadoCost).replace('MX$', '$');
  }

  ['change','input'].forEach(evt=>{
    [materialSel,peso,infill,calidad,soportes,acabado].forEach(el=>el && el.addEventListener(evt,recalc));
  });

  recalc();
})();
