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
function validation(numbers) {
    // return true; // remove this line to validate
    var selectedCount = numbers.length;
    return selectedCount >= minSelectionNumbers && selectedCount <= maxSelectionNumbers;
}

async function send(numbers)  {
    const response = await fetch('http://localhost//lotto/server/api/endpoint.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "numbers": numbers })
    });
    const jsonData = await response.json();
    if (jsonData) {
        alert(jsonData.numbers);
    }
}

$(".submit").click(function() {
    const numbers = getNumbers();
    if (validation(numbers)) {
        send(numbers);
    } else {
        alert('You need to select '+minSelectionNumbers+' - '+maxSelectionNumbers+' numbers');
    }
});