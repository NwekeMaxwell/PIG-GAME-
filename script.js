"use strict";
//selecting elements
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn-Roll");
const btnHold = document.querySelector(".btn-Hold");
const btnNew = document.querySelector(".btn-New");
let currentValue1 = document.querySelector(".current-value--0");
let currentValue2 = document.querySelector(".current-value--1");
let mainscore0 = document.querySelector(".main-score--0");
let mainscore1 = document.querySelector(".main-score--1");
let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");
const myaudio = document.querySelector(".myaudio");
//initial settings
let currentScore, active, scores, playing;
const init = function () {
  diceEl.classList.add("hidden");
  currentScore = 0;
  mainscore0.textContent = `$${0}`;
  mainscore1.textContent = `$${0}`;
  active = 0;
  scores = [0, 0];
  playing = true;
  currentValue1.textContent = `$${0}`;
  currentValue2.textContent = `$${0}`;
  player1.classList.remove("player-wins");
  player2.classList.remove("player-wins");
  player1.classList.add("player-active");
  player2.classList.remove("player-active");
  document.querySelector(`.main-name--0`).textContent = "PLAYER 1";
  document.querySelector(`.main-name--1`).textContent = "PLAYER 2";
  myaudio.play();
};
init();
//functions
const switchPlayer = function () {
  document.querySelector(`.current-value--${active}`).textContent = `$${0}`;
  currentScore = 0;
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
  active = active === 0 ? 1 : 0;
};
const rolldice = function () {
  diceEl.classList.remove("hidden");
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `../img/dice-${dice}.png`;
  //add and display score on current score
  if (dice != 1) {
    currentScore += dice;
    document.querySelector(
      `.current-value--${active}`
    ).textContent = `$${currentScore}`;
  } else {
    //switchplayer
    switchPlayer();
  }
};
const closure = function () {
  story.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const holdScore = function () {
  scores[active] += currentScore;
  document.querySelector(
    `.main-score--${active}`
  ).textContent = `$${scores[active]}`;
  if (scores[active] >= 100) {
    document.querySelector(`.main-name--${active}`).textContent = "WINNER 🏆";
    diceEl.classList.add("hidden");
    document.querySelector(`.player--${active}`).classList.add("player-wins");
    document
      .querySelector(`.player--${active}`)
      .classList.remove("player-active");
    playing = false;
  } else {
    //switchplayer
    switchPlayer();
  }
};
//audio functions
const playAudio = function () {
  myaudio.play();
};
const pauseAudio = function () {
  myaudio.pause();
};

// dice roll click event
btnRoll.addEventListener("click", function () {
  if (playing) {
    rolldice();
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    holdScore();
  }
});
//reset
btnNew.addEventListener("click", init);
//how to play button
const story = document.querySelector(".story");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".close");
const btnHowToPlay = document.querySelector(".how");
//initial settings
story.classList.add("hidden");
overlay.classList.add("hidden");
//how to play button toggle action
btnHowToPlay.addEventListener("click", function () {
  story.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
//overlay close action
overlay.addEventListener("click", function () {
  closure();
});

//keyboard event
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "i") {
    closure();
  }
  if (e.key === "z" || e.key === "n") {
    init();
  }
  if (e.key === "d" || e.key === "r") {
    rolldice();
  }
  if (e.key === "h" || e.key === "b") {
    holdScore();
  }
  if (e.key === "s") {
    playAudio();
  }
  if (e.key === "p") {
    pauseAudio();
  }
});
//audio icon and switch
const offSound = document.querySelector(".audio");
offSound.addEventListener("click", function () {
  pauseAudio();
});
