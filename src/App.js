import React, { Component } from 'react';
import './App.css';
import faker from 'faker';
import { timer, interval } from 'rxjs';
import { take, tap, finalize } from 'rxjs/operators';

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

const USE_DELAYED_STOP = true;
const INITIAL_SPEED = 250;

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

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this._animate();
    }
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
      winners: [],
      potentialWinner: winner,
      speed: INITIAL_SPEED,
      started: false,
      stopping: false
    };

    document.addEventListener('keyup', () => this.toggleStarted());
  }

  render() {
    const {winners, potentialWinner, speed, started} = this.state;

    return (
      <div className="App">
        <div>
          <button onClick={this.toggleStarted}>{started ? 'Stop' : 'Start'}</button>
        </div>
        {started && <ul className="App-all-users">
          <User name={potentialWinner} winner={true} speed={speed/2}></User>
        </ul>}
        {!!winners.length && (
          <div>
            <div>Winners:</div>
            {winners.map(winner => <div>{winner}</div>)}
          </div>
        )}
      </div>
    );
  }

  toggleStarted = () => {
    if (this.state.stopping) {
      return;
    }

    clearTimeout(this.winnerTickTimeout);
    
    const {started} = this.state;
    const toggledState = !started;

    if (!started) {
      this.changePotentialWinner();
      this.winnerTick();
      this.setState({
        started: toggledState
      });
    }

    if (!toggledState) {
      if (!USE_DELAYED_STOP) {
        this.setWinner();
        
      } else {
        this.delayedStop();
      }
    }
  }

  winnerTick = () => {
    console.log('next tick in', this.state.speed);
    this.winnerTickTimeout = setTimeout(() => {
      this.changePotentialWinner();
      this.winnerTick();
    }, this.state.speed);
  }

  changePotentialWinner = () => {
    const currentWinner = this.state.potentialWinner;
    const currentWinnerIndex = this.state.users.indexOf(currentWinner);
    const nextWinnerIndex = currentWinnerIndex === (this.state.users.length -1) ? 0 : (currentWinnerIndex + 1);
    
    this.setState({
      potentialWinner: this.state.users[nextWinnerIndex]
    });
  }

  setWinner = () => {
    this.setState((state) => {
      return {
        winners: [...state.winners, state.potentialWinner],
        started: false,
        stopping: false,
        users: state.users.filter(u => u === state.potentialWinner),
        speed: INITIAL_SPEED
      }
    });
  }

  delayedStop = () => {
    clearTimeout(this.winnerTickTimeout);
    this.setState({
      stopping: true
    });

    this.decreeseSpeed();
    this.winnerTick();

  }

  decreeseSpeed = () => {
    const lastSpeed = 2000;
    const countOfNextIterations = 10;
    const increase = (lastSpeed - INITIAL_SPEED) / countOfNextIterations;
    
    interval(500).pipe(
      take(countOfNextIterations),
      tap(() => {
        console.log('ddd')
        this.setState((state) => ({speed: state.speed + increase}));
      }),
      finalize(() => {
        clearTimeout(this.winnerTickTimeout);
        this.setWinner();
      })
    )
    .subscribe(() => {
      console.log('decreesing speed');
    });

  }

}

export default App;
