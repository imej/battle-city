class Block {
  constructor({position}) {
    this.position = position;
    this.delete = false;
    this.breakable = true;
  }

  die() {
    this.delete = this.breakable ? true : false;
  }

  render(state) {
    const context = state.context;
    context.drawImage(this.ref, this.position.x, this.position.y);
  }
}

export default Block;