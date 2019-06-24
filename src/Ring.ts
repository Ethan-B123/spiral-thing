class Ring {
  currentAng: number = 0;
  pointPos: vector = { x: 0, y: 0 };

  constructor(
    public radius: number,
    public rotationFactor: number,
    public center: vector
  ) {
    this.update(this.currentAng);
  }

  update(newAng: number): vector {
    this.currentAng = newAng;
    const rotatedAng = newAng * this.rotationFactor;
    const x = Math.cos(rotatedAng) * this.radius + this.center.x;
    const y = Math.sin(rotatedAng) * this.radius + this.center.y;
    this.pointPos = { x, y };
    return { x, y };
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = dpr;
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "#000f";
    ctx.beginPath();
    ctx.arc(this.pointPos.x, this.pointPos.y, 1, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

export default Ring;
