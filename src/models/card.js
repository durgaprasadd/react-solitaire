class Card {
  constructor({ type, color, number, unicode }) {
    this.type = type;
    this.color = color;
    this.number = number;
    this.unicode = unicode;
  }
  getUnicode() {
    return this.unicode;
  }
}

export default Card;