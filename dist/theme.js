(() => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch {}
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101722' : '#ffffff';
    const button = document.querySelector('.theme-toggle');
    if (button) button.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  apply(saved === 'dark' || saved === 'light' ? saved : preference.matches ? 'dark' : 'light');
  preference.addEventListener('change', event => {
    if (saved !== 'dark' && saved !== 'light') apply(event.matches ? 'dark' : 'light');
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      saved = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(saved);
      try { localStorage.setItem('portfolio-theme', saved); } catch {}
    });
  });
})();
