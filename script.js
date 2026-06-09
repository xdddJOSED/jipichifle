/* ===================================================
   JIPICHIFLE — Landing Page JavaScript
   Navbar, Scroll Reveal, Chatbot, Smooth Interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL EFFECT ────────────────────────────
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ─── HAMBURGER MENU ──────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ─── SMOOTH SCROLL FOR BUTTONS ───────────────────────
  document.getElementById('btnFactory').addEventListener('click', () => {
    document.getElementById('factory').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btnComprar').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });

  // ─── SCROLL REVEAL ANIMATION ─────────────────────────
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION (Stats) ───────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const text = el.textContent.trim();
    // Extract numeric value and decorators
    const prefix = text.match(/^[^0-9]*/)?.[0] || '';
    const suffix = text.match(/[^0-9]*$/)?.[0] || '';
    const numStr = text.replace(/[^0-9]/g, '');
    const target = parseInt(numStr, 10);

    if (isNaN(target)) return;

    let current = 0;
    const duration = 1800;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('.stat-number');
        stats.forEach(s => animateCounter(s));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ─── FEATURE CARDS STAGGER ────────────────────────────
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });

  // ─── FACTORY CARDS STAGGER ────────────────────────────
  const factoryCards = document.querySelectorAll('.factory-card');
  factoryCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // ─── FLAVOR CARDS TILT EFFECT ─────────────────────────
  document.querySelectorAll('.chip-flavor').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(500px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(500px) rotateX(0) rotateY(0)';
    });
  });

  // ─── CHATBOT ─────────────────────────────────────────
  const chatToggle = document.getElementById('chatbotToggle');
  const chatWindow = document.getElementById('chatbotWindow');
  const chatClose  = document.getElementById('chatClose');
  const chatBody   = document.getElementById('chatBody');
  const chatInput  = document.getElementById('chatInput');
  const chatSend   = document.getElementById('chatSend');
  let chatOpened = false;

  const botResponses = {
    'precio':    '💰 Nuestros chifles van desde $1.50 la bolsa individual hasta $8.00 el pack familiar. ¡Un precio crujiente!',
    'sabor':     '🌶️ Tenemos 4 sabores: Original, Picante con ají manabita, Ajo & Limón, y Dulce con panela de caña.',
    'envío':     '🚚 Hacemos envíos a todo Ecuador. Los pedidos en Manabí llegan en 24h y el resto del país en 48-72h.',
    'comprar':   '🛒 Puedes hacer tu pedido por WhatsApp al +593 99 XXX XXXX o a través de nuestra tienda en Instagram @jipichifle.',
    'fábrica':   '🏭 Nuestra fábrica está en Jipijapa, Manabí. ¡Puedes visitarnos! Agenda una visita por WhatsApp.',
    'ingredientes': '🌿 Solo usamos plátano verde fresco, aceite vegetal de primera calidad y sal marina. ¡Sin conservantes!',
    'hola':      '👋 ¡Hola! Qué gusto verte por aquí. ¿Te puedo ayudar con precios, sabores o envíos?',
    'default':   '😊 ¡Gracias por tu mensaje! Para una atención más rápida, contáctanos por WhatsApp al +593 99 XXX XXXX. ¿Hay algo más en que te pueda ayudar?'
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

    const replies = ['💰 Precios', '🌶️ Sabores', '🚚 Envíos', '🛒 Comprar'];
    replies.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        // Remove all quick replies
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
    }, 1000 + Math.random() * 500);
  }

  function openChat() {
    chatWindow.classList.add('open');
    if (!chatOpened) {
      chatOpened = true;
      // Hide notification dot
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
    if (chatWindow.classList.contains('open')) {
      closeChat();
    } else {
      openChat();
    }
  });

  chatClose.addEventListener('click', closeChat);

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Remove any existing quick replies
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

  // ─── PARALLAX FLOATING CHIPS ─────────────────────────
  const floatingChips = document.querySelectorAll('.floating-chip');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    floatingChips.forEach((chip, i) => {
      const speed = (i + 1) * 8;
      chip.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });

  // ─── NAVBAR ACTIVE LINK HIGHLIGHT ────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => activeLinkObserver.observe(sec));

});
