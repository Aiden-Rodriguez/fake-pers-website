const navLinks = [
  { href: 'index.html', text: 'Home' },
  { href: 'hobbies.html', text: 'Hobbies' },
];

function createLinkElement({ href, text }) {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  return link;
}

function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'navbar-title';
  titleDiv.textContent = 'Aiden Rodriguez';

  const linksDiv = document.createElement('div');
  linksDiv.className = 'navbar-links';

  navLinks.forEach(linkData => {
      linksDiv.appendChild(createLinkElement(linkData));
  });

  const mobileButton = document.createElement('button');
  mobileButton.className = 'navbar-toggle';
  mobileButton.textContent = 'Menu';
  mobileButton.addEventListener('click', toggleMenuVisibility);

  nav.appendChild(titleDiv);
  nav.appendChild(mobileButton);
  nav.appendChild(linksDiv);

  return nav;
}

function toggleMenuVisibility() {
  const linksDiv = document.querySelector('.navbar-links');
  linksDiv.classList.toggle('active');
}

function insertNavbar() {
  const newNavbar = createNavbar();
  const existingNav = document.querySelector('nav.navbar');
  if (existingNav) {
      existingNav.replaceWith(newNavbar);
  } else {
      document.body.prepend(newNavbar);
  }
}

function setupBodyClickListener() {
  document.addEventListener('click', (e) => {
      const navbar = document.querySelector('.navbar');
      const linksDiv = document.querySelector('.navbar-links');

      if (linksDiv.classList.contains('active')) {
          // Close menu if click is outside navbar
          if (!navbar.contains(e.target)) {
              linksDiv.classList.remove('active');
          }
      }
  });
}

  insertNavbar();
  setupBodyClickListener();