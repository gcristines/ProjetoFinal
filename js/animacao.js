document.addEventListener("DOMContentLoaded", () => {
    const animacao = document.querySelector('.conteiner-animacao');

    function criarFaiscas() {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.left = Math.random() * 100 + 'vw';
      sparkle.style.top = '-10px';
      sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's'; // 2-4s
      animacao.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 4000);
    }

    setInterval(criarFaiscas, 300);
});