class Cell {
  constructor(value) {
    if(value === null) {
      this.value = floor(random(2));
    } else {
      this.value = value;
    }
  }
}