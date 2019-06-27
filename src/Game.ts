import RingGroup from "./RingGroup";
import { dimensions } from "./helperFunctions";

class Game {
  private looping: boolean = false;
  private forward: boolean = true;
  private frame: number;
  private resizeFrame: number;
  private ringGroup: RingGroup;
  private dims: vector = { x: -1, y: -1 };
  constructor(
    private canvas: HTMLCanvasElement,
    displayRadius: number,
    rotFactor: number,
    rotSpeed: number,
    ringCount: number,
    currentAng: number,
    public onTick: (rotationCount: number) => void
  ) {
    this.loop = this.loop.bind(this);
    this.ringGroup = new RingGroup(
      displayRadius,
      rotFactor,
      rotSpeed,
      ringCount,
      currentAng
    );
    this.resizeLoop();
    this.play();
  }

  resizeLoop = () => {
    this.resizeFrame = requestAnimationFrame(this.resizeLoop);
    this.draw();
    this.resize();
  };

  get rotationCount() {
    return this.ringGroup.currentAng / Math.PI / 2;
  }

  resize() {
    const dims = dimensions(this.canvas);
    const dpr = window.devicePixelRatio || 1;
    dims.x *= dpr;
    dims.y *= dpr;
    if (dims.x === this.dims.x && dims.y === this.dims.y) return;
    this.canvas.width = dims.x;
    this.canvas.height = dims.y;
    this.dims = dims;
    this.ringGroup.updateRingSize(dims);
    this.ringGroup.updateRings();
  }

  setRingCount(newRingCount: number) {
    this.ringGroup.setRingCount(newRingCount)
  }

  setSpeed(radiansPerFrame: number) {
    this.ringGroup.setRotSpeed(radiansPerFrame);
  }

  setAngle(angle: number) {
    this.ringGroup.setAngle(angle);
    this.onTick(this.rotationCount);
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
    this.onTick(this.rotationCount);
  }

  draw() {
    this.ringGroup.draw(this.canvas);
  }

  private loop() {
    this.frame = requestAnimationFrame(this.loop);
    this.tick();
  }
}

export default Game;
