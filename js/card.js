let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function toggleFavorito(id, boton) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    boton.textContent = "☆ Guardar";
  } else {
    favoritos.push(id);
    boton.textContent = "★ Favorita";
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function filtrar(tipo) {
  document.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    const esFav = favoritos.includes(id);
    card.style.display = (tipo === "fav" && !esFav) ? "none" : "block";
  });
}

document.querySelectorAll(".filtrar-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filtrar-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filtrar(btn.dataset.filter);
  });
});

document.querySelectorAll(".card").forEach(card => {
  const id = card.dataset.id;
  const boton = card.querySelector("button");
  if (favoritos.includes(id)) {
    boton.textContent = "★ Favorita";
  }
});