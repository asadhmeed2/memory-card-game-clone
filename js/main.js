let gameboard = ['monster-1', 'monster-1', 'monster-2', 'monster-2', 'monster-3', 'monster-3', 'monster-4', 'monster-4', 'monster-5', 'monster-5', 'monster-6', 'monster-6'];
let clicked = [];
let score = 0;
let wrongAnswers=0;


function startBtnClickHandler() {
    let startGamePage = document.querySelector('.startPage');
    startGamePage.style.zIndex = -2;
    startGamePage.style.opacity = 0;
}
/**
 * 
 */
function startGameScreen() {
    startGame();
    document.querySelector('#start-game').addEventListener('click', startBtnClickHandler);
}
/**
 *
 *
 */
function startGame() {
    let gameboardArray = [...gameboard];
    let newGameboard = shuffle(gameboardArray);
    console.log(newGameboard);
    console.log(score);
    intializeGameboard(newGameboard);
}
/**
 *
 *
 */
function intializeGameboard(newGameboard) {
    let gameboard = document.querySelector('.container');
    for (let row = 0; row < 3; row++) {
        for (let cloumn = 0; cloumn < 4; cloumn++) {
            let card = document.createElement('div');
            card.classList.add('card-down');
            card.classList.add('card');
            card.id = `${(row * 4) + cloumn}`
            card.style.gridColumnStart = cloumn + 1
            card.style.gridRowStart = row + 1
            gameboard.append(card)
        }
    }
    
    gameboard.addEventListener('click', function cardClickHandlerEnter(e) { cardClickHandler(e, newGameboard) });
}
/**
 *
 *
 */
function cardClickHandler(e, newGameboard) {
  
    removeEventListenerFromTarget(e.target, "click", function cardClickHandlerEnter(e) { cardClickHandler(e, newGameboard) });
    if (!Array.from(e.target.classList).join(' ').includes('up')) {
        if (clicked.length < 1) {
            e.target.classList.remove('card-down');
            
            e.target.classList.add(newGameboard[parseInt(e.target.id)])
            addOrRemove(e.target, newGameboard[parseInt(e.target.id)], 'add')
            clicked = [...clicked, e.target]
        } else if (clicked.length < 2 && clicked[0].id !== e.target.id) {
            addOrRemove(e.target, newGameboard[parseInt(e.target.id)], 'add')
            clicked = [...clicked, e.target]
            removeEventListenerFromTarget(document.querySelector('.container'), 'click', function cardClickHandlerEnter(e) { cardClickHandler(e, newGameboard) })
            setTimeout(function () {
                if (!(newGameboard[clicked[0].id] === newGameboard[clicked[1].id])) {
                    addOrRemove(clicked[0], newGameboard[clicked[0].id], 'remove')
                    addOrRemove(clicked[1], newGameboard[clicked[1].id], 'remove')
                    addOrRemove(clicked[0], 'card-down', 'add')
                    addOrRemove(clicked[1], 'card-down', 'add')
                    clicked = [];
                } else {
                    clicked[0].classList.add('up');
                    clicked[1].classList.add('up');
                    score += 2;
                    clicked = [];
                    console.log(score  + ' :', gameboard.length);
                    if (score === gameboard.length) {
                        setUpReloadScreen();
                    }
                }


            }, 500)
        }

    }

}
/**
 *
 *
 */
function addOrRemove(target, classType, actionType) {
   
    if (actionType === 'remove') {
        target.classList.remove(classType)
    } else if (actionType === 'add') {
        target.classList.add(classType)
    }
}
/**
 * 
 */
function removeEventListenerFromTarget(target, type, callback) {
    target.removeEventListener(type, callback);
}
function addEventListenerToTarget(target, type, callback) {
    target.addEventListener(type, callback);
}

/**
 * 
 * 
 */
function setUpReloadScreen() {
    const reloadScreen = document.querySelector('.reloadPage');
    const reloadHeader = document.querySelector('#reloadHeader');
    const reloadBtn = document.querySelector('#reload');
    reloadScreen.style.opacity = '1';
    reloadScreen.style.zIndex = 10;
    reloadHeader.textContent = 'WOW your smart!!!'
    reloadHeader.style.color = 'green';
    addEventListenerToTarget(reloadBtn, 'click', reloadHeaderFunction);
}

/**
 * 
 */
function reloadHeaderFunction() {
    const reloadScreen = document.querySelector('.reloadPage');
    Array.from(document.querySelectorAll('.card'
    )).map((el) => {
        el.classList =''
    })
    reloadScreen.style.opacity = '0';
    reloadScreen.style.zIndex = -3;
    clicked = [];
    score = 0; 
    wrongAnswers = 0;
    startGame();

}
window.onload = function () {
    {
        startGameScreen();
    }
}
/**
 *
 *
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
