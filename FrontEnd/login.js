const loginForm = document.getElementById("loginform")

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let form = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  }
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      alert("Email ou mot de passe incorrect")
    } else {
      response.json().then((data) => {
        sessionStorage.setItem("token", data.token)
        window.location.replace("index.html")
      })
    }
  })
})

const loginForm = document.getElementById("loginform")

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let form = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  }
  console.log(
    JSON.stringify({
      email: form.email,
      password: form.password,
    })
  )
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      alert("Email ou mot de passe erronés")
    } else {
      response.json().then((data) => {
        sessionStorage.setItem("token", data.token)
        window.location.replace("index.html")
      })
    }
  })
})
