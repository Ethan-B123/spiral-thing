import Ring from "./Ring";

class RingGroup {
  private rings: Ring[] = [];
  private center: vector = { x: 300, y: 300 };
  constructor(
    private displayRadius: number,
    private rotFactor: number,
    private rotSpeed: number,
    private ringCount: number,
    private _currentAng: number = 0
  ) {
    this.createRings();
  }

  get currentAng() {
    return this._currentAng;
  }

  updateRingSize(newCanvasSize: vector) {
    this.center = {
      x: newCanvasSize.x / 2,
      y: newCanvasSize.y / 2
    };
    const minDim =
      newCanvasSize.x < newCanvasSize.y ? newCanvasSize.x : newCanvasSize.y;
    this.displayRadius = minDim / 2 - 3;
    this.createRings();
  }

  tick() {
    this._currentAng += this.rotSpeed;
    this.updateRings();
  }

  untick() {
    this._currentAng -= this.rotSpeed;
    this.updateRings();
  }

  setRingCount(newRingCount: number) {
    this.createRings(newRingCount);
    this.updateRings();
  }

  setAngle(newAngleRad: number) {
    this._currentAng = newAngleRad;
    this.updateRings();
  }

  setRotSpeed(newRotSpeed: number) {
    this.rotSpeed = newRotSpeed;
  }

  draw(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.rings.forEach(ring => ring.draw(ctx));

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.rings[0].pointPos.x, this.rings[0].pointPos.y);
    this.rings
      .map(ring => ring.pointPos)
      .forEach(({ x, y }) => {
        ctx.lineTo(x, y);
      });
    ctx.moveTo(this.rings[0].pointPos.x, this.rings[0].pointPos.y);
    ctx.closePath();
    ctx.lineWidth = dpr;
    ctx.strokeStyle = "#000f";
    ctx.stroke();
    ctx.restore();
  }

  private createRings(newRingCount: number = this.ringCount) {
    this.ringCount = newRingCount;
    this.rings = [];
    for (let i = 1; i < this.ringCount; i++) {
      const radius = (i / this.ringCount) * this.displayRadius;
      const rotationFactor = // (i / this.ringCount) * this.rotFactor;
        ((this.ringCount - i) / this.ringCount) * this.rotFactor;
      this.rings.push(
        new Ring(radius, rotationFactor, { x: this.center.x, y: this.center.y })
      );
    }
  }

  updateRings() {
    this.rings.forEach(ring => ring.update(this._currentAng));
  }
}

export default RingGroup;
