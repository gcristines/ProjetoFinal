document.addEventListener('DOMContentLoaded', atualizarDashboard);

function atualizarDashboard() {
  const lido = document.getElementById('contador-lido');
  const lendo = document.getElementById('contador-lendo');
  const queroLer = document.getElementById('contador-quero-ler');
 
  // Se não estiver na tela Dashboard sai da função
  if (!lido || !lendo || !queroLer) {
    return;
  }
 
  const livros = JSON.parse(localStorage.getItem('livros')) || [];
  const normalizarStatus = (status) => (status || '').trim().toLowerCase();
 
  const contadorLido = livros.filter(livro => normalizarStatus(livro.status) === 'lido').length;
  const contadorLendo = livros.filter(livro => normalizarStatus(livro.status) === 'lendo').length;
  const contadorQueroLer = livros.filter(livro => normalizarStatus(livro.status) === 'quero ler').length;
 
  lido.textContent = contadorLido;
  lendo.textContent = contadorLendo;
  queroLer.textContent = contadorQueroLer;
}