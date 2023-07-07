import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  //console.log(`Hello ${nameToGreet}!`);
  //const time = (new Date()).toTimeString();
  //core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  //Get a Dad Joke
  fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
  })
    .then(function (response) {
          return response.json();
  })
    .then(function (data) {
          console.log(data.joke);
          core.setOutput("dad-joke", nameToGreet + ", here is your dad joke - " + data.joke);
          core.debug("This message is a debug message and should only be seen when debugging is turned on")
  });
  

} catch (error) {
  core.setFailed(error.message);
}