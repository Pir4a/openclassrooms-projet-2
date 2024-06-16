const gallery = document.getElementById("gallery")
const objectBtn = document.getElementById("objets")
const appartBtn = document.getElementById("appartements")
const tousBtn = document.getElementById("tous")
const hotelsBtn = document.getElementById("hotels")

async function afficherProjets() {
  const reponse = await fetch("http://localhost:5678/api/works")
  const projets = await reponse.json()
  for (let i = 0; i < projets.length; i++) {
    let newProjet = document.createElement("figure")
    newProjet.className = "projet "
    newProjet.className += projets[i].category.name

    newProjet.innerHTML = `<img src="${projets[i].imageUrl}" alt="Abajour Tahina" />
            <figcaption>${projets[i].title}</figcaption>`
    gallery.appendChild(newProjet)
  }
}
afficherProjets()

function filter(filtre) {
  let objets = document.querySelectorAll(".Objets")
  let appartements = document.querySelectorAll(".Appartements")
  let hotels = document.querySelectorAll(".Hotels")
  if (filtre == 1) {
    appartements.forEach((e) => {
      e.classList.add("hidden")
    })
    hotels.forEach((e) => {
      e.classList.add("hidden")
    })
    objets.forEach((e) => {
      e.classList.remove("hidden")
    })
  } else if (filtre == 2) {
    objets.forEach((e) => {
      e.classList.add("hidden")
    })
    hotels.forEach((e) => {
      e.classList.add("hidden")
    })
    appartements.forEach((e) => {
      e.classList.remove("hidden")
    })
  } else if (filtre == 3) {
    hotels.forEach((e) => {
      e.classList.remove("hidden")
    })
    objets.forEach((e) => {
      e.classList.add("hidden")
    })
    appartements.forEach((e) => {
      e.classList.add("hidden")
    })
  } else {
    objets.forEach((e) => {
      e.classList.remove("hidden")
    })
    hotels.forEach((e) => {
      e.classList.remove("hidden")
    })
    appartements.forEach((e) => {
      e.classList.remove("hidden")
    })
    return
  }
}
objectBtn.addEventListener("click", () => filter(1))
tousBtn.addEventListener("click", () => filter(0))
appartBtn.addEventListener("click", () => filter(2))
hotelsBtn.addEventListener("click", () => filter(3))
