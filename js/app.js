/* En lista med de filmgenrer som används i menyn */
const genrer = ["drama", "comedy", "animation"];

/* Här sparas alla filmer som hämtas från API:et jag valde */
let allaFilmer = [];

/* Funktionen hämtar filmer från API:et jag valde.
Datan laddas från webbsidan och visar antingen alla genrer
eller bara den specifika genre som man väljer */
async function hamtaFilmer(genre) {
  const resultat = document.getElementById("resultat");
  resultat.innerHTML = "<p>Laddar filmer...</p>"; /* Tillfällig text medan filmer hämtas och kommer upp på sidan */
  let filmer = [];

  /* Om man väljer “Alla filmer” hämtas alla tre genrer (drama, komedi och animation) */
  if (genre === "all") {
    for (let g of genrer) {
      /* Hämtar filmer för varje genre i listan */
      const res = await fetch(`https://api.sampleapis.com/movies/${g}`);
      const data = await res.json();
      filmer = filmer.concat(data); /* Lägger ihop filmerna till en stor lista */
    }
  } else {
    /* Hämtar filmer bara från den valda genren */
    const res = await fetch(`https://api.sampleapis.com/movies/${genre}`);
    filmer = await res.json();
  }

  /* Sparar resultatet i allaFilmer (så det kan visas senare) */
  allaFilmer = filmer;

  /* Kör funktionen som visar filmerna på sidan */
  visaFilmer(genre);
}

/* Funktion för att visa filmer på webbsidan
   - Visar filmens titel och bild
   - Väljer rätt rubrik beroende på vald genre
   - Visar filmerna i rader med 4 kort per rad */
function visaFilmer(genre) {
  const resultat = document.getElementById("resultat");
  resultat.innerHTML = ""; /* Tömmer innehållet innan nya filmer visas */

  /* Bestämmer vilken rubrik som ska stå på sidan och får de till det rätta språket */
  let rubrik = "";
  if (genre === "all") rubrik = "Alla filmer";
  else if (genre === "drama") rubrik = "Drama";
  else if (genre === "comedy") rubrik = "Komedi";
  else if (genre === "animation") rubrik = "Animerat";

  /* Skapar rubriken och visar den på sidan */
  const titel = document.createElement("h2");
  titel.textContent = rubrik;
  resultat.appendChild(titel);

  /* Skapar rader med 4 filmer i varje rad så att det ser
  symmetriskt och användarvänligt ut */
  let rad;
  allaFilmer.forEach((film, index) => {
    /* Startar en ny rad var fjärde film, så att det är användarvänlig för besökaren.*/
    if (index % 4 === 0) {
      rad = document.createElement("div");
      rad.classList.add("rad"); /* Klass för raderna */
      resultat.appendChild(rad);
    }

    /* Skapar ett kort för varje film med bild och titel */
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = film.posterURL || "https://via.placeholder.com/200x300?text=Ingen+bild";

    const namn = document.createElement("h3");
    namn.textContent = film.title;

    /* Lägger till bild och titel i filmkortet */
    card.appendChild(img);
    card.appendChild(namn);

    /* Lägger till filmkortet i den aktuella raden */
    rad.appendChild(card);
  });
}

/* Lyssnar på alla knappar i menyn.
När man klickar på en knapp (t.ex. “Drama”)
hämtas filmer från den specifika genren */
document.querySelectorAll(".genre-meny button").forEach(knapp => {
  knapp.addEventListener("click", () => {
    hamtaFilmer(knapp.dataset.genre);
  });
});

/* När sidan laddas första gången, hämtar och visar alla filmer automatiskt */
hamtaFilmer("all");
