// https://www.reddit.com/r/perfectloops/comments/bzbgh4/i_cant_stop_watching/

import Game from "./Game";

const DISPLAY_RADIUS = 250;
const RING_COUNT = 50;
const ROT_FACTOR = 1;
const ROT_SPEED = (Math.PI / 180) * 3.422;

document.addEventListener("DOMContentLoaded", () => {
  const rotationsTextElement: HTMLParagraphElement = document.querySelector(
    "#angle-display"
  );
  const speedTextElement: HTMLParagraphElement = document.querySelector(
    "#speed-display"
  );
  const canvas = document.querySelector("canvas");
  const game = new Game(
    canvas,
    DISPLAY_RADIUS,
    ROT_FACTOR,
    ROT_SPEED,
    RING_COUNT,
    0,
    (rotations: number) => {
      const truncated = Math.floor(rotations * 1000) / 1000;
      rotationsTextElement.innerText = `${truncated}`;
    }
  );

  const textInput: HTMLInputElement = document.querySelector("#text");
  const speedSlider: HTMLInputElement = document.querySelector("#speed");
  document.querySelector("#set-angle").addEventListener("submit", e => {
    e.preventDefault();
    let value = parseFloat(textInput.value) * Math.PI * 2;
    if (isNaN(value)) {
      textInput.value = "";
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
  document.querySelector("#fullscreen").addEventListener("click", () => {
    openFullscreen(canvas)
  })
  document.querySelector("#tick").addEventListener("click", () => {
    game.tick();
    game.draw();
  });
  document.querySelector("#speed").addEventListener("input", e => {
    const degPerFrame = parseFloat(speedSlider.value) ** 2;
    const radiansPerFrame = degPerFrame * (Math.PI / 180);
    const truncated = Math.floor(degPerFrame * 1000) / 1000;
    speedTextElement.innerText = `${truncated}`;
    game.setSpeed(radiansPerFrame);
  });
});


function openFullscreen(elem: any) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}