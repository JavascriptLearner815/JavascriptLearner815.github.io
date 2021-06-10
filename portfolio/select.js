export default class Select {
  constructor(element) {
    this.element = element
    this.options = getFormattedOptions(element.querySelectorAll("option"))
    this.customElement = document.createElement("div")
    this.labelElement = document.createElement("span")
    this.optionsCustomElement = document.createElement("ul")
    setupCustomElement(this)
    element.style.display = "none"
    element.after(this.customElement)
  }
  
  get selectedOption() {
    return getSelectedOption(this)
  }
  
  get selectedOptionIndex() {
    return getSelectedOptionIndex(this)
  }
  
  selectValue(value) {
    return selectValue(this, value)
  }
}

function getSelectedOption(obj) {
  return obj.options.find(option => option.selected)
}

function getSelectedOptionIndex(obj) {
  return obj.options.indexOf(obj.selectedOption)
}

function selectValue(obj, value) {
    const newSelectedOption = obj.options.find(option => option.value === value)
    const prevSelectedOption = obj.selectedOption
    prevSelectedOption.selected = false
    prevSelectedOption.element.selected = false
    
    newSelectedOption.selected = true
    newSelectedOption.element.selected = true
    
    obj.labelElement.innerText = newSelectedOption.label
    obj.optionsCustomElement
      .querySelector(
        `[data-value="${prevSelectedOption.value}"`
      )
        .classList.remove("selected")
    const newCustomElement = obj.optionsCustomElement
      .querySelector(
        `[data-value="${newSelectedOption.value}"`
      )
        .classList.add("selected")
    newCustomElement.classList.add("selected")
    newCustomElement.scrollIntoView({ block: "nearest" })
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
    optionElement.addEventListener("click", () => {
      select.selectValue(option.value)
      select.optionsCustomElement.classList.remove("show")
    })
    select.optionsCustomElement.append(optionElement)
  })
  select.customElement.append(select.optionsCustomElement)
  
  select.labelElement.addEventListener("click", () => {
    select.optionsCustomElement.classList.toggle("show")
  })
  
  select.customElement.addEventListener("blur", () => {
    select.optionsCustomElement.classList.remove("show")
  })
  
  let debounceTimeout
  let searchTerm = ""
  select.customElement.addEventListener("keydown", e => {
    switch (e.code) {
      case "Space": {
        select.optionsCustomElement.classList.toggle("show")
        break
      }
      case "ArrowUp": {
        const prevOption = select.options[select.selectedOptionIndex - 1]
        if (prevOption) {
          select.selectValue(prevOption.value)
        }
        break
      }
      case "ArrowDown": {
        const nextOption = select.options[select.selectedOptionIndex + 1]
        if (nextOption) {
          select.selectValue(nextOption.value)
        }
        break
      }
      case "Enter":
      case "Escape": {
        select.optionsCustomElement.classList.remove("show")
        break
      }
      default: {
        clearTimeout(debounceTimeout)
        searchTerm += e.key
        debounceTimeout = setTimeout(() => searchTerm = "", 500)
        
        const searchedOption = select.options.find(option => option.label.toLowerCase().startsWith(searchTerm))
        if (searchedOption) {
          select.selectValue(searchedOption.value)
        }
      }
    }
  })
}

function getFormattedOptions(optionElements) {
  return [...optionElements].map(optionElement => ({
    value: optionElement.value,
    label: optionElement.label,
    selected: optionElement.selected,
    element: optionElement
  }))
}
