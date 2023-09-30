//Purchase receipt
//Приложение для создания чека с товарами и расчета полной стоимости покупки

//Массив продуктов
let productArray = ['Кофе', 'Молоко', 'Сахар', 'Яблоки']

//Массив кол-во продуктов 
let amountArray = [1, 3, 2, 3]

//Массив стоимости
let priceArray = [540, 120, 80, 74]

//Массив общей цены
let totalSum = []


//Функция создает input
function createInput (placeholder, type) {
  let input = document.createElement("input")
  input.classList.add('input')
  input.placeholder = placeholder
  input.type = type
  return input
}

//Функция создает strong 
function createStrong (classList, text) {
  let strong = document.createElement("strong")
  strong.classList.add(classList)
  strong.textContent = text
  return strong
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

//Функция создает div
function createDiv(classList) {
 
  let div = document.createElement("div")
  div.classList.add(classList)

  return div
}

//Функция создает h3 
function createSubtitle(classList, title) {
 
  let subtitle = document.createElement("h3")
  subtitle.classList.add(classList)
  subtitle.textContent = title

  return subtitle
}

//Функция обьединяет div, h3 и strong для list-item
function createListContentBox(classList, title, text) {
  let box = createDiv(classList)

  let subtitle = createSubtitle('list-item-title', title)

  let strong = createStrong('list-item-txt', text)

  box.append(subtitle, strong)

  return box
}

//Функция создает элементы списка
function createListItem (index, name, amount, price, total) {
  
  let indexTxt = createStrong('list-item-index', `${index + 1}`) //Индекс элемента

  let listItem = document.createElement("li") //list-item
  listItem.classList.add('list-item')

  let txt1 = createListContentBox(`list-item-txt-box`, `Название`, `${name}`)
  let txt2 = createListContentBox(`list-item-txt-box`, `Кол-во`, `${amount}`)
  let txt3 = createListContentBox(`list-item-txt-box`, `Цена`, `${price}`)

  //Общая цена 
  let txt4 = createListContentBox(`list-item-txt-box`, `Общая цена`, `${total = price * amount}`)
  totalSum.push(total)


  let btnBox = document.createElement("div")  //div-обертка для кнопок
  btnBox.classList.add('btn-box')

  let editBtn = document.createElement("button") //кнопка редактировать
  editBtn.classList.add('edit-btn')
  editBtn.textContent = 'Изменить'

  let deleteBtn = document.createElement("button") //кнопка удалить
  deleteBtn.classList.add('delete-btn')
  deleteBtn.textContent = 'Удалить'

  btnBox.append(editBtn, deleteBtn) //добавляем кнопки в блок div 
  listItem.append(indexTxt, txt1, txt2, txt3, txt4, btnBox)

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

//Функция создает div в котором лежит strong для финальной цены 
function createFinalPriceBox (classList, text, amount) {
  let finalPrice = document.createElement("div")
  finalPrice.classList.add(classList)

  let strong1 = createStrong('final-price-txt', text)
  strong1.textContent = text

  let strong2 = createStrong('final-price-txt', amount)
  strong2.textContent = amount

  finalPrice.append(strong1, strong2)
  return finalPrice
}

//Переменная принимает функцию,которая создает блок итоговой цены
let finalPrice = createFinalPriceBox('final-price-box', `Итоговая стоимость:`, '')


//Функция отрисовки списка
function render(arrProduct) {
  list.innerHTML = "" //Очищаем список перед отрисовкой

  let totalPrice = 0 //Итоговая стоимость

  //Начинаем отрисовку используя массив и цикл 
  for (let i = 0; i < arrProduct.length; i++) {
    let productItem = createListItem(i, productArray[i], amountArray[i], priceArray[i], totalSum[i])
    
    totalPrice = totalPrice + totalSum[i] //Увеличиваем итоговую стоимость
    list.append(productItem) //добавляем li в ul 
  }
  // Изменяем текст в элементе общего кол-ва шагов
  finalPrice = createFinalPriceBox('final-price-box', `Итоговая стоимость:`, `${totalPrice} руб`)
}

// Запускаем отрисовку списка при загрузке страницы
render(productArray)

//Добавляем элементы в html document 
container.append(title, inputBox, list, finalPrice)
document.body.append(container)