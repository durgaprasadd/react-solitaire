class Game {
  constructor() {
    this.deck = null;
    this.reservedPiles = [];
    this.showCardPile = null;
    this.stackPiles = [];
  }
  addShuffledPile(pile) {
    this.deck = pile;
  }
  addReservedPile(pile) {
    this.reservedPiles.push(pile);
  }
  addStackPile(pile) {
    this.stackPiles.push(pile);
  }
  setShowCardPile(pile) {
    this.showCardPile = pile;
  }
  changeCard() {
    this.showCardPile.addCard(this.deck.drawCard());
  }

  drawCard() {
    return this.deck.drawCard();
  }

  getTopMostCard() {
    return this.showCardPile.getLastCard();

  }
  addCardToReservedPile(id, des) {
    if (des === "showCard") {
      this.reservedPiles[id].addCard(this.showCardPile.drawCard());
      return;
    }
    this.reservedPiles[id].addCard(this.reservedPiles[des].drawCard())
  }
  addCardToStackPile(id, des) {
    if (des === "showCard") {
      this.stackPiles[id].addCard(this.showCardPile.drawCard());
      return;
    }
    this.stackPiles[id].addCard(this.stackPiles[des].drawCard())
  }

  isDraggable(pile) {
    return pile.isDraggable();
  }
}

export default Game;