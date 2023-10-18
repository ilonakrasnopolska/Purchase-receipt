//Purchase receipt
//Приложение для создания чека с товарами и расчета полной стоимости покупки

//Массив продуктов
let productArray = ['Coffee', 'Milk', 'Sugar', 'Apple']

//Массив кол-во продуктов 
let amountArray = [1, 3, 2, 3]

//Массив стоимости
let priceArray = [540, 120, 80, 74]

//Массив общей цены
let totalSumArr = []

let finalAllProductPrice = 0 //Итоговая стоимость

let finalPriceBox = createFinalPriceBox() //Переменная принимает контент для вывода итоговой стоимости

let productItem = "" //Переменная которая будет принимать li в функции renderTable

//Функция создает div
function createDiv(classList) {

  let div = document.createElement("div")
  div.classList.add(classList)

  return div
}

//Функция создает input
function createInput(placeholder, type) {
  let input = document.createElement("input")
  input.classList.add('input')
  input.placeholder = placeholder
  input.type = type
  return input
}

//Функция создает strong 
function createStrong(classList, text) {
  let strong = document.createElement("strong")
  strong.classList.add(classList)
  strong.textContent = text
  return strong
}

//Функция создает button
function createBtn(classList, text) {

  let button = document.createElement("button")
  button.classList.add(classList)
  button.textContent = text

  return button
}

//Функция создает ul 
function productTable(classList) {
  let list = document.createElement("ul")
  list.classList.add(classList)
  return list
}

//Функция создает h3 
function createSubtitle(text, classList, title) {

  let subtitle = document.createElement(text)
  subtitle.classList.add(classList)
  subtitle.textContent = title

  return subtitle
}

//Функция создает div в котором лежит input(1)(2)(3) и button
function createInputBox() {
  let inputBox = createDiv('input-box')

  let inputProductOfName = createInput('Product of name', 'text')
  let inputProductAmount = createInput('Amount', 'number')
  let inputProductPrice = createInput('Price', 'number')

  let addBtn = createBtn('create-btn', 'Add')

  addBtn.onclick = function () {

    // Получаем значения из input
    let productName = inputProductOfName.value;
    let productAmount = parseInt(inputProductAmount.value);
    let productPrice = parseInt(inputProductPrice.value);


    // Проверка, что все поля заполнены
    if (productName && !isNaN(productAmount) && !isNaN(productPrice)) {

      // Добавляем значения в соответствующие массивы
      productArray.push(productName);
      amountArray.push(productAmount);
      priceArray.push(productPrice);
  
      // Сбросываем значения инпутов
      inputProductOfName.value = '';
      inputProductAmount.value = '';
      inputProductPrice.value = '';


      // Вызов функции для отрисовки таблицы с обновленными данными
      renderTable(productArray, amountArray, priceArray);   
    }
  }
  inputBox.append(inputProductOfName, inputProductAmount, inputProductPrice, addBtn)
  return inputBox
}

//Функция создает div в котором лежит h3 и strong для function createListItem
function createItemContentBox(classList, title, text) {
  let box = createDiv(classList)

  let subtitle = createSubtitle('h3', 'list-item-title', title)

  let strong = createStrong('list-item-txt', text)

  box.append(subtitle, strong)

  return box
}

//Функция создает li с его элементами
function createListItem(index, name, amount, price, total) {
  
  let indexTxt = createStrong('list-item-index', `${index + 1}`) //Индекс элемента

  let listItem = document.createElement("li") //list-item
  listItem.classList.add('list-item')

  let txt1 = createItemContentBox(`list-item-txt-box`, `Name`, `${name}`)
  let txt2 = createItemContentBox(`list-item-txt-box`, `Amount`, `${amount}`)
  let txt3 = createItemContentBox(`list-item-txt-box`, `Price`, `${price}`)
  //Общая цена 
  let txt4 = createItemContentBox(`list-item-txt-box`, `Total price`, `${total = price * amount}`)
  totalSumArr.push(total)

  let btnBox = createDiv('btn-box')  //div-обертка для кнопок

  let editBtn = createBtn('edit-btn', 'Edit') //кнопка редактировать
  editBtn.onclick = function () {
    let productOfName = prompt('Enter product of name:');

    // Проверка, был ли введен текст или нажата отмена
    if (productOfName !== null) {
      let productAmount = prompt('Enter product amount:');
      let productPrice = prompt('Enter product price:');
      // Проверка, были ли введены числа
      if (productAmount !== null && productPrice !== null && !isNaN(productAmount) && !isNaN(productPrice)) {
       //Замена index в массиве на новое значение из prompt, которое лежит в переменной
        productArray[index] = productOfName;
        amountArray[index] = Number(productAmount);
        priceArray[index] = Number(productPrice);
  
        renderTable(productArray, amountArray, priceArray); //перерисовываем массив
        //Проверка на пустую строку 
      } else if (productAmount === null || productPrice === null) {
        alert('Incorrect data entered!');
      }
    }
  }

  let deleteBtn = createBtn('delete-btn', 'Delete') //кнопка удалить

  //Функция удаляет list-item при клике на btn 
  deleteBtn.onclick = function () {
    if (confirm('Are you sure you want to delete the product?')) {

      //Отнимаем от итоговой стоимости totalSumArr[index]
      finalAllProductPrice -= totalSumArr[index]

      productArray.splice(index, 1); // Удаляем 1 объект массива со значением index
      amountArray.splice(index, 1); // Удаляем соответствующий элемент из массива количества
      priceArray.splice(index, 1); // Удаляем соответствующий элемент из массива цен
      totalSumArr.splice(index, 1); // Удаляем соответствующий элемент из массива

      finalPriceBox.children[1].textContent = `${finalAllProductPrice} USD`; // Обновляем текст в элементе общей стоимости

    }
    renderTable(productArray, amountArray, priceArray) //перерисовываем массив
  }

  btnBox.append(editBtn, deleteBtn) //добавляем btn edit and remove в блок div 
  listItem.append(indexTxt, txt1, txt2, txt3, txt4, btnBox)

  return listItem
}

//Функция создает блок итоговой стоимости
function createFinalPriceBox(text, amount) {

  let finalPrice = createDiv()

  let strong1 = createStrong('final-price-txt', text)
  strong1.textContent = text

  let strong2 = createStrong('final-price-txt', amount)
  strong2.textContent = amount

  finalPrice.append(strong1, strong2)

  return finalPrice
}

//Функция отрисовки списка
function renderTable(arrProduct, arrAmount, arrPrice) {
  ul.innerHTML = "" //Очищаем список перед отрисовкой
  finalAllProductPrice = 0; // Обнуляем итоговую стоимость

  //Начинаем отрисовку используя массив и цикл 
  for (let i = 0; i < arrProduct.length; i++) {
    productItem = createListItem(i, arrProduct[i], arrAmount[i], arrPrice[i], totalSumArr[i])
    ul.append(productItem) //добавляем li в ul 
  }

  // Получаем все элементы с классом list-item
  productItem = ul.querySelectorAll('.list-item')
  //Проверяем есть ли элементы с классом list-item внутри list
  if (productItem.length === 0) {
    let emptyList = createStrong('list-item-empty', 'Ваш список пуст') //Создаем переменную которая принимает strong
    ul.appendChild(emptyList) //Добавляем strong в list
    // Добавляем класс для скрытия блока 
    document.querySelector('.final-price-box').classList.add('hidden-final-price')
  }

  //Цикл для увеличения итоговой стоимости
  for (let i = 0; i < priceArray.length; i++) {
    totalSumArr[i] = amountArray[i] * priceArray[i]; //Добавляем в массив количество [i] умноженное на стоимость [i]
    finalAllProductPrice += totalSumArr[i]; // Увеличиваем итоговую стоимость
  }
  finalPriceBox.classList.add('final-price-box')
  finalPriceBox.children[0].textContent = `Final price:`
  finalPriceBox.children[1].textContent = `${finalAllProductPrice} USD`
}

//Создаем контейнер
let container = createDiv('container')

//Создаем заголовок 
const title = createSubtitle('h1', 'title', 'Purchase receipt')

//Переменная принимает функцию с элементами input(1(2(3) и btn 
let inputBox = createInputBox()

//Переменная принимает функцию,которая создает ul 
let ul = productTable('list')

// Запускаем отрисовку списка при загрузке страницы
renderTable(productArray, amountArray, priceArray)

//Добавляем элементы в html document 
container.append(title, inputBox, ul, finalPriceBox)
document.body.append(container)