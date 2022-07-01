const switchContainer = document.querySelector('.switch-container')
const play = switchContainer.children[0]
const switchBtn = document.querySelector('.switch-btn')
const train = switchContainer.children[2]

//click the switch button
switchBtn.addEventListener('click', () => {
  if (switchBtn.classList.contains('train')) {
    switchPlay()
  } else if (switchBtn.classList.contains('play')) {
    switchTrain()
  }
})

//button switch to play
function switchPlay() {
  switchBtn.classList.remove('train')
  switchBtn.classList.add('play')
  switchBtn.classList.add('switch-btn-active')
  play.classList.remove('mode-inactive')
  train.classList.add('mode-inactive')
  switchContainer.style.backgroundColor = '#5BC236'
}

//button switch to train
function switchTrain() {
  switchBtn.classList.remove('play')
  switchBtn.classList.remove('switch-btn-active')
  switchBtn.classList.add('train')
  play.classList.add('mode-inactive')
  train.classList.remove('mode-inactive')
  switchContainer.style.backgroundColor = '#ffc000'
}
