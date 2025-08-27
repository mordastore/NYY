// Открытие сертификата с анимацией и конфетти
document.getElementById('openBtn').addEventListener('click', function () {
  const cert = document.getElementById('cert');
  const cover = document.getElementById('cover');
  cover.style.display = 'none';
  cert.classList.add('show');
  fireConfetti();
});

// Эмодзи-дождь
function createEmojiRain() {
  const container = document.querySelector('.emoji-container');
  const emojis = ['🐶', '🎁', '🐾'];
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = `${Math.random() * 100}%`;
  emoji.style.animationDuration = `${3 + Math.random() * 3}s`;
  emoji.style.fontSize = `${20 + Math.random() * 20}px`;
  container.appendChild(emoji);
  setTimeout(() => emoji.remove(), 6000);
}
setInterval(createEmojiRain, 300);

// Конфетти-взрыв из центра
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  const count = 120;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const colors = ['#ff69b4', '#ffd1e3', '#ffe3f3', '#ffffff', '#f871a0'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 3;
    pieces.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 60
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    pieces = pieces.filter(p => p.life > 0);
    if (pieces.length > 0) {
      requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  update();
}
function startSnow() {
  const canvas = document.getElementById('snow-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const snowflakes = [];

  function createSnowflakes() {
    if (Math.random() < 0.5) return;
    const x = Math.random() * width;
    const y = 0;
    const radius = Math.random() * 3 + 1;
    const speedY = Math.random() * 1 + 0.5;
    const speedX = Math.random() * 0.5 - 0.25;
    snowflakes.push({x, y, radius, speedY, speedX});
  }

  function updateSnowflakes() {
    ctx.clearRect(0, 0, width, height);
    snowflakes.forEach((flake, index) => {
      flake.y += flake.speedY;
      flake.x += flake.speedX;
      if (flake.y > height) snowflakes.splice(index, 1);
    });
    drawSnowflakes();
  }

  function drawSnowflakes() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    snowflakes.forEach(flake => {
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });
    ctx.fill();
  }

  function loop() {
    createSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  loop();
}

startSnow();
