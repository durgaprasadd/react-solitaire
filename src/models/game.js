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
    des = des.split("_")
    if (des.includes("showCard"))
      return this.reservedPiles[id].addCard(this.showCardPile.drawCard());
    if (des.includes("reserved"))
      return this.reservedPiles[id].addCard(this.reservedPiles[des[1]].drawCard());
    return this.reservedPiles[id].addCard(this.stackPiles[des[1]].drawCard())
  }
  addCardToStackPile(id, des) {
    des = des.split("_");
    if (des.includes("showCard"))
      return this.stackPiles[id].addCard(this.showCardPile.drawCard());
    if (des.includes("reserved"))
      return this.stackPiles[id].addCard(this.reservedPiles[des[1]].drawCard());
    return this.stackPiles[id].addCard(this.stackPiles[des[1]].drawCard())
  }

  isDraggable(pile) {
    return pile.isDraggable();
  }
}

export default Game;