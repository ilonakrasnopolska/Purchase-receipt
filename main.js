//Purchase receipt
//Приложение для создания чека с товарами и расчета полной стоимости покупки

//Массив продуктов
let productArray = ['Кофе', 'Молоко', 'Сахар', 'Яблоки']

//Массив кол-во продуктов 
let amountArray = [1, 3, 2, 3]

//Массив стоимости
let priceArray = [540, 120, 80, 74]


//Функция создает input
function createInput (placeholder, type) {
  let input = document.createElement("input")
  input.classList.add('input')
  input.placeholder = placeholder
  input.type = type
  return input
}

//Функция создает контейнер в котором лежит 3 элемента input и btn 
function createInputBox () {
  const inputBox = document.createElement("div")
  inputBox.classList.add('input-box')

  let inputProductOfName = createInput('Название товара', 'text')
  let inputProductAmount = createInput('Количество', 'number')
  let inputProductPrice = createInput('Цена', 'number')

  const addBtn = document.createElement("button")
  addBtn.classList.add('create-btn')
  addBtn.textContent = 'Добавить'

  inputBox.append(inputProductOfName, inputProductAmount, inputProductPrice, addBtn)
  return inputBox
}

//Функция создает ul 
function productList (classList) {
  let list = document.createElement("ul")
  list.classList.add(classList)
  return list
}

//Функция создает div в котором лежит strong
function createFinalPriceBox (classList) {
  let finalPrice = document.createElement("div")
  finalPrice.classList.add(classList)

  let strong = document.createElement("strong")
  strong.textContent = "Итоговая стоимость:"
  finalPrice.append(strong)
  return finalPrice
}

//Функция создает элементы списка
function createListItem (index, name, amount, price) {
  let listItem = document.createElement("li")
  listItem.classList.add('list-item')
  listItem.textContent = `${index + 1} ${name} ${amount} ${price}`

  let editBtn = document.createElement("button")
  editBtn.classList.add('edit-button')
  editBtn.textContent = 'Изменить'

  let deleteBtn = document.createElement("button")
  deleteBtn.classList.add('delete-btn')
  deleteBtn.textContent = 'Удалить'

  listItem.append(editBtn, deleteBtn)

  return listItem
}

//Создаем контейнер
const container = document.createElement("div")
container.classList.add('container')

//Создаем заголовок 
const title = document.createElement("h1")
title.classList.add('title')
title.textContent = 'Чек покупки'

//Переменная принимает блок с элементами input и btn 
let inputBox = createInputBox()

//Переменная принимает функцию,которая создает ul 
let list = productList('list')

//Переменная принимает функцию,которая создает блок итоговой цены
let finalPrice = createFinalPriceBox('final-price-box')


//Функция отрисовки списка
function render(arrProduct, arrAmount, arrPrice) {
  list.innerHTML = "" //Очищаем список перед отрисовкой

  let totalPrice = 0 //Итоговая стоимость

  //Начинаем отрисовку используя массив и цикл 
  for (let i = 0; i < arrProduct.length; i++) {
    let productItem = createListItem(i, productArray[i], amountArray[i], priceArray[i])
    
    totalPrice = totalPrice + priceArray[i] //Увеличиваем итоговую стоимость
    list.append(productItem) //добавляем li в ul 
  }
  // Изменяем текст в элементе общего кол-ва шагов
  finalPrice.textContent = `Итоговая стоимость: ${totalPrice}`
}

// Запускаем отрисовку списка при загрузке страницы
render(productArray, amountArray, priceArray)

//Добавляем элементы в html document 
container.append(title, inputBox, list, finalPrice)
document.body.append(container)