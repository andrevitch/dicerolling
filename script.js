'use strict';

const p1El = document.querySelector('.player--0');
const p2El = document.querySelector('.player--1');
const p1Score = document.querySelector('#score--0');
const p2Score = document.querySelector('#score--1');
const p1Current = document.querySelector('#current--0');
const p2Current = document.querySelector('#current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore;
let activePlayer;
let playing;
let scores;

const init = function () {
    p1Current.textContent = 0;
    p2Current.textContent = 0;

    p1El.classList.remove('player--winner');
    p2El.classList.remove('player--winner');

    p1El.classList.add('player--active');
    p2El.classList.remove('player--active');

    //Starting conditions
    p1Score.textContent = '0';
    p2Score.textContent = '0';
    dice.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    p1El.classList.toggle('player--active');
    p2El.classList.toggle('player--active');
};



//roll btn
btnRoll.addEventListener('click', () => {
    if (playing) {
        let diceNumber = Math.trunc(Math.random() * 6) + 1;

        dice.classList.remove('hidden');
        dice.src = `./img/dice-${diceNumber}.png`;
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch players
            switchPlayer();
        }
    }
});

//hold btn
btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        if (scores[activePlayer] >= 20) {
            playing = false;

            dice.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);