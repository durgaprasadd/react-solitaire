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
    return this.getLastCard().getUnicode();
  }
  isDraggable() {
    return this.cards.length > 1;
  }
}

export default Pile;