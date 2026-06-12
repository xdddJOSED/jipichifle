/* ===================================================
   JIPI CHIFLES — Landing Page JavaScript
   Redesigned: Oreo-style interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL ───────────────────────────────────
  const navbar = document.getElementById('navbar');
  const handleScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── HAMBURGER ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ─── SMOOTH SCROLL BUTTONS ───────────────────────────
  document.getElementById('btnComprar').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('btnFactory').addEventListener('click', () => {
    document.getElementById('factory').scrollIntoView({ behavior: 'smooth' });
  });

  // ─── SCROLL REVEAL ───────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ─── STAGGER ANIMATIONS ──────────────────────────────
  document.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });
  document.querySelectorAll('.factory-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.highlight-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });

  // ─── PRODUCT CAROUSEL SCROLL ─────────────────────────
  const scrollContainer = document.getElementById('productsScroll');
  const scrollLeftBtn   = document.getElementById('scrollLeft');
  const scrollRightBtn  = document.getElementById('scrollRight');
  const scrollAmount = 280;

  scrollLeftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  scrollRightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Touch swipe support for product carousel
  let touchStartX = 0;
  scrollContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  scrollContainer.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      scrollContainer.scrollBy({ left: diff > 0 ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  }, { passive: true });

  // ─── PRODUCT CARD TILT EFFECT ─────────────────────────
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── NAVBAR ACTIVE LINK ──────────────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          const isActive = a.getAttribute('href') === `#${id}`;
          a.style.color = isActive ? 'var(--red)' : '';
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(sec => activeLinkObserver.observe(sec));

  // ─── PARALLAX BLOBS ──────────────────────────────────
  const blobs = document.querySelectorAll('.hero-blob');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 10;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });

  // ─── CHATBOT ─────────────────────────────────────────
  const chatToggle = document.getElementById('chatbotToggle');
  const chatWindow = document.getElementById('chatbotWindow');
  const chatClose  = document.getElementById('chatClose');
  const chatBody   = document.getElementById('chatBody');
  const chatInput  = document.getElementById('chatInput');
  const chatSend   = document.getElementById('chatSend');
  let chatOpened = false;

  const botResponses = {
    'precio':       '💰 Nuestros precios varían según la presentación. Bolsas personales desde $0.50 y presentación familiar hasta $3.50. ¡Contáctanos por WhatsApp para precios al por mayor!',
    'sabor':        '🍌 Tenemos: Platanitos de Verde (redondos y largos), Platanitos de Maduro, con Salprieta artesanal, Toque Picante, Chips de Yuca y Chips de Camote Dulce.',
    'producto':     '📦 Nuestro catálogo incluye más de 15 presentaciones: desde mini snacks de 23g para loncheras hasta bolsas familiares de 280g. ¡Pregúntame por cualquier producto!',
    'envio':        '🚚 Hacemos envíos a todo Ecuador. Llámanos al 0996643455 o escríbenos por WhatsApp para coordinar tu pedido.',
    'envío':        '🚚 Hacemos envíos a todo Ecuador. Llámanos al 0996643455 o escríbenos por WhatsApp para coordinar tu pedido.',
    'comprar':      '🛒 ¡Haz tu pedido por WhatsApp al +593 996643455 o llámanos al 0982265382! También nos encuentras en Instagram @jipichifles.',
    'pedir':        '🛒 ¡Haz tu pedido por WhatsApp al +593 996643455 o llámanos al 0982265382! También nos encuentras en Instagram @jipichifles.',
    'pedido':       '🛒 ¡Haz tu pedido por WhatsApp al +593 996643455 o llámanos al 0982265382! También nos encuentras en Instagram @jipichifles.',
    'fabrica':      '🏭 Nuestra fábrica está en Jipijapa, Manabí, Ecuador. Trabajamos con plátanos frescos de la zona y procesamos todo con altos estándares de calidad.',
    'yuca':         '🥔 ¡Nuestros Chips de Yuca son nuevos! Crocantes y deliciosos, bolsa de 75g. Pregunta por disponibilidad.',
    'camote':       '🍠 Los Chips de Camote Dulce son una delicia natural. Presentación de 75g. ¡Son nuevos en nuestro catálogo!',
    'salprieta':    '🌿 Los platanitos con Salprieta artesanal manabita son un sabor único de nuestra tierra. Bolsa de 100g.',
    'picante':      '🌶️ Los platanitos con Toque Picante tienen ají ecuatoriano. Bolsa de 100g, ¡para los que les gusta el sabor con actitud!',
    'lonchera':     '🎒 Tenemos mini snacks de 23g y bolsas de 50g, perfectos para las loncheras de los niños.',
    'familiar':     '👨‍👩‍👧‍👦 La presentación familiar de platanitos largos viene en bolsa de 280g. ¡Ideal para compartir!',
    'hola':         '👋 ¡Hola! Bienvenido a Jipi Chifles 🍌 ¿En qué te puedo ayudar? Pregúntame sobre nuestros productos, precios o cómo hacer un pedido.',
    'default':      '😊 ¡Gracias por escribirnos! Para una atención más rápida, contáctanos por WhatsApp al 0996643455 o al 0982265382. ¡Síguenos en @jipichifles!'
  };

  function addMessage(text, type = 'bot') {
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addQuickReplies() {
    const container = document.createElement('div');
    container.className = 'quick-replies';

    const replies = ['📦 Productos', '💰 Precios', '🚚 Envíos', '🛒 Pedir'];
    replies.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.quick-replies').forEach(qr => qr.remove());
        const keyword = text.replace(/[^\wáéíóúñ]/gi, '').toLowerCase();
        addMessage(text, 'user');
        showTypingThenRespond(keyword);
      });
      container.appendChild(btn);
    });

    chatBody.appendChild(container);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingThenRespond(keyword) {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const key = Object.keys(botResponses).find(k => keyword.includes(k)) || 'default';
      addMessage(botResponses[key], 'bot');
    }, 800 + Math.random() * 600);
  }

  function openChat() {
    chatWindow.classList.add('open');
    if (!chatOpened) {
      chatOpened = true;
      const dot = chatToggle.querySelector('.notif-dot');
      if (dot) dot.style.display = 'none';

      setTimeout(() => {
        addMessage('¡Hola! 👋 ¿Con ganas de un buen chifle? ¿En qué te ayudo hoy?');
      }, 400);
      setTimeout(() => {
        addQuickReplies();
      }, 900);
    }
    chatInput.focus();
  }

  function closeChat() {
    chatWindow.classList.remove('open');
  }

  chatToggle.addEventListener('click', () => {
    chatWindow.classList.contains('open') ? closeChat() : openChat();
  });
  chatClose.addEventListener('click', closeChat);

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    document.querySelectorAll('.quick-replies').forEach(qr => qr.remove());
    addMessage(text, 'user');
    chatInput.value = '';
    const keyword = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    showTypingThenRespond(keyword);
  }

  chatSend.addEventListener('click', handleUserMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUserMessage();
  });

});
