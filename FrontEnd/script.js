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

    newProjet.innerHTML = `<img src="${projets[i].imageUrl}" alt="${projets[i].title}" />
            <figcaption>${projets[i].title}</figcaption>`
    gallery.appendChild(newProjet)
  }
}
afficherProjets()

//filtres

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

// afficher login ou logout

if (sessionStorage.getItem("token") !== null) {
  document.querySelector(".login").classList.add("hidden")
  document.querySelector(".logout").classList.remove("hidden")
} else {
  document.querySelector(".login").classList.remove("hidden")
  document.querySelector(".logout").classList.add("hidden")
}

//logout function

const logoutBtn = document.querySelector(".logout")

function logout() {
  sessionStorage.removeItem("token")
  window.location = "index.html"
}

logoutBtn.addEventListener("click", logout)

//modal

if (sessionStorage.getItem("token") !== null) {
  document.getElementById("modifier").classList.remove("hidden")
  document.querySelector(".filters").classList.add("hidden")
  document.querySelector(".header").classList.add("margin")
  document.querySelector(".titlecontainer").classList.add("paddingbottom")
  document.querySelector(".edition").style.display = "flex"
} else {
  document.querySelector(".edition").style.display = "none"
  document.querySelector(".header").classList.remove("margin")
  document.getElementById("modifier").classList.add("hidden")
  document.querySelector(".filters").classList.remove("hidden")
}

let modifierBtm = document.getElementById("modifier")
let editionBtn = document.getElementById("edition")
let closeModalBtn = document.querySelector(".closemodal")

function openModal() {
  const target = document.querySelector(".modal")

  target.style.display = "flex"
  target.removeAttribute("aria-hidden")
  target.setAttribute("aria-modal", "true")
  modal = target
  modal.addEventListener("click", closeModal)
  modal.querySelector(".carrousel").addEventListener("click", stopPropagation)
}
function closeModal() {
  if (modal == null) return
  const target = document.querySelector(".modal")
  target.style.display = "none"
  modal.setAttribute("aria-hidden", "true")
  modal.removeAttribute("aria-modal")
  modal.removeEventListener("click", closeModal)
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

modifierBtm.addEventListener("click", openModal)
editionBtn.addEventListener("click", openModal)
closeModalBtn.addEventListener("click", closeModal)

// fetch for modal

async function afficherProjetsEdition() {
  const galleryModal = document.querySelector(".gallerymodal")
  const reponse = await fetch("http://localhost:5678/api/works")
  const projets = await reponse.json()
  for (let i = 0; i < projets.length; i++) {
    let newProjet = document.createElement("figure")
    newProjet.className = "projetmodal "
    newProjet.className += projets[i].category.name
    newProjet.id = projets[i].id
    newProjet.innerHTML = `<img class="modalimg" src="${projets[i].imageUrl}" alt="${projets[i].title}" /> <img class="delete" id="${projets[i].id}" src="/FrontEnd/assets/icons/trashcan.png" alt="trashcan" />`
    galleryModal.appendChild(newProjet)
  }

  //delete buttons

  let deleteBtn = document.querySelectorAll(".delete")

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", event)
  })
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      supprimerProjet(btn.id)
    })
  })
}
afficherProjetsEdition()

// delete

function supprimerProjet(id) {
  if (sessionStorage.getItem("token") == null) return
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Projet supprimé")
        afficherProjets()
        afficherProjetsEdition()
      } else {
        alert("Erreur : " + response.status)
      }
    })
    .then(() => {
      afficherProjets()
      afficherProjetsEdition()
      document.querySelector(".modal").style.display = "none"
      document.removeEventListener("click", closeModal)
    })
    .catch((error) => console.error("Erreur:", error))
}

// ajouter projet

let ajouterBtn = document.querySelector(".ajouterbtn")
let first = document.querySelector(".first-slide")
let second = document.querySelector(".second-slide")
let returnBtn = document.querySelector(".return")

document
  .getElementById("closebtn")
  .addEventListener("click", () => closeModal())

ajouterBtn.addEventListener("click", () => translate(first, second, -100))
returnBtn.addEventListener("click", () => translate(second, first, 0))

function translate(firstslide, secondslide, vector) {
  firstslide.style.transform = `translateX(${vector}%)`
  secondslide.style.transform = `translateX(${vector}%)`
}

// previsioner l'image

let picture = document.querySelector(".inputfile")
picture.onchange = () => picturePreview()

function picturePreview() {
  const [file] = picture.files
  if (file) {
    document.querySelector(".previewimg").src = URL.createObjectURL(file)
    document.querySelector(".previewimg").style.display = "block"
    document.querySelector("#choisirphoto").style.display = "none"
    document.querySelector(".phototype").style.display = "none"
    document.querySelector(".inputfile").style.display = "none"
    document.querySelector(".ajouterphotobtn").style.display = "none"
    document.querySelector(".ajouter-photo").classList.add("no-padding")
  }
}

// submit and post

let submitFormBtn = document.querySelector(".validerbtn")
submitFormBtn.addEventListener("click", function (event) {
  event.preventDefault()
})
submitFormBtn.addEventListener("click", () => submitForm())

function submitForm() {
  let token = sessionStorage.getItem("token")
  let form = document.querySelector(".formcategorie")

  let title = document.getElementById("worktitle").value
  let workCategory = form.options[form.selectedIndex].innerText
  let workId = form.options[form.selectedIndex].id
  let workImg = document.querySelector(".inputfile").files[0]

  if (title == "") {
    alert("Veuillez ajouter un titre")
    return
  }
  if (workCategory == "") {
    alert("Veuillez selectionner une catégorie")
    return
  }
  if (workImg == undefined) {
    alert("Veuillez ajouter une image")
    return
  }

  let formData = new FormData()
  formData.append("title", title)
  formData.append("category", workId)
  formData.append("image", workImg)
  console.log(formData)
  console.log(workImg)
  console.log(title)
  console.log(workId)
  let testFormData = new FormData()
  console.log(testFormData)

  postFormData(formData)
}

// submit btn color

document.querySelector(".ajouter-photo-form").onchange = () =>
  changeSubmitBtnColor()

function changeSubmitBtnColor() {
  let submit = document.querySelector(".formcategorie")
  if (
    document.querySelector(".inputfile") !== undefined &&
    document.querySelector("worktitle") !== "" &&
    submit.options[submit.selectedIndex].id !== ""
  ) {
    document.querySelector(".validerbtn").style.backgroundColor = "#1D6154"
  }
}

// post data

function postFormData(formData) {
  let token = sessionStorage.getItem("token")

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Nouveau fichier envoyé avec succés : " + title)
        return response.json()
      } else {
        console.error("Erreur:", response.status)
      }
    })
    .then(() => {
      afficherProjets()
      afficherProjetsEdition()
      document.querySelector(".modal").style.display = "none"
      document.removeEventListener("click", closeModal)
    })
    .catch((error) => console.error("Erreur:", error))
}
