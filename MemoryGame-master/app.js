/*
 * Create a list that holds all of your cards
 */

var cards = [ 'fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb',
            ];


function generateCard(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;

}
var cardTemplate = '<li class="card">'
                    + '<i class="fa fa-bomb"></i>'
                    + '</li>';




 let moves = 0;
 //displayTime();
 let clockOff = true;
 let time = 0;
 let clockId;
 let matched = 0;
 //checkScore();

 //writeModalStats();
 //toggleModal();

 //Modal Tests

//  time = 121;
//  displayTime();
//  moves = 16; 
//  checkScore();

//  writeModalStats();
//  toggleModal();
//  toggleModal();

//toggleModal();

 function addMove() {
     moves++;
     const movesTest = document.querySelector('.moves');
     movesTest.innerHTML = moves;
 }

 function checkScore(){
     if(moves === 16 || moves === 24) {
         removeStar();
     }
 }


 function removeStar() {
     const starList = document.querySelectorAll('.stars li');
     for (star of starList){
        if(star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }
     }
 }

 function startClock (){
     clockId = setInterval(() => {
         time++;
        displayTime();
         console.log(time);
     }, 1000);
 }


 
 function displayTime() {
    const clock = document.querySelector('.clock');
    console.log(clock);
    

    const minutes = Math.floor(time /60);
    const seconds = time % 60;

    if(seconds <10 ) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }

}

 function stopClock() {
    clearInterval(clockId);
}
 function toggleModal(){
     const modal = document.querySelector('.modal__background');
     modal.classList.toggle('hide');
 }

 function writeModalStats(){
    const timeStat = document.querySelector('.modal__time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal__moves');
    const starsStat = document.querySelector('.modal__stars');
    const stars = getStars();


    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}` ;
    starsStat.innerHTML = `Stars = ${stars}`;

 }

 function getStars() {


    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for( star of stars) {
        if(star.style.display !== 'none') {
            starCount++;
        }
    }

    console.log(starCount);
    return starCount;
 }


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
    );
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var cardHTML;
 function initGame(){
    
    var deck = document.querySelector('.deck');
    cardHTML = shuffle(cards).map(function(card){
        return generateCard(card);
    });



    deck.innerHTML = cardHTML.join('');

 }
 initGame();
 //startClock();

 var allCards = document.querySelectorAll('.card');
 var openCards = [];

 document.querySelector('.modal__cancel').addEventListener('click', () => {
     toggleModal();
 });
 document.querySelector('.modal__replay').addEventListener('click', () => {

    console.log('replay');
 });

 document.querySelector('.restart').addEventListener('click', resetGame);

 document.querySelector('.modal__replay').addEventListener('click', resetGame);

 function shuffleDeck() {
     const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
     const shuffledCards = shuffle(cardsToShuffle);
     for(card of shuffledCards) {
         deck.appendChild(card);
     }
 }


 function resetGame(){
    // resetClockAndTime();
     //resetMoves();
     //resetStars();

     //initGame();
     //deck.clear();
     document.location.reload();
 }

 function replayGame(){
   // toggleModal();
   // resetGame();
   document.location.reload();
}
 
function resetClockAndTime() {
stopClock();
clockOff = true;
time = 0;
displayTime();

}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for(star of starList) {
        star.style.display = 'inline';
    }
}

document.querySelector('.modal__replay').addEventListener('click', replayGame);


 document.querySelector('.restart').addEventListener('click', resetGame);

function resetCards(){
    const cards = document.querySelectorAll('deck li');
    for( let card of cards) {
        card.className = 'card';
    }



}

 const clear = document.querySelector('.restart');
 clear.addEventListener('click', function(){
     console.log('header button was pressed');
     allCards.forEach(function(card) {
         card.classList.remove('open', 'show', 'match');
     });
 
     openCards = [];
     initGame();

 
     //allCards.clear;
     //initGame();
 
    // allCards = document.querySelectorAll('.card');
    // openCards = [];
     
 });
 
// deck.addEventListener('click', event => {
//     const clickTarget = event.target;   
//     if(isClickValid(clickTarget)) {
//         if(clockOff) {
//             startClock();
//             clockOff = false;
//         }
//     }
// })

function gameOver(){
    stopClock();
  
    toggleModal();
    writeModalStats();
    console.log('game is over');
}




allCards.forEach(function(card) {
    card.addEventListener('click', function(e){

        if(clockOff) {
            startClock();
            clockOff = false;
        }
        
        if(!card.classList.contains('open') && !card.classList.contains('show')&& 
        !card.classList.contains('match') && openCards.length<2){
            openCards.push(card);
            card.classList.add('open', 'show');

           

            if(openCards.length == 2) {
                addMove();
                checkScore();
                if(openCards[0].dataset.card == openCards[1].dataset.card){
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];
                    matched++;
                    const TOTAL_PAIRS = 8;

                    if(matched === TOTAL_PAIRS) {
                    gameOver();
                      }


                }else {

                    setTimeout(function() {
                        openCards.forEach(function(card) {
                           card.classList.remove('open', 'show');
                          
                       });
                
                       openCards = [];
                   }, 1000);  

                }
               
                
            } 
        
        }  
    });
});

