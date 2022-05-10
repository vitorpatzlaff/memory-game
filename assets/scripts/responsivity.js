const cssRoot = document.querySelector(':root')
const body = document.querySelector('body')
const stage = document.getElementById('stage')
const { type } = screen.orientation

checkOrientation()

window.addEventListener('resize', checkOrientation)

function checkOrientation () {
  const width = body.offsetWidth
  cssRoot.style.setProperty('--card-size', `${type.match(/landscape/g) ? landscape(width) : portrait(width)}px`)
}

function landscape (width) {
  stage.style.setProperty('grid-template', 'auto auto auto auto / auto auto auto auto auto auto')

  cssRoot.style.setProperty('--rows', 2)
  cssRoot.style.setProperty('--gaps', 3)

  return width / 13
}

function portrait (width) {
  stage.style.setProperty('grid-template', 'auto auto auto auto auto auto / auto auto auto auto')

  cssRoot.style.setProperty('--rows', 3)
  cssRoot.style.setProperty('--gaps', 4)

  return width / 6
}
