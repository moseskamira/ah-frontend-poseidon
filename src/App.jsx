/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.scss';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faUserCircle,
  faEnvelope,
  faThumbsDown,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import Routes from './routes/index';

library.add(
  faUserCircle,
  faEnvelope,
  faFacebook,
  faTwitter,
  faThumbsDown,
  faThumbsUp
);
require('dotenv').config();

fontawesome.library.add(solid, regular);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
