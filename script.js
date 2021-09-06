"use strict";
const newBtn = document.querySelector(".btn--new");
const hldBtn = document.querySelector(".btn--hold");
const rollBtn = document.querySelector(".btn--roll");
const winner = document.querySelector(".winner");
const playerScr0 = document.getElementById("Score-0");
const playerScr1 = document.getElementById("Score-1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const player0El = document.querySelector(".player1");
const player1El = document.querySelector(".player2");

let playing = true;

// Switch player
const toggle = () => {
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

rollBtn.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `Assets/dice-${dice}.png`;

    if (dice === 1) {
      toggle();
      current0El.textContent = 0;
      current1El.textContent = 0;
    } else {
      if (player0El.classList.contains("player-active")) {
        current0El.textContent = Number(current0El.textContent) + dice;
      } else if (player1El.classList.contains("player-active")) {
        current1El.textContent = Number(current1El.textContent) + dice;
      }
    }
  }
});

hldBtn.addEventListener("click", function () {
  if (playing) {
    if (player0El.classList.contains("player-active")) {
      playerScr0.textContent =
        Number(playerScr0.textContent) + Number(current0El.textContent);
    } else if (player1El.classList.contains("player-active")) {
      playerScr1.textContent =
        Number(playerScr1.textContent) + Number(current1El.textContent);
    }

    toggle();
    current0El.textContent = 0;
    current1El.textContent = 0;

    if (playerScr0.textContent >= 100) {
      player0El.classList.add("player--winner");
      diceEl.classList.add("hidden");
      winner.textContent = "Player 1 is the winner";
      playing = false;
    } else if (playerScr1.textContent >= 100) {
      player1El.classList.add("player--winner");
      winner.textContent = "Player 2 is the winner";
      playing = false;
      diceEl.classList.add("hidden");
    }
    console.log(playerScr0.textContent, playerScr1.textContent);
  }
});

newBtn.addEventListener("click", function () {
  winner.textContent = "";
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");
  current0El.textContent = 0;
  current1El.textContent = 0;
  playerScr1.textContent = 0;
  playerScr0.textContent = 0;
  playing = true;
});
