// === Filmguiden – Slutprojekt av Sanna Bergmark Wiberg ===
// Hämtar filmer från SampleAPIs och visar dem på sidan

// Lista över genrer
const genrer = ["drama", "comedy", "animation"];

// Funktion som hämtar filmer beroende på vald genre
async function hamtaFilmer(genre) {
  const resultat = document.getElementById("resultat");
  let filmer = [];

  // Om man valt "Alla filmer" hämtas alla genrer
  if (genre === "all") {
    for (let g of genrer) {
      const res = await fetch(`https://api.sampleapis.com/movies/${g}`);
      const data = await res.json();
      filmer = filmer.concat(data); // Lägger ihop alla filmer
    }
  } else {
    // Hämtar bara filmer från en genre
    const res = await fetch(`https://api.sampleapis.com/movies/${genre}`);
    filmer = await res.json();
  }
  // Visar bara de 12 första filmerna
  const visa = filmer.slice(0, 12);

  // Bestämmer rubriken beroende på genre
  let rubrik = "Alla filmer";
  if (genre === "drama") rubrik = "Drama";
  if (genre === "comedy") rubrik = "Komedi";
  if (genre === "animation") rubrik = "Animerat";

  // Skriver ut filmerna på sidan
  resultat.innerHTML = `
    <h2>${rubrik}</h2>
    <div class="genre-row">
      ${visa.map(film => `
        <div class="card">
          <img src="${film.posterURL || "https://via.placeholder.com/200x300?text=Ingen+bild"}">
          <h3>${film.title}</h3>
        </div>
      `).join("")}
    </div>
  `;
}

// Gör så att knapparna fungerar
document.querySelectorAll(".genre-meny button").forEach(knapp => {
  knapp.addEventListener("click", () => {
    hamtaFilmer(knapp.dataset.genre);
  });
});

// Visar alla filmer direkt när sidan öppnas
hamtaFilmer("all");
