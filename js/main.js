"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    btnHold.classList.remove("hidden");
    btnRoll.classList.remove("hidden");

    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};
init();

// Switch function
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    currentScore = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
    if (playing) {
        // Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `/images/dice-${dice}.png`;

        // Check for rolled 1
        if (dice != 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", () => {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add("hidden");
            btnHold.classList.add("hidden");
            btnRoll.classList.add("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
        } else {
            //Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);
