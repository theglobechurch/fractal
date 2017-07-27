export default function () {
  const navButton = document.querySelector('.js-navToggle');
  const bod = document.querySelector('body');

  if (!navButton) { return; }

  navButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    bod.classList.toggle('nav-open');
  });
}
