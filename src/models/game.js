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

  reloadDeck() {
    if (this.showCardPile.isEmpty()) return;
    this.deck.addCard(this.showCardPile.drawCard());
    return this.reloadDeck();
  }

  changeCard() {
    if (this.deck.isEmpty()) {
      return this.reloadDeck()
    }
    this.showCardPile.addCard(this.drawCard());
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
      return this.addCardToReservedPileFromWaste(id);
    if (des.includes("stackPile"))
      // return this.reservedPiles[id].addCard(this.reservedPiles[des[1]].drawCard());
      return this.addCardToFoundationFromTableau(id, des[1], +des[2]);
    // return this.reservedPiles[id].addCard(this.stackPiles[des[1]].drawCard())
  }

  addCardToStackPile(id, des) {
    des = des.split("_");
    if (des.includes("showCard"))
      return this.addCardToStackPileFromWaste(id);
    if (des.includes("reserved"))
      return this.addCardToStackPileFromFoundation(id, des[1]);
    // return this.stackPiles[id].addCards(this.stackPiles[des[1]].drawCards(+des[2]))
    return this.addCardToTableauFromTableau(id, des[1], +des[2]);
  }

  addCardToStackPileFromWaste(id) {
    const pile = this.stackPiles[id];
    const srcPile = this.showCardPile;
    const isAddable = pile.isAddableToStackPile(srcPile.getLastCardValue());
    const isAlternateColor = pile.isAlternateColor(srcPile.getLastCardColor());
    if (isAddable && isAlternateColor) {
      pile.addCard(srcPile.drawCard())
    }
  }

  addCardToReservedPileFromWaste(id) {
    const pile = this.reservedPiles[id];
    const srcPile = this.showCardPile;
    const isAddable = pile.isAddableToReservedPile(srcPile.getLastCardValue());
    const isSameSuit = pile.isSameSuit(srcPile.getLastCardSuit());
    if (isAddable && isSameSuit) {
      pile.addCard(srcPile.drawCard())
    }
  }

  addCardToStackPileFromFoundation(id, des) {
    const pile = this.stackPiles[id];
    const srcPile = this.reservedPiles[des];
    const isAddable = pile.isAddableToStackPile(srcPile.getLastCardValue());
    const isAlternateColor = pile.isAlternateColor(srcPile.getLastCardColor());
    if (isAddable && isAlternateColor) {
      pile.addCard(srcPile.drawCard());
    }
  }

  addCardToFoundationFromTableau(id, des, noOfCards) {
    if (noOfCards > 1)
      return false;
    const pile = this.reservedPiles[id];
    const srcPile = this.stackPiles[des];
    const isAddable = pile.isAddableToReservedPile(srcPile.getLastCardValue());
    const isSameSuit = pile.isSameSuit(srcPile.getLastCardSuit());
    if (isAddable && isSameSuit) {
      pile.addCard(srcPile.drawCard())
    }
  }

  addCardToTableauFromTableau(id, des, noOfCards) {
    const pile = this.stackPiles[id];
    const srcPile = this.stackPiles[des];
    const isAddable = pile.isAddableToStackPile(srcPile.getCardValue(noOfCards));
    const isAlternateColor = pile.isAlternateColor(srcPile.getCardColor(noOfCards));
    if (isAddable && isAlternateColor)
      pile.addCards(srcPile.drawCards(noOfCards));
  }

  isDraggable(pile) {
    return pile.isDraggable();
  }
}

export default Game;