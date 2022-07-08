import cards from '../assets/cards.js'
let currentMode = 'train'
let currentPage

////////////////////////
//Sidebar
////////////////////////
const burgerBtn = document.querySelector('.burger')
const sidebar = document.querySelector('.sidebar')
const sidebarMenu = document.querySelector('.sidebar-menu')
const sidebarBackground = document.querySelector('.sidebar-background')

//fill the sidebar
sidebarMenu.innerHTML = `<li>Main</li>`
for (let i = 0; i < cards[0].length; i++) {
  sidebarMenu.innerHTML += `<li class="sidebar-category">${cards[0][i]}</li>`
}
sidebarMenu.innerHTML += `<li>Statistics</li>`
const sidebarCategories = document.querySelectorAll('.sidebar-category')
const menuItems = sidebarMenu.querySelectorAll('li')

//activate main page in sidebar when the page loaded
menuItems[0].classList.add('menu-active')

//active menu item when clicked in sidebar
menuItems.forEach((e) => {
  e.addEventListener('click', (clicked) => {
    //clean other items
    menuItems.forEach((each) => {
      each.classList.remove('menu-active')
    })
    //activate clicked item
    clicked.currentTarget.classList.add('menu-active')
  })
})

//active menu item when the category is clicked in main page
function labelSidebarCategory() {
  const mainPageCategories = document.querySelectorAll('.category')
  mainPageCategories.forEach((card) => {
    card.addEventListener('click', (e) => {
      const clickedCategoryName = e.currentTarget.children[1].innerHTML
      //clean other items
      menuItems.forEach((e) => {
        e.classList.remove('menu-active')
        if (e.innerHTML == clickedCategoryName) {
          e.classList.add('menu-active')
        }
      })
    })
  })
}

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
const page = document.querySelector('.page')
const pageTitle = document.querySelector('.page-title')
const pageCenter = document.querySelector('.page-center')

//////////////////main page//////////////////

//when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
  fillMainPage()
  openCategoryPage()
  labelSidebarCategory()
})

//the Main page is clicked in the sidebar
sidebarMenu.children[0].addEventListener('click', () => {
  fillMainPage()
  closeSidebar()
  openCategoryPage()
  labelSidebarCategory()
  leaveStatistics()
})
//when the logo is clicked
const logo = document.querySelector('.logo')
logo.addEventListener('click', () => {
  //clean other items
  menuItems.forEach((each) => {
    each.classList.remove('menu-active')
  })

  //activate main page
  menuItems[0].classList.add('menu-active')
  fillMainPage()
  openCategoryPage()
  labelSidebarCategory()
  leaveStatistics()
})

function fillMainPage() {
  //change current page to main
  currentPage = 'main'
  //change title
  pageTitle.innerHTML = 'Categories:'
  //empty the secion
  pageCenter.innerHTML = ''
  //move to the main page in play mode
  nth = 0
  randomIndexes = undefined
  if (currentMode == 'play') startBtn.classList.add('hidden')
  if (currentMode == 'play' && document.querySelector('.rotate-btn') !== null) {
    document.querySelector('.rotate-btn').remove()
  }
  gameStatus.innerHTML = ''
  //fill
  for (let i = 0; i < cards[0].length; i++) {
    pageCenter.innerHTML += `
        <!-- single card -->
        <div class="category">
          <img src="./assets/${cards[i + 1][0].image}" alt="" />
          <h3>${cards[0][i]}</h3>
          <p><i class="fa-regular fa-images"></i> ${cards[i + 1].length}</p>
        </div>
        <!-- end of single card -->`
  }
}

//////////////////category page//////////////////

//when the category in the sidebar is clicked
Array.from(sidebarCategories).forEach((e) => {
  e.addEventListener('click', () => {
    fillCategoryPage(e.innerHTML)
    closeSidebar()
    leaveStatistics()
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
  //change page
  currentPage = categoryName
  //change title
  pageTitle.innerHTML = categoryName
  //empty the section
  pageCenter.innerHTML = ''
  //index
  const index = cards[0].indexOf(categoryName)
  //randomize cards
  const randomCards = arrayRandom(cards[index + 1].length)
  //move to another category page in play mode
  nth = 0
  randomIndexes = undefined
  if (currentMode == 'play') startBtn.classList.remove('hidden')
  if (currentMode == 'play' && document.querySelector('.rotate-btn') !== null) {
    document.querySelector('.rotate-btn').remove()
  }
  gameStatus.innerHTML = ''
  //fill
  for (let i = 0; i < cards[index + 1].length; i++) {
    if (currentMode == 'train') {
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
    } else if (currentMode == 'play') {
      pageCenter.innerHTML += `
        <!-- play card -->
        <div class="play-card">
              <img src="./assets/${
                cards[index + 1][randomCards[i]].image
              }" alt="">  
              <h3>${cards[index + 1][randomCards[i]].word}</h3>   
        </div>
        <!-- end of play card -->
    `
    }
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
      const word = clickedFront.currentTarget.querySelector('.word').innerHTML
      const sound = new Audio(`./assets/audio/${word}.mp3`)
      let timesClicked
      if (localStorage.getItem(`${word}-clicked`) === null) {
        timesClicked = 0
      } else {
        timesClicked = Number(localStorage.getItem(`${word}-clicked`))
      }

      //play sound
      if (!clickedFront.target.classList.contains('translate-btn')) {
        sound.play()
      }

      //update item clicks in localStorage
      localStorage.setItem(`${word}-clicked`, `${timesClicked + 1}`)
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

////////////////////////
//Switch button
////////////////////////

//button
const switchContainer = document.querySelector('.switch-container')
const play = switchContainer.children[0]
const switchBtn = document.querySelector('.switch-btn')
const train = switchContainer.children[2]
const startBtn = document.querySelector('.start-btn')
const gameStatus = document.querySelector('.game-status')

//click the switch button
switchBtn.addEventListener('click', () => {
  if (currentMode == 'train') {
    switchStyleToPlay()
    currentMode = 'play'
    if (currentPage !== 'main') fillCategoryPage(currentPage)
  } else if (currentMode == 'play') {
    switchStyleToTrain()
    currentMode = 'train'
    if (currentPage !== 'main') fillCategoryPage(currentPage)
  }
})

//change style to play
function switchStyleToPlay() {
  switchBtn.classList.add('switch-btn-moves-right')
  play.classList.remove('hidden')
  train.classList.add('hidden')
  switchContainer.style.backgroundColor = '#5BC236'
  if (currentPage !== 'main') startBtn.classList.remove('hidden')
}

//change style to train
function switchStyleToTrain() {
  switchBtn.classList.remove('switch-btn-moves-right')
  play.classList.add('hidden')
  train.classList.remove('hidden')
  switchContainer.style.backgroundColor = '#ffc000'
  startBtn.classList.add('hidden')
  if (document.querySelector('.rotate-btn') !== null) {
    document.querySelector('.rotate-btn').remove()
  }
  gameStatus.innerHTML = ''
}

/////////////////////////////////////
//After the "start" button is clicked
/////////////////////////////////////
let nth = 0
let randomIndexes

startBtn.addEventListener('click', () => {
  //all cards in the category
  const currentCategory = cards[cards[0].indexOf(currentPage) + 1]

  //randomize card order
  if (typeof randomIndexes == 'undefined') {
    randomIndexes = arrayRandom(cards[cards[0].indexOf(currentPage) + 1].length)
  }

  //play sound
  let currentCard = currentCategory[randomIndexes[nth]]

  let sound = new Audio(`./assets/${currentCard.audioSrc}`)
  sound.play()

  //change "start" button to "repeat" icon
  startBtn.classList.add('hidden')

  //create
  const rotateBtn = document.createElement('button')
  rotateBtn.classList.add('rotate-btn')
  rotateBtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i>`
  page.append(rotateBtn)

  //assign
  rotateBtn.addEventListener('click', () => {
    sound.play()
  })
  rotateBtn.addEventListener('mousedown', () => {
    rotateBtn.classList.add('rotate-icon')
  })
  rotateBtn.addEventListener('mouseup', () => {
    rotateBtn.classList.remove('rotate-icon')
  })

  //click play card
  const playCards = document.querySelectorAll('.play-card')
  playCards.forEach((playCard) => {
    playCard.addEventListener('click', (e) => {
      const clickedCard = e.currentTarget
      const clickedWord = clickedCard.children[1].innerHTML

      //count guess
      let timesGuessed
      if (localStorage.getItem(`${currentCard.word}-guessed`) === null) {
        timesGuessed = 0
      } else {
        timesGuessed = Number(
          localStorage.getItem(`${currentCard.word}-guessed`)
        )
      }
      localStorage.setItem(`${currentCard.word}-guessed`, `${timesGuessed + 1}`)

      //check correct/wrong
      if (!clickedCard.classList.contains('play-card-inactive')) {
        if (clickedWord == currentCard.word) {
          //count guessed correctly
          let timesGuessedCorrectly
          if (
            localStorage.getItem(`${currentCard.word}-guessed-correctly`) ===
            null
          ) {
            timesGuessedCorrectly = 0
          } else {
            timesGuessedCorrectly = Number(
              localStorage.getItem(`${currentCard.word}-guessed-correctly`)
            )
          }
          localStorage.setItem(
            `${currentCard.word}-guessed-correctly`,
            `${timesGuessedCorrectly + 1}`
          )

          //make the card inactive
          clickedCard.classList.add('play-card-inactive')

          //add the "correct" icon
          addIcon('correct')

          //play the "correct" sound
          new Audio('./assets/audio/correct.mp3').play()

          //next card
          nth++

          //when the game is over
          if (nth == currentCategory.length) {
            //select
            const numOfMistakes = gameStatus.querySelectorAll('.wrong').length
            const successSound = new Audio('./assets/audio/success.mp3')
            const failureSound = new Audio('./assets/audio/failure.mp3')
            const gameOverWindow = document.querySelector('.game-over-window')
            const successWindow = document.querySelector('.success-window')
            const failureWindow = document.querySelector('.failure-window')
            const mistakes = document.querySelector('.mistakes')

            if (numOfMistakes == 0) {
              //show "success" window
              gameOverWindow.classList.remove('hidden')
              successWindow.classList.remove('hidden')

              //play "success" sound
              successSound.play()

              //disable scrolling
              disableScrolling()

              //wait for 3 secs
              setTimeout(() => {
                //open main page
                enableScrolling()
                fillMainPage()
                openCategoryPage()
                labelSidebarCategory()
                switchStyleToTrain()
                currentMode = 'train'

                //hide window
                gameOverWindow.classList.add('hidden')
                successWindow.classList.add('hidden')
              }, 3000)
            } else {
              //show "failure" window
              gameOverWindow.classList.remove('hidden')
              failureWindow.classList.remove('hidden')

              //insert the number of mistakes
              mistakes.innerHTML = numOfMistakes

              //play "failure" sound
              failureSound.play()

              //disable scrolling
              disableScrolling()

              //wait for 3 secs
              setTimeout(() => {
                //open main page
                enableScrolling()
                fillMainPage()
                openCategoryPage()
                labelSidebarCategory()
                switchStyleToTrain()
                currentMode = 'train'

                //hide window
                gameOverWindow.classList.add('hidden')
                failureWindow.classList.add('hidden')
              }, 3000)
            }
          }

          //play the next sound after 2.5 seconds
          if (nth < currentCategory.length) {
            currentCard = currentCategory[randomIndexes[nth]]
            sound = new Audio(`./assets/${currentCard.audioSrc}`)
            setTimeout(() => {
              if (currentMode == 'play') sound.play()
            }, 2500)
          }
        } else {
          //"error" sound
          new Audio('./assets/audio/error.mp3').play()
          //add the "wrong" icon
          addIcon('wrong')
          //count guessed wrong
          let timesGuessedWrong
          if (
            localStorage.getItem(`${currentCard.word}-guessed-wrong`) === null
          ) {
            timesGuessedWrong = 0
          } else {
            timesGuessedWrong = Number(
              localStorage.getItem(`${currentCard.word}-guessed-wrong`)
            )
          }
          localStorage.setItem(
            `${currentCard.word}-guessed-wrong`,
            `${timesGuessedWrong + 1}`
          )
        }
      }
    })
  })
})

//add/show a new icon according to the answer status
function addIcon(status) {
  const newIcon = document.createElement('i')
  newIcon.classList.add('fa-solid', 'fa-star', status)
  gameStatus.prepend(newIcon)
}

/////////////////////////////////////
//Statistics page
/////////////////////////////////////
const statisticsSidebar = Array.from(menuItems)[menuItems.length - 1]
const statistics = document.querySelector('.statistics')
const tableHead = document.querySelector('.table-heads')
const tableHeads = tableHead.children
const removeFilter = document.querySelector('.remove-filter')
const tableBody = document.querySelector('.table-body')
const resetBtn = document.querySelector('.reset-btn')

function leaveStatistics() {
  if (!statistics.classList.contains('hidden')) {
    page.classList.remove('hidden')
    statistics.classList.add('hidden')
    switchContainer.classList.remove('switch-container-hidden')
  }
}

statisticsSidebar.addEventListener('click', () => {
  //open "statistics" page
  page.classList.add('hidden')
  statistics.classList.remove('hidden')
  switchContainer.classList.add('switch-container-hidden')
  closeSidebar()
  fillTableBody()
})

resetBtn.addEventListener('click', () => {
  localStorage.clear()
  fillTableBody()
})

removeFilter.addEventListener('click', () => {
  clearIcons()
  fillTableBody()
})

function fillTableBody() {
  //clear all icons in the table head
  clearIcons()

  //disable "remove filter" button
  removeFilter.classList.add('filter-inactive')

  //empty the table body
  tableBody.innerHTML = ''

  //fill the table body
  let number = 1
  for (let i = 0; i < cards[0].length; i++) {
    for (let j = 0; j < cards[i + 1].length; j++) {
      const currentWord = cards[i + 1][j].word

      //"times" clicked in training mode
      let timesClicked
      if (localStorage.getItem(`${currentWord}-clicked`) === null) {
        timesClicked = 0
      } else {
        timesClicked = localStorage.getItem(`${currentWord}-clicked`)
      }

      //"times" guessed in game mode
      let timesGuessed
      if (localStorage.getItem(`${currentWord}-guessed`) === null) {
        timesGuessed = 0
      } else {
        timesGuessed = Number(localStorage.getItem(`${currentWord}-guessed`))
      }

      //"times" guessed correctly
      let timesGuessedCorrectly
      if (localStorage.getItem(`${currentWord}-guessed-correctly`) === null) {
        timesGuessedCorrectly = 0
      } else {
        timesGuessedCorrectly = Number(
          localStorage.getItem(`${currentWord}-guessed-correctly`)
        )
      }

      //"times" guessed correctly
      let timesGuessedWrong
      if (localStorage.getItem(`${currentWord}-guessed-wrong`) === null) {
        timesGuessedWrong = 0
      } else {
        timesGuessedWrong = Number(
          localStorage.getItem(`${currentWord}-guessed-wrong`)
        )
      }

      // % of correct answers
      let percOfCorrect = (timesGuessedCorrectly / timesGuessed) * 100
      if (timesGuessed == 0) percOfCorrect = 0

      tableBody.innerHTML += `
          <tr>
            <td>${number}</td> 
            <td>${cards[0][i]}</td> 
            <td>${currentWord}</td>
            <td>${cards[i + 1][j].translation}</td>
            <td>${timesClicked}</td>
            <td>${timesGuessed}</td>
            <td>${timesGuessedWrong}</td>
            <td>${percOfCorrect.toFixed(0)}</td>
          </tr>`

      number++
    }
  }
}

//sort the table columns
Array.from(tableHeads).forEach((th) => {
  th.addEventListener('click', (e) => {
    const clickedHead = e.currentTarget
    const headIndex = Array.from(clickedHead.parentElement.children).indexOf(
      clickedHead
    )

    //activate "remove filter" button
    removeFilter.classList.remove('filter-inactive')

    //clear all icons in the table head
    clearIcons()

    //change
    if (clickedHead.classList.contains('asc')) {
      clickedHead.classList.add('desc')
      clickedHead.classList.remove('asc')
      sortColumn(headIndex, 'desc')
      clearIcons()
      if (headIndex == 1 || headIndex == 2 || headIndex == 3) {
        clickedHead.innerHTML += `<i class="fa-solid fa-arrow-down-z-a"></i>`
      } else {
        clickedHead.innerHTML += `<i class="fa-solid fa-arrow-down-9-1"></i>`
      }
    } else if (clickedHead.classList.contains('desc')) {
      clickedHead.classList.add('asc')
      clickedHead.classList.remove('desc')
      sortColumn(headIndex, 'asc')
      clearIcons()
      if (headIndex == 1 || headIndex == 2 || headIndex == 3) {
        clickedHead.innerHTML += `<i class="fa-solid fa-arrow-down-a-z"></i>`
      } else {
        clickedHead.innerHTML += `<i class="fa-solid fa-arrow-down-1-9"></i>`
      }
    } else {
      clickedHead.classList.add('asc')
      sortColumn(headIndex, 'asc')
      if (headIndex == 1 || headIndex == 2 || headIndex == 3) {
        clickedHead.innerHTML += `<i class="fa-solid fa-arrow-down-a-z"></i>`
      } else {
        clickedHead.innerHTML += `<i class="fa-solid fa-arrow-down-1-9"></i>`
      }
    }
  })
})

function sortColumn(columnIndex, order) {
  const tableRows = tableBody.querySelectorAll('tr')

  //sort
  const sortedRows = [...tableRows].sort((a, b) => {
    if (
      !isNaN(a.children[columnIndex].innerHTML) &&
      !isNaN(b.children[columnIndex].innerHTML)
    ) {
      if (order === 'asc') {
        return (
          a.children[columnIndex].textContent -
          b.children[columnIndex].textContent
        )
      } else if (order === 'desc') {
        return (
          b.children[columnIndex].textContent -
          a.children[columnIndex].textContent
        )
      }
    } else if (
      isNaN(a.children[columnIndex].innerHTML) &&
      isNaN(b.children[columnIndex].innerHTML)
    ) {
      if (order == 'asc') {
        return a.children[columnIndex].textContent.localeCompare(
          b.children[columnIndex].textContent
        )
      } else if (order == 'desc') {
        if (
          a.children[columnIndex].textContent >
          b.children[columnIndex].textContent
        ) {
          return -1
        } else if (
          b.children[columnIndex].textContent >
          a.children[columnIndex].textContent
        ) {
          return 1
        } else {
          return 0
        }
      }
    }
  })

  //fill the tableBody
  tableBody.innerHTML = ''
  sortedRows.forEach((e) => {
    tableBody.innerHTML += e.outerHTML
  })
}

//clear all icons in table head
function clearIcons() {
  tableHead.querySelectorAll('i').forEach((icon) => {
    icon.remove()
  })
}
