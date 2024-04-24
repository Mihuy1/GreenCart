'use strict'

const payAmountBtn = document.querySelector('#payAmount')
const decrementBtns = document.querySelectorAll('.decrement') // Changed to class
const incrementBtns = document.querySelectorAll('.increment') // Changed to class
const priceElems = document.querySelectorAll('.price')
const totalElem = document.querySelector('#total')
const quantityElems = document.querySelectorAll('.quantity')
const subtotalElem = document.querySelector('#subtotal')
const taxElem = document.querySelector('#tax')

// Add event listeners to each increment and decrement button
incrementBtns.forEach((incrementBtn, index) => {
  incrementBtn.addEventListener('click', function () {
    let increment = Number(quantityElems[index].textContent)
    console.log(increment)
    increment++
    quantityElems[index].textContent = increment
    totalCalc() // Call totalCalc after updating quantity
  })
})

decrementBtns.forEach((decrementBtn, index) => {
  decrementBtn.addEventListener('click', function () {
    let decrement = Number(quantityElems[index].textContent)
    decrement = decrement <= 1 ? 1 : decrement - 1
    quantityElems[index].textContent = decrement
    totalCalc() // Call totalCalc after updating quantity
  })
})

// Calculate total and update elements
const totalCalc = function () {
  const taxRate = 0.05
  let subtotal = 0
  let totalTax = 0
  let total = 0

  // Loop through each product to calculate subtotal
  quantityElems.forEach((quantityElem, index) => {
    console.log(quantityElem.textContent)
    console.log(priceElems[index].textContent)
    console.log(quantityElem.textContent + priceElems[index].textContent)
    const totalNimo = Number(quantityElem.textContent + priceElems[index].textContent)
    subtotal += totalNimo
  })
  console.log(subtotal)

  // Update subtotal element
  subtotalElem.textContent = subtotal.toFixed(2)

  // Calculate total tax
  totalTax = subtotal * taxRate
  taxElem.textContent = totalTax.toFixed(2)

  // Calculate total
  total = subtotal + totalTax
  totalElem.textContent = total.toFixed(2)
  payAmountBtn.textContent = total.toFixed(2)
}
