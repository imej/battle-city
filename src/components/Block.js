class Block {
  constructor({position}) {
    this.position = position;
    this.delete = false;
  }

  die() {
    this.delete = true;
  }

  render(state) {
    const context = state.context;
    context.drawImage(this.ref, this.position.x, this.position.y);
  }
}

export default Block;