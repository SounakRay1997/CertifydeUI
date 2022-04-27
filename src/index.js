import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    userPoolId: 'us-east-1_oLWzxOn2Y', //UserPool ID
    region: 'us-east-1',
    userPoolWebClientId: '2eui7presftkpf0sjntusv7s81' //WebClientId
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
