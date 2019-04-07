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