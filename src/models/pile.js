class Pile {
  constructor() {
    this.cards = [];
  }
  addCard(card) {
    this.cards.push(card);
  }
  addCards(cards) {
    cards.forEach(card => this.addCard(card));
  }
  getLastCard() {
    return this.cards[this.cards.length - 1];
  }
  drawCard() {
    return this.cards.pop();
  }
  drawCards(noOfCards) {
    let result = new Array(noOfCards).fill(1);
    result = result.map(x => this.drawCard());
    result.reverse();
    return result;
  }
  isDraggable() {
    return this.cards.length > 0;
  }
  blockLastCard() {
    this.getLastCard().blockCard();
  }
  revealLastCard() {
    this.getLastCard().revealCard();
  }
}

export default Pile;