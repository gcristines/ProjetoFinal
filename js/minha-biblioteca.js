// Eventos
if (document.getElementById('buscar-btn')) {
  document.getElementById('buscar-btn').addEventListener('click', buscarLivro);
}

const barraBusca = document.getElementById('barra-busca');
if (barraBusca) {
  barraBusca.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      buscarLivro();
    }
  });
}

function mostrarResultadoBusca(resultados) {
  const conteiner = document.getElementById('resultado-busca');
  const resultado = document.getElementById('busca-resultado');
  conteiner.innerHTML = '';

  resultados.forEach((item, index) => {
    const volumeInfo = item.volumeInfo;
    const div = document.createElement('div');
    div.classList.add('book-item');
    div.innerHTML = `
      <strong>${volumeInfo.title || 'Sem título'}</strong><br>
      <em>${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Autor desconhecido'}</em><br>
      <button onclick="adicionarLivro(${index})">Adicionar à Estante</button>
    `;
    conteiner.appendChild(div);
  });

  // Salva os itens para uso posterior
  ultimaBuscaItens = resultados;

  // Se for a tela "Minha Biblioteca", exibe a div de resultados e faz scroll
  if (resultado) {
    resultado.style.display = 'block';

    if (!resultado.classList.contains('shown')) {
      resultado.scrollIntoView({ behavior: 'smooth' });
      resultado.classList.add('shown');
    }
  }
}

// Pesquisa livro na API Google Books
function buscarLivro() {
  const query = document.getElementById('barra-busca').value.trim();
  if (!query) {
    alert("Digite um título para buscar.");
    return;
  }

  // Decide onde exibir os resultados
  const isDashboard = document.getElementById('pesquisa-modal') !== null;
  const resultadoBusca = isDashboard
    ? document.getElementById('resultado-busca') // modal
    : document.getElementById('resultado-busca') || document.getElementById('busca-resultado'); // tela principal

  if (resultadoBusca) {
    resultadoBusca.innerHTML = ''; // limpa antes
  }

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        ultimaBuscaItens = data.items;
        mostrarResultadoBusca(ultimaBuscaItens);
      } else {
        resultadoBusca.innerHTML = '<p>Nenhum resultado encontrado.</p>';
      }

      // Exibe resultados dependendo da tela
      if (isDashboard) {
        mostrarModal();
      } else {
        const resultado = document.getElementById('busca-resultado');
        resultado.style.display = "block";
        resultado.scrollIntoView({ behavior: 'smooth' });
        resultado.classList.add('shown');
      }
    })
    .catch(err => {
      console.error('Erro ao buscar:', err);
      resultadoBusca.innerHTML = '<p>Erro na busca.</p>';
    });
}

function adicionarLivro(index) {
  const volumeInfo = ultimaBuscaItens[index].volumeInfo;

  const generoMap = {
    'Fiction': 'Ficção',
    'Science': 'Ciência',
    'Biography': 'Biografia',
    'History': 'História',
    'Fantasy': 'Fantasia',
    'Technology': 'Tecnologia',
    'Health': 'Saúde',
    'Business': 'Negócios',
    'Education': 'Educação',
    'Religion': 'Religião',
    'Philosophy': 'Filosofia',
    'Comics & Graphic Novels': 'Quadrinhos',
  };

  const generos = (volumeInfo.categories || []).map(g => generoMap[g] || g);

  const idiomaMap = {
    'pt': 'Português',
    'en': 'Inglês',
    'es': 'Espanhol',
    'fr': 'Francês',
    'de': 'Alemão',
    'it': 'Italiano'
  };

  const livro = {
    title: volumeInfo.title || 'Sem título',
    publishedDate: volumeInfo.publishedDate || '',
    authors: volumeInfo.authors || ['Autor desconhecido'],
    genre: generos.length > 0 ? generos.join(', ') : 'Gênero desconhecido',
    publisher: volumeInfo.publisher || 'Editora desconhecida',
    isbn: (volumeInfo.industryIdentifiers || []).find(id => id.type === "ISBN_13")?.identifier || '',
    language: idiomaMap[volumeInfo.language?.split('-')[0]] || volumeInfo.language || 'Idioma não informado',
    pageCount: volumeInfo.pageCount || '',
    rating: volumeInfo.averageRating || '',
    dateAdded: new Date().toISOString().split('T')[0],
    description: volumeInfo.description || ''
  };

  localStorage.setItem('livroParaAdicionar', JSON.stringify(livro));
  localStorage.setItem('origemLivro', window.location.pathname);
  window.location.href = 'adicionar-livro.html';
}