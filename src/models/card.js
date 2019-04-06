class Card {
  constructor({ type, color, number, unicode }) {
    this.type = type;
    this.color = color;
    this.number = number;
    this.unicode = unicode;
    this.actualUnicode = unicode;
    this.actualColor = color;
  }
  getUnicode() {
    return this.unicode;
  }
  blockCard() {
    this.unicode = "\u{1F0A0}";
    this.color = "black";
  }
  revealCard() {
    this.unicode = this.actualUnicode;
    this.color = this.actualColor;
  }
}

export default Card;