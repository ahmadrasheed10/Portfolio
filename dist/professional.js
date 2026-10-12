document.querySelector('#year').textContent = new Date().getFullYear();

const certificateViewer = document.querySelector('#certificate-viewer');
const certificateImage = document.querySelector('#certificate-image');
const certificateStatus = document.querySelector('#certificate-status');
const certificateDownload = document.querySelector('#certificate-download');
const certificateNames = {
  'ignicube-internship.jpg': 'Ignicube — Internship Certificate',
  'maple-leaf-internship.png': 'Maple Leaf — Internship Certificate',
  'ibm-ai-essentials.pdf': 'IBM — Artificial Intelligence Essentials V2',
  'softec26-ai-hackathon.pdf': 'SOFTEC ’26 — AI Hackathon Certificate'
};
let certificateTrigger;
document.querySelectorAll('.certificate-link').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    certificateTrigger = link;
    const original = link.getAttribute('href');
    const title = certificateNames[original.split('/').pop()] || 'Certificate';
    document.querySelector('#certificate-title').textContent = title;
    certificateImage.hidden = true;
    certificateStatus.hidden = false;
    certificateStatus.textContent = 'Loading certificate…';
    certificateImage.alt = title;
    certificateDownload.href = original;
    certificateImage.src = original.replace(/\.pdf$/i, '.png');
    certificateViewer.showModal();
    document.querySelector('.certificate-stage').scrollTop = 0;
  });
});
certificateImage.addEventListener('load', () => {
  certificateImage.hidden = false;
  certificateStatus.hidden = true;
});
certificateImage.addEventListener('error', () => {
  certificateImage.hidden = true;
  certificateStatus.hidden = false;
  certificateStatus.textContent = 'The preview could not load. You can download the original certificate below.';
});
document.querySelector('#close-certificate').addEventListener('click', () => certificateViewer.close());
certificateViewer.addEventListener('click', event => {
  if (event.target !== certificateViewer) return;
  const bounds = certificateViewer.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) certificateViewer.close();
});
certificateViewer.addEventListener('close', () => certificateTrigger?.focus());

// Reveal below-fold content once; never conceal content for reduced-motion users.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pending');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.project-card,.experience-list article,.certificate-card,.about-grid,.contact-section').forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('reveal', 'pending');
      revealObserver.observe(element);
    }
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      revealObserver.disconnect();
      document.querySelectorAll('.reveal.pending').forEach(element => element.classList.remove('pending'));
    }
  });
}

// One passive scroll listener updates progress and the active navigation section.
const sectionLinks = [...document.querySelectorAll('.nav nav a[href^="#"]')];
const trackedSections = sectionLinks.map(link => ({link, section: document.querySelector(link.getAttribute('href'))})).filter(item => item.section);
let scrollFrame = 0;
function updateReadingPosition() {
  scrollFrame = 0;
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty('--read-progress', distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
  let active;
  trackedSections.forEach(item => {if (item.section.getBoundingClientRect().top <= 170) active = item;});
  trackedSections.forEach(item => {
    if (item === active) item.link.setAttribute('aria-current', 'location');
    else item.link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => {if (!scrollFrame) scrollFrame = requestAnimationFrame(updateReadingPosition);}, {passive:true});
window.addEventListener('resize', updateReadingPosition);
updateReadingPosition();
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (!finePointer.matches || motionPreference.matches) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  }, {passive:true});
});
