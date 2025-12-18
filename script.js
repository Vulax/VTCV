

// Mobile menu toggle
const menuBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('responsive');
});

// Load GitHub repos
//const githubUser = "Vulax";
//document.getElementById('github-user').textContent = githubUser;
//fetch(`https://api.github.com/users/${githubUser}/repos?per_page=8&sort=updated`)
//  .then(res => res.json())
//  .then(data => {
//    const container = document.getElementById('repos');
//    container.innerHTML = '';
//    data.forEach(repo => {
 //     const a = document.createElement('a');
 //     a.href = repo.html_url;
 //     a.target = "_blank";
 //     a.innerHTML = `<strong>${repo.name}</strong><p>${repo.description || ''}</p>`;
 //     container.appendChild(a);
  //  });
  //})
  //.catch(err => {
  //  document.getElementById('repos').textContent = 'Failed to load repos.';
  //});