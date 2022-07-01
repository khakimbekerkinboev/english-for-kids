import cards from './assets/cards.js'

////////////////////////
//Sidebar
////////////////////////
const burgerBtn = document.querySelector('.burger')
const openSidebarBtn = document.querySelector('.open-sidebar')
const closeSidebarBtn = document.querySelector('.close-sidebar')
const sidebar = document.querySelector('.sidebar')
const sidebarMenu = document.querySelector('.sidebar-menu')
const sidebarBackground = document.querySelector('.sidebar-background')

//fill the sidebar
sidebarMenu.innerHTML = `<li>Main page</li>`
for (let i = 0; i < cards[0].length; i++) {
  sidebarMenu.innerHTML += `<li class="sidebar-category">${cards[0][i]}</li>`
}
sidebarMenu.innerHTML += `<li>Statistics</li>`
const sidebarCategories = document.querySelectorAll('.sidebar-category')

//open and close sidebar
burgerBtn.addEventListener('click', () => {
  if (sidebar.classList.contains('sidebar-hidden')) {
    openSidebar()
  } else {
    closeSidebar()
  }
})

sidebarBackground.addEventListener('click', () => {
  closeSidebar()
})

//open function
function openSidebar() {
  burgerBtn.style.transform = 'rotate(90deg)'
  sidebar.classList.remove('sidebar-hidden')
  sidebarBackground.classList.remove('sidebar-background-hidden')
  disableScrolling()
}

function disableScrolling() {
  var x = window.scrollX
  var y = window.scrollY
  window.onscroll = function () {
    window.scrollTo(x, y)
  }
}

//close function
function closeSidebar() {
  burgerBtn.style.transform = 'rotate(0deg)'
  sidebar.classList.add('sidebar-hidden')
  sidebarBackground.classList.add('sidebar-background-hidden')
  enableScrolling()
}

function enableScrolling() {
  window.onscroll = function () {}
}

////////////////////////
//Pages
////////////////////////

const pageTitle = document.querySelector('.page-title')
const pageCenter = document.querySelector('.page-center')

//
//main page
//

//when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
  fillMainPage()
  openCategoryPage()
})

//the Main page is clicked in the sidebar
sidebarMenu.children[0].addEventListener('click', () => {
  fillMainPage()
  closeSidebar()
  openCategoryPage()
})
//when the logo is clicked
const title = document.querySelector('.title')
title.addEventListener('click', () => {
  fillMainPage()
  openCategoryPage()
})

function fillMainPage() {
  pageTitle.innerHTML = 'Categories:'
  pageCenter.innerHTML = ''
  for (let i = 0; i < cards[0].length; i++) {
    pageCenter.innerHTML += `
        <!-- single card -->
        <div class="category">
          <img src="./assets/${cards[i + 1][0].image}" alt="" />
          <h3>${cards[0][i]}</h3>
          <p>${cards[i + 1].length} cards</p>
        </div>
        <!-- end of single card -->`
  }
}

//
//category page
//

//when the category in the sidebar is clicked
Array.from(sidebarCategories).forEach((e) => {
  e.addEventListener('click', () => {
    fillCategoryPage(e.innerHTML)
    closeSidebar()
  })
})

//when the category card in the main page is clicked
function openCategoryPage() {
  const mainPageCategories = document.querySelectorAll('.category')
  mainPageCategories.forEach((card) => {
    card.addEventListener('click', (e) => {
      const clickedCategoryName = e.currentTarget.children[1].innerHTML
      fillCategoryPage(clickedCategoryName)
    })
  })
}

//randomize indexes of any array by length
function arrayRandom(length) {
  let arr = []
  while (arr.length < length) {
    const newNumber = Math.floor(Math.random() * length)
    if (!arr.includes(newNumber)) {
      arr.push(newNumber)
    }
  }
  return arr
}

function fillCategoryPage(categoryName) {
  //change title
  pageTitle.innerHTML = categoryName
  //empty the section
  pageCenter.innerHTML = ''
  //index
  const index = cards[0].indexOf(categoryName)
  //randomize cards
  const randomCards = arrayRandom(cards[index + 1].length)

  for (let i = 0; i < cards[index + 1].length; i++) {
    pageCenter.innerHTML += `
    <!-- single card -->
        <div class="single-card">
          <div class="single-card-inner">
            <div class="single-card-front">
              <img src="./assets/${
                cards[index + 1][randomCards[i]].image
              }" alt="">
              <h3 class = 'word'>${cards[index + 1][randomCards[i]].word}</h3>
              <i class="fa-solid fa-rotate translate-btn"></i>
            </div>
            <div class="hidden-card">
              <img src="./assets/${
                cards[index + 1][randomCards[i]].image
              }" alt="">
              <h3>${cards[index + 1][randomCards[i]].word}</h3>
            </div>
            <div class="single-card-back">
              <img src="./assets/${
                cards[index + 1][randomCards[i]].image
              }" alt="">
              <h3>${cards[index + 1][randomCards[i]].translation}</h3>
            </div>
          </div>
        </div>
        <!-- end of single card -->
    `
  }

  //play sound
  playSound()

  //flip card
  flipCard()
}

//play sound function
function playSound() {
  const cardFronts = document.querySelectorAll('.single-card-front')
  Array.from(cardFronts).forEach((cardFront) => {
    cardFront.addEventListener('click', (clickedFront) => {
      if (!clickedFront.target.classList.contains('translate-btn')) {
        const word = clickedFront.currentTarget.querySelector('.word').innerHTML
        const sound = new Audio(`./assets/audio/${word}.mp3`)
        sound.play()
      }
    })
  })
}

//flip the card
function flipCard() {
  const translateBtns = document.querySelectorAll('.translate-btn')
  Array.from(translateBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      const singleCardInner = btn.parentElement.parentElement
      //rotate button
      btn.style.transform = 'rotate(180deg)'

      //flip the card
      singleCardInner.style.transform = 'rotateY(180deg)'

      //flip the card back
      singleCardInner.addEventListener('mouseleave', () => {
        singleCardInner.style.transform = 'rotateY(0deg)'
        //rotate button back
        btn.style.transform = 'rotate(0deg)'
      })
    })
  })
}
