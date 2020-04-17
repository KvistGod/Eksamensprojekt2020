const spiller1 = 'x' //Spiller 1 er Kryds
const spiller2 = 'o' //Spiller 2 er Bolle
const VinderKombinationer = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
] //Alle kombinationerne til at vinde

const felt = document.querySelectorAll('[data-felt]')
const spilleplade = document.getElementById('spilleplade')
const vinderBesked = document.getElementById('vinderBesked')
const vinderTekst = document.querySelector('[data-vinder-besked-tekst]')
const spilIgen = document.getElementById('spilIgen')
let oTur

//Kalder startSpil funktionen som starter spillet.
startSpil()

//Når man trykker på "Spil igen"-knappen kører den startSpil-funktionen.
spilIgen.addEventListener('click', startSpil)


function startSpil() {
  //Kryds starter.
  oTur = false
  felt.forEach(felt => {
    //Fjerner x og o fra felt class. (Til når den bliver kaldt i spilIgen)
    felt.classList.remove(spiller1)
    felt.classList.remove(spiller2)
    felt.removeEventListener('click', tegnPlaceret)
    //Ser om der bliver trykket, og placerer spillerens tegn. Og når der er valgt et felt, kan man ikke trykke på det igen.
    felt.addEventListener('click', tegnPlaceret, { once: true })
  })
  setSpillepladeHoverclass()
  //Fjerner overlayet når "Spil igen"-knappen bliver trykket på.
  vinderBesked.classList.remove('vis')
}

function tegnPlaceret(e) {
  const felt = e.target
  //Sætter spiller
  const spillerTur = oTur ? spiller2 : spiller1
  skrivTegn(felt, spillerTur)
  //Tjekker om man har vundet efter placering af seneste tegn, ellers om den blev uafgjort. Hvis ingen af delene skiftes der tur.
  if (tjekOmVundet(spillerTur)) {
    slutSpil(false)
  } else if (blevUafgjort()) {
    slutSpil(true)
  } else {
    skiftTur()
    setSpillepladeHoverclass()
  }
}

//Funktionen der tilføjer id'et "vis" til vinder-besked class, hvilket viser vinder eller uafgjort teksten.
function slutSpil(uafgjort) {
  if (uafgjort) {
    vinderTekst.innerText = 'Uafgjort!'
  } else {
    vinderTekst.innerText = `${oTur ? "Spiller 2 (O)" : "Spiller 1 (X)"} vandt!`
  }
  vinderBesked.classList.add('vis') //Class bliver tilføjet her og fjernet i startSpil.
}

//Kigger om alle felterne indeholder enten kryds eller bolle, og sætter draw, hvis de gør.
function blevUafgjort() {
  return [...felt].every(felt => {
    return felt.classList.contains(spiller1) || felt.classList.contains(spiller2)
  })
}

//Tilføjer spillerens tegn til feltet
function skrivTegn(felt, spillerTur) {
  felt.classList.add(spillerTur)
}

//Til at skifte mellem kryds og bolle, bliver kaldt i tegnPlaceret funktionen.
function skiftTur() {
  oTur = !oTur
}

//Viser hover effekten på tomme felter, til at vise hvis tur det er.
function setSpillepladeHoverclass() {
  spilleplade.classList.remove(spiller1)
  spilleplade.classList.remove(spiller2)
  if (oTur) {
    spilleplade.classList.add(spiller2)
  } else {
    spilleplade.classList.add(spiller1)
  }
}

//Tjekker om man har 1 af vinder kombinationerne
function tjekOmVundet(spillerTur) {
  return VinderKombinationer.some(kombination => {
    return kombination.every(index => {
      return felt[index].classList.contains(spillerTur)
    })
  })
}
