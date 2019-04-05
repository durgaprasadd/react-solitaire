class Pile {
  constructor() {
    this.cards = [];
  }
  addCard(card) {
    this.cards.push(card);
  }
  getLastCard() {
    return this.cards[this.cards.length - 1];
  }
  drawCard() {
    return this.cards.pop();
  }
  getUnicode() {
    if (this.getLastCard())
      return this.getLastCard().getUnicode();
  }
  isDraggable() {
    return this.cards.length > 0;
  }
}

export default Pile;