/*
 * Create a list that holds all of your cards
 */
let list = Array.from(document.getElementsByClassName('card')); // cards list
let card = document.querySelector('.deck');
let displayCounter = 0;
let card1;
let card2;
let moves = 0;
let removedStars = 0;
let timer = 0;
let timeTicker;
let matchedCard = 0;

start();
function start() {
  // shuffle cards list
  shuffle(list);
  let item;
  for (let item of list) {
    document.querySelector('.deck').appendChild(item);
  }
  startTimer();
}
// add click listener to cards and allow them to open
card.addEventListener('click', function listener(ev) {
  oneMove();
  if (ev.target.nodeName == "UL") return;

  if (displayCounter == 0) {
    card1 = ev.target;
    card1.classList.add('open');
    displayCounter++;
  }
  else if (displayCounter == 1 && card1!=ev.target) {
    card2 = ev.target;
    card2.classList.add('open');
    displayCounter++;
  }
  else {

  }

});

// This listener helps to display the opend card for a moment
card.addEventListener('transitionend', function listener() {
  if (displayCounter < 2) return;
  compareCards();
});


// this function add moves and control the game star rating
function oneMove() {
  //after 20 moves, remove 1 star
  if (moves > 20 && removedStars === 0) {
    document.querySelector('.stars').removeChild(document.querySelector('.stars').firstElementChild);
    removedStars++;
  }
  //after 26, remove 1 star
  if (moves > 26 && removedStars === 1) {
    document.querySelector('.stars').removeChild(document.querySelector('.stars').firstElementChild);
    removedStars++;
  }
  // add one move
  document.querySelector('.moves').textContent = ++moves;
}

// this function will compares opened cards 
function compareCards() {

  if (card1 !== card2 &&
    card1.firstElementChild.className ===
    card2.firstElementChild.className) {

    card1.classList.add('match');
    card2.classList.add('match');
    displayCounter = 0;
    matchedCard++;
    if (matchedCard == 8) {
      clearTimer();
      Popup();
    }


  }
  else {
    wait(300); // wait less than a second
    card1.classList.toggle('open'); 
    card2.classList.toggle('open');
    displayCounter = 0;
  }

}
// wait function from https://stackoverflow.com/q/14226803
function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

//   function display(card) {
//   card.classList.add('open');
// }

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
// function helps us to start the timer
function startTimer() {
  let timerElement = document.querySelector('.timer');
  // this is the function that will run every 1 second
  timeTicker = setInterval(function () {
    //updates the time in the html page
    timerElement.textContent = 'Time: ' + timer;
    timer++;
  }, 1000);
}
// this function stop timer
function clearTimer() {
  clearInterval(timeTicker);
}
// this function will add popup when the player wins
function Popup() {
  let modal = document.querySelector(".modal");
  modal.classList.toggle("display-modal");
  
  // Here checking point for the star rate 
  if (removedStars == 0) {
    let div = document.createElement("div");
    div.innerHTML = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
    div.style.textAlign = "center";
    document.querySelector('.content').appendChild(div);
  }
  if (removedStars == 1) {
    let div = document.createElement("div");
    div.innerHTML = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
    div.style.textAlign = "center";
    document.querySelector('.content').appendChild(div);
  }
  if (removedStars == 2) {
    let div = document.createElement("div");
    div.innerHTML = '<span class="fa fa-star checked">';
    div.style.textAlign = "center";
    div.style.fontSize = "33px";
    document.querySelector('.content').appendChild(div);
  }
  // here will add the timer and new game button
  let p = document.createElement("p");
  p.textContent = 'The game took you ' + (timer-1) + ' seconds to win.';
  document.querySelector('.content').appendChild(p);
  let btn = document.createElement("span");
  btn.innerHTML = "<button value='Refresh Page' onClick='window.location.href=window.location.href'>New Game</button>";
  document.querySelector('.content').appendChild(btn);
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
