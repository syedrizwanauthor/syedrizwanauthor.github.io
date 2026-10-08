const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
const cart=document.querySelector('.cart'),backdrop=document.querySelector('.cart-backdrop'),itemsEl=document.querySelector('.cart-items'),countEl=document.querySelector('.cart-count'),subtotalEl=document.querySelector('.subtotal');let items=[];
function openCart(){cart.classList.add('open');backdrop.classList.add('open');cart.setAttribute('aria-hidden','false')}function closeCart(){cart.classList.remove('open');backdrop.classList.remove('open');cart.setAttribute('aria-hidden','true')}
document.querySelector('.floating-cart').addEventListener('click',openCart);document.querySelector('.cart-close').addEventListener('click',closeCart);backdrop.addEventListener('click',closeCart);
function renderCart(){countEl.textContent=items.length;const total=items.reduce((a,i)=>a+i.price,0);subtotalEl.textContent=`₹${total}`;if(!items.length){itemsEl.innerHTML='<p class="empty-cart">Your order is empty.</p>';return}itemsEl.innerHTML=items.map((i,n)=>`<div class="cart-line"><div><strong>${i.title}</strong><br><small>Signed paperback</small></div><div><strong>₹${i.price}</strong><br><button data-remove="${n}" style="border:0;background:none;padding:0;cursor:pointer;text-decoration:underline">remove</button></div></div>`).join('');itemsEl.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{items.splice(+b.dataset.remove,1);renderCart()})}
document.querySelectorAll('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{const p=btn.closest('.product-card');items.push({title:p.dataset.title,price:+p.dataset.price});renderCart();openCart()}));
document.querySelector('.checkout-btn').addEventListener('click',()=>alert('This prototype is ready for a live payment link or checkout integration. Add Razorpay, Shopify, WooCommerce, Gumroad, or another provider before launch.'));
async function loadSubstackJournal() {
  const journalGrid = document.querySelector('.journal-grid');

  if (!journalGrid) return;

  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fthealif.substack.com%2Ffeed'
    );

    const data = await response.json();

    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      console.log('No Substack posts found.');
      return;
    }

    journalGrid.innerHTML = '';

    data.items.slice(0, 3).forEach((post, index) => {
      const article = document.createElement('article');

      article.className = index === 0
        ? 'post-card feature-post reveal'
        : 'post-card reveal';

      const description = post.description
        ? post.description.replace(/<[^>]*>/g, '').trim().slice(0, 180)
        : '';

      article.innerHTML = `
        <div class="post-body">
          <p class="post-meta">The Alif · Substack</p>
          <h3>${post.title}</h3>
          <p>${description}${description.length >= 180 ? '...' : ''}</p>
          <a href="${post.link}" target="_blank" rel="noopener" class="text-link">
            Read essay <span>↗</span>
          </a>
        </div>
      `;

      journalGrid.appendChild(article);
    });

  } catch (error) {
    console.error('Unable to load Substack journal:', error);
  }
}

loadSubstackJournal();
