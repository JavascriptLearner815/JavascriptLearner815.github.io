import Select from "./select"

const selectElements = document.querySelectorAll("[data-custom]")

selectElements.forEach(selectElement => {
  new Select(selectElement)
})

const select = new Select(selectElement)
