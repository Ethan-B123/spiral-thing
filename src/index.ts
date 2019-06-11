// https://www.reddit.com/r/perfectloops/comments/bzbgh4/i_cant_stop_watching/

import Ring from "./Ring";

const DISPLAY_RADIUS = 250;
const RING_COUNT = 100;
const ROT_FACTOR = 1.04;
const ROT_SPEED = Math.PI / 180;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const rings: Ring[] = [];

  for (let i = 1; i <= RING_COUNT; i++) {
    const radius = (i / RING_COUNT) * DISPLAY_RADIUS;
    const rotationFactor = (i / RING_COUNT) * ROT_FACTOR;
    rings.push(new Ring(radius, rotationFactor, { x: 300, y: 300 }));
  }

  rings.forEach(ring => {
    ring.draw(ctx);
  });

  let currentAng: number = 0;
  loop();

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentAng += ROT_SPEED;
    rings.forEach(ring => {
      ring.update(currentAng);
    });
    rings.forEach(ring => {
      ring.draw(ctx);
    });
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(300, 300);
    rings
      .map(ring => ring.pointPos)
      .forEach(({ x, y }) => {
        ctx.lineTo(x, y);
      });
    ctx.moveTo(300, 300);
    ctx.closePath();
    ctx.strokeStyle = "#000f";
    ctx.stroke();
    ctx.restore();
  }
});
