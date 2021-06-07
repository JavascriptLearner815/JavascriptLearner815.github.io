export default class Select {
  constructor(element) {
    this.element = element
    this.options = getFormattedOptions(element.querySelectorAll("option"))
    this.customElement = document.createElement("div")
    this.labelElement = document.createElement("span")
    this.optionsCustomElement = document.createElement("ul")
    setupCustomElement(this)
    element.after(this.customElement)
  }
  
  get selectedOption() {
    return this.options.find(option => option.selected)
  }
}

function setupCustomElement(select) {
  select.customElement.classList.add("__custom-select-container")
  select.customElement.tabIndex = 0
  
  select.labelElement.classList.add("__custom-select-value")
  select.labelElement.innerText = select.selectedOption.label
  select.customElement.append(select.labelElement)
  
  select.optionsCustomElement.classList.add("__custom-select-options")
  select.options.forEach(option => {
    const optionElement = document.createElement("li")
    optionElement.classList.add("__custom-select-option")
    optionElement.classList.toggle("selected", option.selected)
    optionElement.innerText = option.label
    optionElement.dataset.value = option.value
    select.optionsCustomElement.append(optionElement)
  })
  select.customElement.append(select.optionsCustomElement)
}

function getFormattedOptions(optionElements) {
  return [...optionsElement].map(optionElement => ({
    value: optionElement.value,
    label: optionElement.label,
    selected: optionElement.selected,
    element: optionElement
  }))
}
