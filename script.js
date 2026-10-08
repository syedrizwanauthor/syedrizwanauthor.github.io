const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();

fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const journal = document.getElementById('substack-posts');

    if (!journal || !posts.length) return;

    journal.innerHTML = '';

    posts.slice(0, 3).forEach((post, index) => {
      const article = document.createElement('article');
      article.className = 'post-card';

      const description = post.description
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();

      article.innerHTML = `
        ${index === 0 ? '<div class="post-art paper-art"><span>01</span></div>' : ''}
        <div class="post-body">
          <p class="post-meta">The Alif · Journal</p>
          <h3>${post.title}</h3>
          <p>${description.substring(0, 180)}${description.length > 180 ? '…' : ''}</p>
          <a href="${post.link}" class="text-link" target="_blank" rel="noopener">
            Read essay <span>↗</span>
          </a>
        </div>
      `;

      journal.appendChild(article);
    });
  })
  .catch(error => {
    console.error('Could not load Substack posts:', error);
  });
