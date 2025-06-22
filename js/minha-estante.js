document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('estante')) {
    renderizarEstante();
  }

  const apagarTudoBtn = document.getElementById('apagar-tudo-btn');
  const livros = JSON.parse(localStorage.getItem('livros')) || [];

  if (apagarTudoBtn) {
    apagarTudoBtn.disabled = livros.length === 0;
  }
});

// Renderiza tabela na estante
function renderizarEstante() {
  const estante = document.getElementById('estante');

  if (!estante) {
    return;
  }

  const livros = JSON.parse(localStorage.getItem('livros')) || [];
  estante.innerHTML = '';

  livros.forEach((livro, index) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td>${livro.title}</td>
      <td>${livro.authors.join(', ')}</td>
      <td>${livro.pageCount}</td>
      <td>
        <select onchange="atualizarStatus(${index}, this.value)">
          <option value="lido" ${livro.status === 'lido' ? 'selected' : ''}>Lido</option>
          <option value="lendo" ${livro.status === 'lendo' ? 'selected' : ''}>Lendo</option>
          <option value="quero ler" ${livro.status === 'quero ler' ? 'selected' : ''}>Quero ler</option>
        </select>
      </td>
      <td>
          <button onclick="editarLivro(${index})">Editar</button>
          <button onclick="excluirLivro(${index})">Excluir</button>
      </td>
    `;
    estante.appendChild(linha);
  });
}

function editarLivro(index) {
  const livros = JSON.parse(localStorage.getItem('livros')) || [];
  const livro = livros[index];
  localStorage.setItem('livroParaEditar', JSON.stringify({ ...livro, index }));
  window.location.href = 'editar-livro.html';
}

function excluirLivro(index) {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    if (confirm('Deseja excluir este livro?')) {
        livros.splice(index, 1);
        localStorage.setItem('livros', JSON.stringify(livros));
        renderizarEstante();

        // Atualiza estado do botão "Apagar Tudo"
        const apagarTudoBtn = document.getElementById('apagar-tudo-btn');
        if (apagarTudoBtn) {
            apagarTudoBtn.disabled = livros.length === 0;
        }
    }
}

function apagarTudo() {
  if (confirm('Tem certeza que deseja apagar todos os livros?')) {
    localStorage.removeItem('livros');
    localStorage.removeItem('ultimoIdLivro');
    alert('Todos os livros foram apagados.');
    location.reload(); // Recarrega a página
  }
}

function atualizarStatus(index, status) {
  const livros = JSON.parse(localStorage.getItem('livros')) || [];
  livros[index].status = status;
  localStorage.setItem('livros', JSON.stringify(livros));
  atualizarDashboard(); // Atualiza o dashboard após alterar status
}