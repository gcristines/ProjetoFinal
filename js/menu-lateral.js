function menuLateral() {
  const menuLateral = document.getElementById('menu-lateral');
  menuLateral.classList.toggle('active');
}

// Fecha o menu lateral se clicar fora dele
  document.addEventListener("click", function (event) {
    const menuLateral = document.getElementById("menu-lateral");
    const menuLateralBtn = document.getElementById("menu-lateral-btn");

    const clicarMmenuLateral = menuLateral.contains(event.target);
    const clicarMenuLateralBtn = menuLateralBtn.contains(event.target);

    if (!clicarMmenuLateral && !clicarMenuLateralBtn && menuLateral.classList.contains("active")) {
      menuLateral.classList.remove("active");
    }
  });