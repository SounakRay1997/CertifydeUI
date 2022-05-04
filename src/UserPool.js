import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_C9urXAnKi',
  ClientId: '57oa563vip7fck9p5cpvadeeag'
};

export default new CognitoUserPool(poolData);