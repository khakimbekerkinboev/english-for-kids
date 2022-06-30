import cards from './assets/cards.js'

////////////////////////
//Sidebar
////////////////////////

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

//open
openSidebarBtn.addEventListener('click', () => {
  sidebar.classList.remove('sidebar-hidden')
  sidebarBackground.classList.remove('sidebar-background-hidden')
  disableScrolling()
})

function disableScrolling() {
  var x = window.scrollX
  var y = window.scrollY
  window.onscroll = function () {
    window.scrollTo(x, y)
  }
}

//close
function closeSidebar() {
  sidebar.classList.add('sidebar-hidden')
  sidebarBackground.classList.add('sidebar-background-hidden')
  enableScrolling()
}

closeSidebarBtn.addEventListener('click', () => {
  closeSidebar()
})

sidebarBackground.addEventListener('click', () => {
  closeSidebar()
})

function enableScrolling() {
  window.onscroll = function () {}
}
