import React from 'react';
import { flatten } from 'lodash';
import './Uploader.css';

export const CANDIDATES_STORAGE_KEY = 'reimagine:candidates';

export class Uploader extends React.Component {
  constructor(props) {
    super(props);
    let usersStr = localStorage.getItem(CANDIDATES_STORAGE_KEY);
    if (!usersStr) {
      usersStr = "[]";
    }
    const users = JSON.parse(usersStr);

    this.state = {done: false, candidates: users};
  }

  render() {
    const {done, candidates} = this.state;
    return (
      <div className="Uploader">
        <label>
          Set candidates
          <input type="file" onChange={(ev) => this.uploadFile(ev)} />
        </label>
        <div className="Uploader-back"><a href="/">Go back</a></div>
        {done && <span className="Uploader-success-msg">Candidates set!</span>}
        <div className="Uploader-candidates">Current candidates:</div>
        {candidates.map(candidate => <div key={candidate} className="Uploader-candidate">{candidate}</div>)}
      </div>
    )
  }

  uploadFile = (event) => {
    console.log(event);
    const fileUpload = event.target;
    const files = fileUpload.files;
    this.readFile(files[0])
      .then((fileContent) => this.parseCandidates(fileContent))
      .then((candidates) => {
        console.log(candidates);
        localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
        this.setState({done: true, candidates});
        setTimeout(() => {
          this.setState({done: false});
        }, 2000);
      })
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', (ev) => {
        console.log(ev);
        resolve(fileReader.result);
      });
      fileReader.readAsText(file);
    })
  }

  parseCandidates(fileContent = '') {
    
    return flatten(fileContent.split('\n')
      .map(name => name.split('\r\n')
      .filter(name => !!name)
      )
    );
      
  }
}