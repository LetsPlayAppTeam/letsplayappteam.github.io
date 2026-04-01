/* ─────────────────────────────────────
   i18n — hardcoded translations
───────────────────────────────────── */
const i18n = {
    es: {
        "hero.badge": "Próximamente",
        "hero.title_1": "Jugás con alguien.",
        "hero.title_2": "Hacé un amigo.",
        "hero.subtitle": "La red social que detecta cuando coincidís con personas compatibles en tus juegos favoritos. Hecha por y para la comunidad gamer de Latinoamérica.",
        "hero.cta_notify": "Avisame cuando salga",
        "hero.cta_discord": "Sumate al Discord",
        "features.label": "// qué es Let's Play",
        "features.title": "No buscás amigos. Los encontrás jugando.",
        "features.encounter.title": "Encuentros Digitales",
        "features.encounter.desc": "Detectamos cuando coincidís con alguien compatible en una partida. Sin buscar, sin filtros: la conexión surge del juego mismo.",
        "features.compat.title": "Compatibilidad real",
        "features.compat.desc": "Un sistema que analiza personalidad, intereses y hábitos para conectarte con personas con las que realmente vas a hacer click.",
        "features.latam.title": "Hecha para LATAM",
        "features.latam.desc": "Pensada desde el inicio para la comunidad gamer latinoamericana. En tu idioma, con tu cultura, cerca tuyo.",
        "features.safe.title": "Comunidad cuidada",
        "features.safe.desc": "Moderación activa y políticas claras para que cada interacción sea positiva. Un espacio seguro para ser vos.",
        "cta.title": "Sé de los primeros",
        "cta.desc": "Dejá tu correo y te avisamos cuando lancemos. O unite al Discord para pruebas cerradas y novedades.",
        "cta.placeholder": "tu@correo.com",
        "cta.submit": "Notificarme",
        "cta.or": "— o —",
        "cta.discord": "Unirme al Discord",
        "cta.success": "¡Listo! Te vamos a avisar.",
        "cta.error": "Ingresá un correo válido.",
        "footer.visitors": "visitantes"
    },
    pt: {
        "hero.badge": "Em breve",
        "hero.title_1": "Você joga com alguém.",
        "hero.title_2": "Faz um amigo.",
        "hero.subtitle": "A rede social que detecta quando você encontra pessoas compatíveis nos seus jogos favoritos. Feita por e para a comunidade gamer da América Latina.",
        "hero.cta_notify": "Me avise quando sair",
        "hero.cta_discord": "Entre no Discord",
        "features.label": "// o que é Let's Play",
        "features.title": "Você não procura amigos. Encontra jogando.",
        "features.encounter.title": "Encontros Digitais",
        "features.encounter.desc": "Detectamos quando você coincide com alguém compatível numa partida. Sem buscar, sem filtros: a conexão nasce do jogo.",
        "features.compat.title": "Compatibilidade real",
        "features.compat.desc": "Um sistema que analisa personalidade, interesses e hábitos para conectar você com pessoas com as quais vai realmente se dar bem.",
        "features.latam.title": "Feita para LATAM",
        "features.latam.desc": "Pensada desde o início para a comunidade gamer latino-americana. No seu idioma, com sua cultura, perto de você.",
        "features.safe.title": "Comunidade cuidada",
        "features.safe.desc": "Moderação ativa e políticas claras para que cada interação seja positiva. Um espaço seguro para ser você.",
        "cta.title": "Seja dos primeiros",
        "cta.desc": "Deixe seu e-mail e avisamos quando lançarmos. Ou entre no Discord para testes fechados e novidades.",
        "cta.placeholder": "seu@email.com",
        "cta.submit": "Me notificar",
        "cta.or": "— ou —",
        "cta.discord": "Entrar no Discord",
        "cta.success": "Pronto! Vamos te avisar.",
        "cta.error": "Insira um e-mail válido.",
        "footer.visitors": "visitantes"
    }
};

let currentLang = "es";

function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update text content
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (i18n[lang][key]) el.placeholder = i18n[lang][key];
    });

    // Update active button
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
}

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

/* ─────────────────────────────────────
   Email form (visual only)
───────────────────────────────────── */
document.getElementById("email-submit").addEventListener("click", () => {
    const input = document.getElementById("email-input");
    const msg = document.getElementById("form-msg");
    const email = input.value.trim();

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = i18n[currentLang]["cta.success"];
        msg.style.color = "var(--success)";
        input.value = "";
        // TODO: integrate with email service
    } else {
        msg.textContent = i18n[currentLang]["cta.error"];
        msg.style.color = "var(--error)";
    }

    setTimeout(() => { msg.textContent = ""; }, 4000);
});

document.getElementById("email-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("email-submit").click();
});

/* ─────────────────────────────────────
   Visitor counter (placeholder)
   On GH Pages, replace with a real
   service like CountAPI, GoatCounter,
   or a serverless function.
───────────────────────────────────── */
(function initVisitorCounter() {
    const el = document.getElementById("visitor-count");
    // Placeholder: simulate a count from localStorage
    // Replace this block with a real API call in production
    let count = parseInt(localStorage.getItem("lpa_visitors") || "0", 10);
    const sessionKey = "lpa_session_counted";
    if (!sessionStorage.getItem(sessionKey)) {
        count++;
        localStorage.setItem("lpa_visitors", count);
        sessionStorage.setItem(sessionKey, "1");
    }
    el.textContent = count.toLocaleString();
})();

/* ─────────────────────────────────────
   Scroll reveal
───────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ─────────────────────────────────────
   Background particles
───────────────────────────────────── */
(function initParticles() {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((w * h) / 18000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.05
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const alpha = (1 - dist / 120) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(79, 138, 151, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 138, 101, ${p.opacity})`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => { resize(); createParticles(); });
    resize();
    createParticles();
    draw();
})();
