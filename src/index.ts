// https://www.reddit.com/r/perfectloops/comments/bzbgh4/i_cant_stop_watching/

import Game from "./Game";

const DISPLAY_RADIUS = 250;
const RING_COUNT = 100;
const ROT_FACTOR = 1; // turns out this is dumb
const ROT_SPEED = Math.PI / 180;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const game = new Game(
    canvas,
    DISPLAY_RADIUS,
    ROT_FACTOR,
    ROT_SPEED,
    RING_COUNT,
    0
  );

  const input: HTMLInputElement = document.querySelector("#text");
  document.querySelector("#set-angle").addEventListener("submit", (e) => {
    e.preventDefault();
    let value = parseFloat(input.value) * Math.PI * 2;
    if (isNaN(value)) {
      input.value = "";
    } else {
      game.setAngle(value);
      game.draw();
    }
  });
  document.querySelector("#play").addEventListener("click", () => {
    game.play();
  });
  document.querySelector("#pause").addEventListener("click", () => {
    game.pause();
  });
  document.querySelector("#reverse").addEventListener("click", () => {
    game.reverse();
  });
  document.querySelector("#tick").addEventListener("click", () => {
    game.tick();
    game.draw();
  });
});
