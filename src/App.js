import React, { Component } from 'react';
import './App.css';
import { interval } from 'rxjs';
import { take, tap, finalize } from 'rxjs/operators';
import ReImagineLogo from './ReImagine.png';
import { Uploader, CANDIDATES_STORAGE_KEY } from './Uploader';

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
    setTimeout(() => this.setState({entering: true}));
    setTimeout(() => {
      this.setState({entering: false});
    }, this.props.speed);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let usersStr = localStorage.getItem(CANDIDATES_STORAGE_KEY);
    if (!usersStr) {
      usersStr = "[]";
    }
    const users = JSON.parse(usersStr);
    const winnerIndex = Math.round(users.length/2);
    const winner = users[winnerIndex]
    this.setState({
      users: users,
      winners: [],
      potentialWinner: winner,
      speed: INITIAL_SPEED,
      started: false,
      stopping: false,
    });

    document.addEventListener('keyup', this.onKeySpaceEnter);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeySpaceEnter);
  }

  render() {
    const {winners, potentialWinner, speed, started, starting} = this.state;

    let btnClass = started ? 'btn btn-stop' : 'btn btn-start';
    if (starting) {
      btnClass += ' fade-out';
    }

    const renderUpload = window.location.pathname === "/config";

    return (
      <div className="App">
      {renderUpload && <Uploader />}
      {!renderUpload && (
        <div>
          <div>
            {!started && <button type="button" className={btnClass} onClick={this.toggleStarted}>
              <h3>{started ? 'Stop' : 'Start'}</h3>
            </button>}
          </div>
          <div className="">
            {started && <ul className="App-all-users">
              <User name={potentialWinner} winner={true} speed={speed/2}></User>
            </ul>}
          </div>
          {!!winners.length && (
            <div>
              <div>Winners:</div>
              {winners.map(winner => <div key={winner}>{winner}</div>)}
            </div>
          )}
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
        users: state.users.filter(u => u !== state.potentialWinner),
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

  onKeySpaceEnter = (event) => {
    // only on space
    if (event.keyCode === 32) {
      this.setState({starting: true});
      setTimeout(this.toggleStarted, 1000);
    }
  }

}

export default App;
