document.addEventListener('DOMContentLoaded', () => {

  const livroParaEditar = JSON.parse(localStorage.getItem('livroParaEditar'));
  const livros = JSON.parse(localStorage.getItem('livros')) || [];

  if (!livroParaEditar || livroParaEditar.index === undefined) {
    alert('Livro não encontrado.');
    window.location.href = 'minha-estante.html';
    return;
  }

  // Preenche os campos
  document.getElementById('editar-id').value = livroParaEditar.id || '';
  document.getElementById('editar-title').value = livroParaEditar.title || '';
  document.getElementById('editar-year').value = livroParaEditar.publishedDate || '';
  document.getElementById('editar-authors').value = (livroParaEditar.authors || []).join(', ');
  document.getElementById('editar-genre').value = livroParaEditar.genre || '';
  document.getElementById('editar-publisher').value = livroParaEditar.publisher || '';
  document.getElementById('editar-isbn').value = livroParaEditar.isbn || '';
  document.getElementById('editar-language').value = livroParaEditar.language || '';
  document.getElementById('editar-pages').value = livroParaEditar.pageCount || '';
  document.getElementById('editar-rating').value = livroParaEditar.rating || '';
  document.getElementById('editar-date').value = livroParaEditar.dateAdded || '';
  document.getElementById('editar-synopsis').value = livroParaEditar.description || '';

  // Salvando ao enviar
  document.getElementById('editar-formulario').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validarFormularioLivro()) {
      return;
    }

    const atualizarLivro = {
      id: document.getElementById('editar-id').value.trim(),
      title: document.getElementById('editar-title').value.trim(),
      publishedDate: document.getElementById('editar-year').value.trim(),
      authors: document.getElementById('editar-authors').value.split(',').map(a => a.trim()),
      genre: document.getElementById('editar-genre').value.trim(),
      publisher: document.getElementById('editar-publisher').value.trim(),
      isbn: document.getElementById('editar-isbn').value.trim(),
      language: document.getElementById('editar-language').value.trim(),
      pageCount: document.getElementById('editar-pages').value.trim(),
      rating: document.getElementById('editar-rating').value.trim(),
      dateAdded: document.getElementById('editar-date').value,
      description: document.getElementById('editar-synopsis').value.trim()
    };

    livros[livroParaEditar.index] = atualizarLivro;
    localStorage.setItem('livros', JSON.stringify(livros));
    localStorage.removeItem('livroParaEditar'); // Limpa os dados temporários

    alert('Livro atualizado com sucesso!');
    window.location.href = 'minha-estante.html';
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