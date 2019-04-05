class Game {
  constructor() {
    this.deck = null;
    this.emptyPiles = [];
    this.showCardPile = null;
  }
  addShuffledPile(pile) {
    this.deck = pile;
  }
  addEmptyPile(pile) {
    this.emptyPiles.push(pile);
  }
  setShowCardPile(pile) {
    this.showCardPile = pile;
  }
  changeCard() {
    this.showCardPile.addCard(this.deck.drawCard());
  }
  getEmptyPileUnicode() {
    return this.emptyPile.getLastCard().getUnicode();
  }
  getShowCardUnicode() {
    return this.showCardPile.getLastCard().getUnicode();

  }
  addCardToPile(id, des) {
    if (des === "showCard") {
      this.emptyPiles[id].addCard(this.showCardPile.drawCard());
      return;
    }
    this.emptyPiles[id].addCard(this.emptyPiles[des].drawCard())
  }
  isDraggable() {
    return this.showCardPile.cards.length > 1;
  }
}

export default Game;