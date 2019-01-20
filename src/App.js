import React, { Component } from 'react';
import './App.css';
import faker from 'faker';

const users = [];
for (let i = 0; i < 5; i++) {
  users.push(faker.name.firstName() + " " + faker.name.lastName());
}
// const users = [
//   'Voislav Mishevski',
//   'Blagoj Janev',
//   'Aleksandra Vinokikj',
//   'Ivan Klandev',
//   'Aleksandra Koceva'
// ];

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {entering: true};
    this._animate();
  }
  render() {
    const {entering} = this.state;

    return (
      <li style={{'animationDuration': `${this.props.speed}ms`}} className={entering ? 'winner' : 'almost-winner'}>{this.props.name}</li>
    )
  }

  componentWillReceiveProps() {
    console.log('receive props', this.props);
    this._animate();
  }

  _animate() {
    this.setState({entering: true});
    setTimeout(() => {
      this.setState({entering: false});
    }, this.props.speed);
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    const winnerIndex = Math.round(users.length/2);
    const winner = users[winnerIndex]
    this.state = {
      users: users,
      winner: null,
      potentialWinner: winner,
      speed: 250,
      started: false,
    };

    document.addEventListener('keyup', () => this.toggleStarted());
  }

  render() {
    const {winner, potentialWinner, speed, started} = this.state;

    return (
      <div className="App">
        <div>
          <button onClick={this.toggleStarted}>{started ? 'Stop' : 'Start'}</button>
        </div>
        {started && <ul className="App-all-users">
          <User name={potentialWinner} winner={true} speed={speed/2}></User>
        </ul>}
        {winner && (
          <div>Winner is {winner}</div>
        )}
      </div>
    );
  }

  toggleStarted = () => {
    clearTimeout(this.winnerTickTimeout);
    
    const {started} = this.state;
    const toggledState = !started;
    if (!started) {
      this.changePotentialWinner();
      this.winnerTick();
    }

    if (!toggledState) {
      this.setWinner();
    }
    
    this.setState({
      ...this.state,
      started: toggledState
    });
  }

  winnerTick() {
    this.winnerTickTimeout = setTimeout(() => {
      this.changePotentialWinner();
      this.winnerTick();
    }, this.state.speed);
  }

  changePotentialWinner() {
    const currentWinner = this.state.potentialWinner;
    const currentWinnerIndex = this.state.users.indexOf(currentWinner);
    const nextWinnerIndex = currentWinnerIndex === (this.state.users.length -1) ? 0 : (currentWinnerIndex + 1);
    
    this.setState({
      ...this.state,
      potentialWinner: this.state.users[nextWinnerIndex]
    });
  }

  setWinner() {
    this.setState({
      winner: this.state.potentialWinner
    });
  }
}

export default App;
