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

  initializeGame() {
    const game = new Game();
    game.addShuffledPile(this.initializePile());
    game.addEmptyPile(this.initPile());
    game.addEmptyPile(this.initPile());
    game.addEmptyPile(this.initPile());
    game.addEmptyPile(this.initPile());
    const pile1 = new Pile();
    pile1.addCard(emptyCard);
    game.setShowCardPile(pile1)
    return game;
  }

  initPile() {
    const pile = new Pile();
    pile.addCard(emptyCard);
    return pile;
  }
  showCard() {
    this.class = "card";
    this.randomCard = this.pile.getRandomCard();
    this.setState(state => state);
  }

  dragfunc(event) {
    event.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }


  drop(ev) {
    ev.preventDefault();
    const id = ev.target.id;
    const data = ev.dataTransfer.getData("text");
    this.setState(state => {
      const { game } = state;
      game.addCardToPile(id, data)
      return { game }
    }

    )
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
    return <div id="showCard" className="card" draggable={this.state.game.isDraggable()} onDragStart={this.drag.bind(this)}>{id}</div>;
  }
  showAllEmptyPiles() {
    const piles = this.state.game.emptyPiles;
    return piles.map((pile, index) => {
      return <div className="card" id={index} onDrop={this.drop.bind(this)} onDragOver={this.dragfunc.bind(this)} draggable={pile.isDraggable()} onDragStart={this.drag.bind(this)}>{pile.getUnicode()}</div>
    })
  }
  printCard() {
    return <div className="main">
      <div className="deck">
        <div className="card" onClick={this.changeCard.bind(this)}>{defaultCard.getUnicode()}</div>
        {this.showRandomCard()}
      </div>
      <div className="deck">
        {this.showAllEmptyPiles()}
      </div>
    </div>;
  }
  render() {
    return this.printCard();
  }
}

export default App;
