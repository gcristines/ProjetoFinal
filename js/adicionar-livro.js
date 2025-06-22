document.addEventListener('DOMContentLoaded', () => {
  const livroParaAdicionar = localStorage.getItem('livroParaAdicionar');

  if (!livroParaAdicionar) {
    alert('Nenhum livro foi selecionado para adicionar.');
    window.location.href = 'index.html';
    return;
  }

  const livro = JSON.parse(livroParaAdicionar);

  // Preenche os campos
  document.getElementById('editar-title').value = livro.title || '';
  document.getElementById('editar-year').value = (livro.publishedDate || '').slice(0, 4);
  document.getElementById('editar-authors').value = (livro.authors || []).join(', ');
  document.getElementById('editar-genre').value = livro.genre || '';
  document.getElementById('editar-publisher').value = livro.publisher || '';
  document.getElementById('editar-isbn').value = livro.isbn || '';
  document.getElementById('editar-language').value = livro.language || '';
  document.getElementById('editar-pages').value = livro.pageCount || '';
  document.getElementById('editar-rating').value = livro.rating || '';
  document.getElementById('editar-date').value = livro.dateAdded || new Date().toISOString().split('T')[0];
  document.getElementById('editar-synopsis').value = livro.description || '';

  document.getElementById('adicionar-formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validarFormularioLivro()) {
      return;
    }

    // Gera ID sequencial
    let ultimoId = parseInt(localStorage.getItem('ultimoIdLivro')) || 0;
    ultimoId += 1;
    localStorage.setItem('ultimoIdLivro', ultimoId);

    const novoLivro = {
      id: ultimoId,
      title: document.getElementById('editar-title').value,
      publishedDate: document.getElementById('editar-year').value,
      authors: document.getElementById('editar-authors').value.split(',').map(a => a.trim()),
      genre: document.getElementById('editar-genre').value,
      publisher: document.getElementById('editar-publisher').value,
      isbn: document.getElementById('editar-isbn').value,
      language: document.getElementById('editar-language').value,
      pageCount: document.getElementById('editar-pages').value,
      rating: document.getElementById('editar-rating').value,
      dateAdded: document.getElementById('editar-date').value,
      description: document.getElementById('editar-synopsis').value,
      status: 'quero ler'
    };

    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    livros.push(novoLivro);
    localStorage.setItem('livros', JSON.stringify(livros));
    localStorage.removeItem('livroParaAdicionar');

    alert('Livro adicionado com sucesso!');

    const origem = localStorage.getItem('origemLivro') || 'index.html';
    localStorage.removeItem('origemLivro');
    window.location.href = origem;
  });
});

function validarFormularioLivro() {
  const titulo = document.getElementById("editar-title").value.trim();
  const ano = document.getElementById("editar-year").value.trim();
  const autores = document.getElementById("editar-authors").value.trim();
  const paginas = document.getElementById("editar-pages").value.trim();

  if (!titulo) {
    alert("Por favor, preencha o nome do livro.");
    return false;
  }

  if (ano && (!/^\d{4}$/.test(ano) || isNaN(ano))) {
    alert("Ano de publicação inválido. Use apenas 4 dígitos numéricos.");
    return false;
  }

  if (!autores) {
    alert("Por favor, preencha o(s) autor(es).");
    return false;
  }

  if (paginas && (isNaN(paginas) || paginas <= 0)) {
    alert("Número de páginas deve ser um número positivo.");
    return false;
  }

  return true;
}