const sendData = () => {
  const data = document.getElementById('rgbValue').value.replace(/"|\s/g, '')
  const inputArray = data.split(',')
  let valueToDisplay = document.getElementById('valueToDisplay')

  if (!isValid(inputArray)) {
    return (valueToDisplay.innerText =
      'Error. Please provide value in correct format. \n For example: 255,255,255.')
  }
  const [red, green, blue] = inputArray
  return (valueToDisplay.innerText = returnHexValue(red, green, blue))
}

const isValid = (data) => {
  if (data.length != 3) {
    return false
  }

  for (let element of data) {
    console.log(typeof +element, +element)
    if (isNaN(+element) || +element > 255 || +element < 0) {
      return false
    }
  }
  return true
}

//Transforms decimal number to a collection of data of sixteens and ones
const arrayOfBaseHex = (number) => {
  const sixteensInNum = Math.floor(number / 16)
  const onesInNum = number - sixteensInNum * 16
  return [sixteensInNum, onesInNum]
}
//Transforms array of sixteens and ones to HEX value and returns the new Hex value
const converToHex = (number) => {
  let hexValue = ''
  arrayOfBaseHex(number).map((item) =>
    item > 9
      ? (hexValue += String.fromCharCode(item - 9 + 64))
      : (hexValue += item)
  )
  return hexValue
}
//Decimal numbers of RGB are returned in Hex value
const returnHexValue = (red, green, blue) =>
  '#' + converToHex(red) + converToHex(green) + converToHex(blue)

//In real application would use toString(16) method, but implemented my own algorithm.
// const easyHexValue = (red, green, blue) =>
//   '#' +
//   red.toString(16).toUpperCase() +
//   green.toString(16).toUpperCase() +
//   blue.toString(16).toUpperCase()
