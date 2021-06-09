import Select from "./select.js"

const selectElements = document.querySelectorAll("select[data-custom]")

selectElements.forEach(selectElement => {
  new Select(selectElement)
})

const select = new Select(selectElement)
