import Select from "./select.js"

const selectElements = document.querySelectorAll("select[data-custom]")

selectElements.forEach(selectElement => new Select(selectElement))

const speedoImg = document.querySelector(".speedo-img")
const ariImg = document.querySelector(".ari-img")
const megaImg = document.querySelector(".mega-img")

const amsImgSelect = new Select(selectElement)

function showSpeedoImgAndTrack() {
  speedoImg.style.display = "block"
  return whenIsFalseDo(amsImgSelect.selectedOption.value === "Speedo", () => {
    speedoImg.style.display = "none"
    return true
  })
}

function showAriImgAndTrack() {
  ariImg.style.display = "block"
  return whenIsFalseDo(amsImgSelect.selectedOption.value === "Ari", () => {
    ariImg.style.display = "none"
    return true
  })
}

function showMegaImgAndTrack() {
  megaImg.style.display = "block"
  return whenIsFalseDo(amsImgSelect.selectedOption.value === "Mega", () => {
    megaImg.style.display = "none"
    return true
  })
}

function doSpeedoImg() {
  whenIsTrueDo(showSpeedoImgAndTrack(), () => (amsImgSelect.selectedOption.value === "Ari" ? doAriImg() : doMegaImg()))
}

function doAriImg() {
  whenIsTrueDo(showAriImgAndTrack(), () => (amsImgSelect.selectedOption.value === "Speedo" ? doSpeedoImg() : doMegaImg()))
}

function doMegaImg() {
  whenIsTrueDo(showMegaImgAndTrack(), () => (amsImgSelect.selectedOption.value === "Speedo" ? doSpeedoImg() : doAriImg()))
}
  
function whenIsFalseDo(cond, func) {
  while (!!cond) {
    ;
  }
  return func()
}

function whenIsTrueDo(cond, func) {
  while (!(!!cond)) {
    ;
  }
  return func()
}

doSpeedoImg()
