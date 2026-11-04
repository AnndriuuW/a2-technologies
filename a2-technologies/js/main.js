// Menú móvil
const menuBtn = document.querySelector('.menu');
const nav = document.getElementById('nav');

function setMenu(open) {
  nav.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
}

menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') setMenu(false);
});

// Resalta en el menú la sección visible
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) =>
        l.classList.toggle('on', l.getAttribute('href') === '#' + entry.target.id)
      );
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
links.forEach((l) => {
  const section = document.querySelector(l.getAttribute('href'));
  if (section) observer.observe(section);
});

// Formulario de contacto (temporal: abre el cliente de correo)
const CONTACT_EMAIL = 'contacto@a2technologies.com';
const form = document.getElementById('f');
const status = document.getElementById('ok');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const body =
    `Nombre: ${d.get('n')}\nCorreo: ${d.get('e')}\nTipo: ${d.get('t')}\n\n${d.get('m')}`;
  const subject = `Nuevo proyecto: ${d.get('t')}`;
  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Abriendo tu app de correo para enviar el mensaje…';
});
