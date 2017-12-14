export default function () {
  const expandables = document.querySelectorAll('.js-content-box-expandable');
  const defaultLabel = 'Show more';

  if (expandables === []) { return; }

  Array.prototype.forEach.call(expandables, (el) => {
    const l = el.dataset.label || defaultLabel;

    const showLnk = document.createElement('p');
    showLnk.innerHTML = `
      <a class="u-btn u-btn--dark u-btn--arrowed u-btn--centred">
        ${l}
      </a>
    `;

    const parent = el.parentNode;
    parent.insertBefore(showLnk, el);

    el.classList.add('is-hidden');

    showLnk.addEventListener('click', (ev) => {
      ev.preventDefault();
      el.classList.remove('is-hidden');
      ev.target.remove();
    });
  });
}
