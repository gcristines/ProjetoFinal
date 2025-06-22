function mostrarModal() {
  const modal = document.getElementById("pesquisa-modal");
  modal.style.display = "block";
}

function fecharModal() {
  const modal = document.getElementById("pesquisa-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("pesquisa-modal");
    if (modal && event.target === modal) {
      fecharModal();
    }
  });
});