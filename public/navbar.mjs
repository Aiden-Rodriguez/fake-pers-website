const navLinks = [
  { href: 'index.html', text: 'Home' },
  { href: 'hobbies.html', text: 'Hobbies' },
];

function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="navbar-title">Aiden Rodriguez</div>
    <div class="navbar-right">
      <label class="dark-mode-toggle">
        <input type="checkbox" autocomplete="off">
        Dark mode
      </label>
      <button class="navbar-toggle">Menu</button>
    </div>
    <div class="navbar-links">
      ${navLinks.map(link => `<a href="${link.href}">${link.text}</a>`).join('')}
    </div>
  `;

  nav.querySelector('.navbar-toggle').addEventListener('click', toggleMenuVisibility);
  nav.querySelector('.dark-mode-toggle input').addEventListener('change', toggleDarkMode);

  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  nav.querySelector('.dark-mode-toggle input').checked = isDarkMode;
  return nav;
}

function toggleMenuVisibility() {
  document.querySelector('.navbar-links').classList.toggle('active');
}

function toggleDarkMode(e) {
  const isDarkMode = e.target.checked;
  document.body.classList.toggle('dark-mode', isDarkMode);
  // console.log(`Dark mode is ${isDarkMode ? 'enabled' : 'disabled'}`);
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('darkMode', isDarkMode);
}

function insertNavbar() {
  const newNavbar = createNavbar();
  const existingNav = document.querySelector('nav.navbar');
  if (existingNav) {
    existingNav.replaceWith(newNavbar);
  } else {
    document.body.prepend(newNavbar);
  }

  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

function setupBodyClickListener() {
  document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    const linksDiv = document.querySelector('.navbar-links');
    if (linksDiv.classList.contains('active') && !navbar.contains(e.target)) {
      linksDiv.classList.remove('active');
    }
  });
}

insertNavbar();
setupBodyClickListener();