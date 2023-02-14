const input = document.querySelector('input')
const button = document.querySelector('button')
const personaContainer = document.querySelector('.persona-container')
const btnLike = document.querySelector('.btn-like')
const likesContainer = document.querySelector('.likes')

button.addEventListener('click', (e) => {
  e.preventDefault()
  traerPersonaje(input.value, '.persona-container')
})

function traerPersonaje(id, selector) {
  fetch(`https://api.sampleapis.com/futurama/characters/${id}`)
    .then((res) => res.json())
    .then((data) => {
      registrarLike(data, '.likes')
      crearPersonaje(data, selector)
    })
}

function registrarLike(character, selector) {
  btnLike.addEventListener('click', (e) => {
    e.preventDefault()
    let stringCharacter = JSON.stringify(character)
    localStorage.setItem('character', stringCharacter)
    crearPersonaje(character, selector)
  })
}


function crearPersonaje(personaje, selector) {
  document.querySelector(selector).innerHTML = ''

  const card = document.createElement('div')
  card.classList.add('personaje-block')

  const imagesContainer = document.createElement('div')
  imagesContainer.classList.add('img-container')

  const images = document.createElement('img')
  images.src = personaje.images.main

  imagesContainer.appendChild(images)

  const number = document.createElement('p')
  number.textContent = `Nº ${personaje.id}`

  const name = document.createElement('p')
  name.classList.add('name')
  name.textContent = `${personaje.name.first} ${personaje.name.last}`

  const age = document.createElement('p')
  age.classList.add('age')
  age.textContent = `${personaje.age} years old.`

  const species = document.createElement('p')
  species.classList.add('species')
  species.textContent = personaje.species

  const occupation = document.createElement('p')
  occupation.classList.add('occupation')
  occupation.textContent = personaje.occupation

  const sayings = document.createElement('p')
  sayings.classList.add('sayings')
  sayings.textContent = personaje.sayings[1]

  if (selector === '.likes') {
    card.appendChild(imagesContainer)
    
    likesContainer.appendChild(card)
  } else {
    card.appendChild(imagesContainer)
    card.appendChild(sayings)
    card.appendChild(number)
    card.appendChild(name)
    card.appendChild(age)
    card.appendChild(species)
    card.appendChild(occupation)

    personaContainer.appendChild(card)
  }
}

//MENU DE NAVEGACIÓN

const hamburguer = document.querySelector('.menu')
const menu = document.querySelector('.menu-navegacion')

console.log(menu)
console.log(hamburguer)

hamburguer.addEventListener('click', () => {
  menu.classList.toggle('spread')
})

window.addEventListener('click', (e) => {
  if (
    menu.classList.contains('spread') &&
    e.target != menu &&
    e.target != hamburguer
  ) {
    menu.classList.toggle('spread')
  }
})
