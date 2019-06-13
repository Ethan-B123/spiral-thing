import RingGroup from "./RingGroup";

class Game {
  private looping: boolean = false;
  private forward: boolean = true;
  private frame: number;
  private ringGroup: RingGroup;
  constructor(
    private canvas: HTMLCanvasElement,
    displayRadius: number,
    rotFactor: number,
    rotSpeed: number,
    ringCount: number,
    currentAng: number = 0
  ) {
    this.loop = this.loop.bind(this);
    this.ringGroup = new RingGroup(
      displayRadius,
      rotFactor,
      rotSpeed,
      ringCount,
      currentAng
    );
    this.play();
  }

  setSpeed(radiansPerFrame: number) {
    this.ringGroup.setRotSpeed(radiansPerFrame);
  }

  setAngle(angle: number) {
    this.ringGroup.setAngle(angle);
  }

  reverse() {
    this.forward = false;
    if (this.looping) return;
    this.looping = true;
    this.frame = requestAnimationFrame(this.loop);
  }

  play() {
    this.forward = true;
    if (this.looping) return;
    this.looping = true;
    this.frame = requestAnimationFrame(this.loop);
  }

  pause() {
    if (this.looping) {
      this.looping = false;
      cancelAnimationFrame(this.frame);
    } else {
      this.looping = true;
      this.frame = requestAnimationFrame(this.loop);
    }
  }

  tick() {
    if (this.forward) {
      this.ringGroup.tick();
    } else {
      this.ringGroup.untick();
    }
  }

  draw() {
    this.ringGroup.draw(this.canvas);
  }

  private loop() {
    this.frame = requestAnimationFrame(this.loop);
    this.tick();
    this.draw();
  }
}

export default Game;
