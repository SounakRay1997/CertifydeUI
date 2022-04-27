import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_Opt5ncakQ',
  ClientId: '3j1reb0vv3q0kbdh9l72lhp0gj'
};

export default new CognitoUserPool(poolData);