// ============ NAV: scroll shadow + mobile toggle ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============ CURSOR-FOLLOW GRADIENT BLOB ============
const blob = document.getElementById('cursorBlob');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let blobX = mouseX;
let blobY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateBlob(){
  blobX += (mouseX - blobX) * 0.08;
  blobY += (mouseY - blobY) * 0.08;
  blob.style.transform = `translate(${blobX}px, ${blobY}px)`;
  requestAnimationFrame(animateBlob);
}
if (blob) animateBlob();

// ============ HERO TYPING EFFECT ============
const roles = [
  'Electronics Engineer',
  'Embedded Systems Builder',
  'IoT Developer',
  'ECE Student'
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = false;

function typeLoop(){
  const current = roles[roleIndex];

  if (!deleting){
    charIndex++;
    if (charIndex > current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
    }
  }

  typedEl.textContent = current.slice(0, charIndex);
  setTimeout(typeLoop, deleting ? 40 : 70);
}
if (typedEl) setTimeout(typeLoop, 1200);

// ============ MARQUEE: duplicate content for seamless loop ============
const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack){
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============ PROJECT CARD TILT ============
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============ COPY EMAIL ============
const copyBtn = document.getElementById('copyEmail');
const copyTag = document.getElementById('copyTag');

if (copyBtn){
  copyBtn.addEventListener('click', async () => {
    const email = 'yazhiniyazhini849@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      copyTag.textContent = 'copied!';
    } catch (err) {
      copyTag.textContent = 'copy failed';
    }
    copyTag.classList.add('show');
    setTimeout(() => copyTag.classList.remove('show'), 1500);
  });
}

// ============ FOOTER YEAR ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
