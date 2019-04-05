import React, { Component } from 'react';
import { Cards, EmptyCard, Default } from './cardsData/cards'
import Card from './models/card'
import './App.css';
import Pile from './models/pile';
import Game from './models/game';
import lodash from 'lodash';

const defaultCard = new Card(Default);
const emptyCard = new Card(EmptyCard);

class App extends Component {
  constructor(props) {
    super(props);
    this.class = "hide";
    this.state = { game: this.initializeGame() };
  }

  initializePile() {
    const pile = new Pile();
    const shuffledCards = lodash.shuffle(Cards);
    shuffledCards.forEach(card => pile.addCard(new Card(card)));
    return pile;
  }

  initializeReservedPiles(game, range) {
    for (let index = 0; index < range; index++) {
      game.addReservedPile(this.initPile());
    }
  }

  initializeStackPiles(game, range) {
    for (let index = 0; index < range; index++) {
      game.addStackPile(new Pile);
    }
  }
  initializeGame() {
    const game = new Game();
    game.addShuffledPile(this.initializePile());
    this.initializeReservedPiles(game, 4);
    this.initializeStackPiles(game, 7);
    game.setShowCardPile(this.initPile())
    return game;
  }

  initPile() {
    const pile = new Pile();
    pile.addCard(emptyCard);
    return pile;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }


  dropInReservedPile(ev) {
    ev.preventDefault();
    const id = ev.target.id;
    const data = ev.dataTransfer.getData("text");
    this.setState(state => {
      const { game } = state;
      game.addCardToReservedPile(id, data)
      return { game }
    })
  }

  dropInStackPile(id, ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    this.setState(state => {
      const { game } = state;
      game.addCardToStackPile(id, data)
      return { game }
    })
  }

  changeCard() {
    this.setState(state => {
      const { game } = state;
      game.changeCard();
      return { game };
    })
  }

  showRandomCard() {
    const id = this.state.game.getShowCardUnicode();
    return <div id="showCard" className="card" draggable={this.state.game.showCardPile.isDraggable()} onDragStart={this.drag}>{id}</div>;
  }

  showAllReservedPiles() {
    const piles = this.state.game.reservedPiles;
    return piles.map((pile, index) => {
      return <div className="card" id={index} onDrop={this.dropInReservedPile.bind(this)} onDragOver={this.allowDrop} draggable={pile.isDraggable()} onDragStart={this.drag}>{pile.getUnicode()}</div>
    })
  }

  showAllStackCards(pile) {
    if (pile.cards.length == 0) return <div className="card">{emptyCard.getUnicode()}</div>
    return pile.cards.map(card => <div className="card">{card.getUnicode()}</div>)
  }

  showAllStackPiles() {
    const piles = this.state.game.stackPiles;
    return piles.map((pile, index) => {
      return <div id={index} onDrop={this.dropInStackPile.bind(this, index)} onDragOver={this.allowDrop.bind(this)} draggable={pile.isDraggable()} onDragStart={this.drag.bind(this)}>{this.showAllStackCards(pile)}</div>
    })
  }
  printCard() {
    return <div>
      <div className="main">
        <div className="deck">
          <div className="card" onClick={this.changeCard.bind(this)}>{defaultCard.getUnicode()}</div>
          {this.showRandomCard()}
        </div>
        <div className="deck">
          {this.showAllReservedPiles()}
        </div>
      </div>
      <div className="stackPile">
        {this.showAllStackPiles()}
      </div>
    </div>;
  }
  render() {
    return this.printCard();
  }
}

export default App;
