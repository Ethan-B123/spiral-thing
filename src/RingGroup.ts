import Ring from "./Ring";

class RingGroup {
  private rings: Ring[] = [];
  constructor(
    private displayRadius: number,
    private rotFactor: number,
    private rotSpeed: number,
    private ringCount: number,
    private _currentAng: number = 0
  ) {
    this.createRings();
  }

  get currentAng () {
    return this._currentAng;
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

  draw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.rings.forEach(ring => ring.draw(ctx));

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(300, 300);
    this.rings
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

  private createRings(newRingCount: number = this.ringCount) {
    this.ringCount = newRingCount;
    this.rings = [];
    for (let i = 1; i <= this.ringCount; i++) {
      const radius = (i / this.ringCount) * this.displayRadius;
      const rotationFactor = (i / this.ringCount) * this.rotFactor;
      this.rings.push(new Ring(radius, rotationFactor, { x: 300, y: 300 }));
    }
  }

  private updateRings() {
    this.rings.forEach(ring => ring.update(this._currentAng));
  }
}

export default RingGroup;
