const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();

fetch('/blog-feed.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not load the blog feed.');
    }
    return response.json();
  })
  .then(data => {
    const journal = document.getElementById('substack-posts');
    const posts = data.posts || [];

    if (!journal) return;

    if (posts.length === 0) {
      journal.innerHTML = `
        <article class="post-card feature-post">
          <div class="post-body">
            <p class="post-meta">Journal</p>
            <h3>New writing will appear here soon.</h3>
            <p>Visit the journal to discover the latest articles.</p>
            <a href="/blog/" class="text-link">Visit the journal <span>↗</span></a>
          </div>
        </article>
      `;
      return;
    }

    journal.innerHTML = '';

    posts.slice(0, 3).forEach(post => {
      const article = document.createElement('article');
      article.className = 'post-card';

      const meta = document.createElement('p');
      meta.className = 'post-meta';
      meta.textContent = 'Journal';

      const heading = document.createElement('h3');
      heading.textContent = post.title;

      const description = document.createElement('p');
      description.textContent = (post.description || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 180);

      const link = document.createElement('a');
      link.href = post.link;
      link.className = 'text-link';
      link.textContent = 'Read article ↗';

      const body = document.createElement('div');
      body.className = 'post-body';
      body.append(meta, heading, description, link);
      article.appendChild(body);
      journal.appendChild(article);
    });
  })
  .catch(error => {
    console.error('Could not load website blog posts:', error);
  });
