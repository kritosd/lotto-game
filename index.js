const urlParams = new URLSearchParams(window.location.search);
const game = urlParams.get('game');
const table = document.getElementById('table');
table.classList.add(game);

let maxNumbers = 10;
let minSelectionNumbers = 2;
let maxSelectionNumbers = 12;
switch (game) {
    case 'tzoker':
        maxNumbers = 45;
        break;
    case 'kino':
        maxNumbers = 80;
        break;
    case 'lotto':
    default:
        maxNumbers = 49;
        break;
}

const displayNumbers = Array.from({length: maxNumbers}, (_, i) => i + 1)

displayNumbers.map( displayNumber => {
    let p = table.insertAdjacentHTML('beforeend', `<button value="${displayNumber}" class="number ">${displayNumber}</button>`);
});

$(".number").click(function() {
    var element = $(this);
    if (element.hasClass('numberSelected')) {
        element.removeClass('numberSelected');
    } else {
        element.addClass('numberSelected');
    }
});


function getNumbers() {
    let numbersSelected = Array.from(document.getElementsByClassName('numberSelected'));
    let numbers = Array();
    numbersSelected.map( number => {
        numbers.push(number.value);
    });
    return numbers;
}

// TODO: Validate selction numbers on the future
function validation() {
    // return true; // remove this line to validate
    var selectedCount = getNumbers().length;
    return selectedCount >= minSelectionNumbers && selectedCount <= maxSelectionNumbers;
}

$(".submit").click(function() {
    if (validation()) {
        alert(getNumbers());
    } else {
        alert('You need to select '+minSelectionNumbers+' - '+maxSelectionNumbers+' numbers');
    }
});