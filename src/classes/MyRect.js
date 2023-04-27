class MyRect {
  constructor() {
    this.px = pwinMouseX - (pwinMouseX % resolution);
    this.py = pwinMouseY - (pwinMouseY % resolution);
    this.x = winMouseX - (winMouseX % resolution);
    this.y = winMouseY - (winMouseY % resolution);
  }
  show() {
    fill(255);
    rect(this.px, this.py, resolution, resolution);
  }
}