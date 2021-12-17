// Находим изменяющиеся поля информации карты и поля ввода
let paySystemLogo = document.querySelector(".form__card-type");
let cardNumber = document.querySelector(".form__card-num");
let cardInfo = document.getElementsByClassName("form__text");
let formFields = document.getElementsByClassName("form__field");

// Определим переменные, хранящие информацию, которая отображается на карте
let cardPeriod = cardInfo[0];
let cardCVV = cardInfo[1];
let cardHolder = cardInfo[2];

/* Создаём обработчики события на поля ввода
информации о карте: номер, срок действия,
полное имя владельца и CVV-код */
formFields[0].oninput = inputCardNumber;
formFields[1].oninput = inputCardHolder;
formFields[2].oninput = inputMonth;
formFields[3].oninput = inputYear;
formFields[4].oninput = inputCVV;

/* Для запрета ввода посторонних символов используем механизм
регулярных выражений: 
   /[^\d]/g - для запрета ввода символов, которые не являются цифрами
   /[^a-z\s]+/gi - для возможности ввода только букв латинкого
   алфавита и пробела */
function inputCardNumber() {

    this.value = this.value.replace(/[^\d]/g,'');
    this.value = this.value.split(" ").join("");

    if (this.value.length > 0) {
        this.value = this.value.match(new RegExp('.{1,4}', 'g')).join(" ");
    }

    /* Для корректного отображения информации на карте сначала записываем в поле карты
    начальное значение - шаблон (например, для номера карты это будет "#### #### #### ####") */
    cardNumber.innerText = cardNumber.innerText.replace(cardNumber.innerText.slice(0), "#### #### #### ####");

    /* Считываем подстроку в шаблоне, которую надо заменить на значение поля ввода*/
    let subStr = cardNumber.innerText.slice(0, this.value.length);

    /* Заменяем подстроку в шаблоне на значение поля ввода */
    cardNumber.innerText = cardNumber.innerText.replace(subStr, this.value);

    /* Если номер карты начинается на "4", значит тип платёжной системы - Visa
    Если на: "51" или "52" или "53" или "54" или "55" - MasterCard
    Если на: "56" или "57" или "58" или "59" или "53" или "67" - Maestro
    Если на "2" - Mir */
    if (this.value.match(/^4/)) {
        paySystemLogo.src = "src/img/visa.svg";
        return;
    }

    if (this.value.match(/^5[1-5]/)) {
        paySystemLogo.src = "src/img/mastercard.svg";
        return;
    }

    if (this.value.match(/^5[6-8]|^50|^63|^67/)) {
        paySystemLogo.src = "src/img/maestro.svg";
        return;
    }

    if (this.value.match(/^2/)) {
        paySystemLogo.src = "src/img/mir.svg";
        return;
    } 
    else {
        paySystemLogo.src = "src/img/none.svg";
        return;
    }
    
}

function inputCardHolder() {

    this.value = this.value.replace(/[^a-z\s]+/gi, '');
    cardHolder.innerText = this.value.replace(/\s+/g, " ").trim();

    if (this.value == "") {
        cardHolder.innerText = "FULL NAME";
    }

}

function inputMonth() {

    this.value = this.value.replace(/[^\d]/g, "");

    if (Number(this.value) > 12) {
        this.value = 12;
    }

    /* Алгоритм аналогичен алгоритму, который применён для ввода номера карты */
    cardPeriod.innerText = cardPeriod.innerText.replace(cardPeriod.innerText.slice(0, 2), "MM");
    let subStr = cardPeriod.innerText.slice(0, this.value.length);
    cardPeriod.innerText = cardPeriod.innerText.replace(subStr, this.value);

}

function inputYear() {

    this.value = this.value.replace(/[^\d]/g, "");

    /* Алгоритм аналогичен алгоритму, который применён для ввода номера карты */
    cardPeriod.innerText = cardPeriod.innerText.replace(cardPeriod.innerText.slice(5, 7), "YY");
    let subStr = cardPeriod.innerText.slice(5, 5 + this.value.length);
    cardPeriod.innerText = cardPeriod.innerText.replace(subStr, this.value);

}

function inputCVV() {

    this.value = this.value.replace(/[^\d]/g, "");

    /* Алгоритм аналогичен алгоритму, который применён для ввода номера карты */
    cardCVV.innerText = cardCVV.innerText.replace(cardCVV.innerText.slice(0), "***");
    let subStr = cardCVV.innerText.slice(0, 0 + this.value.length);
    cardCVV.innerText = cardCVV.innerText.replace(subStr, this.value);

}



