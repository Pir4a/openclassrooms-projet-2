const gallery = document.getElementById("gallery")

async function afficherProjets() {
  const reponse = await fetch("http://localhost:5678/api/works")
  const projets = await reponse.json()
  for (let i = 0; i < projets.length; i++) {
    let newProjet = document.createElement("figure")
    newProjet.innerHTML = `<img src="${projets[i].imageUrl}" alt="Abajour Tahina" />
            <figcaption>${projets[i].title}</figcaption>`
    gallery.appendChild(newProjet)
  }

  console.log(projets.length)
}

afficherProjets()
