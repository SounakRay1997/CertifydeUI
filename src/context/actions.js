import UserPool from '../UserPool';
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoUser } from 'amazon-cognito-identity-js';

function asyncAuthenticateUser(cognitoUser, cognitoAuthenticationDetails) {
  return new Promise(function(resolve, reject) {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
      newPasswordRequired: resolve
    })
  })
}

export async function loginUser(dispatch, loginPayload) {
  
  const authenticationData = {
    Username: loginPayload[0],
    Password: loginPayload[1],
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData)

  const userData = {
    Username: loginPayload[0],
    Pool: UserPool,
  };
  
  const cognitoUser = new CognitoUser(userData);

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let result = await asyncAuthenticateUser(cognitoUser, authenticationDetails)
    let data = await result
 
    if (data) {
      let return_data = {'user': {'email': loginPayload[0]}, 'auth_token': result.getAccessToken().getJwtToken()};
      dispatch({ type: 'LOGIN_SUCCESS', payload: return_data });
      localStorage.setItem('currentUser', JSON.stringify(return_data));
      return return_data
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    alert("Please check your email and password. Also make sure that your email address is confirmed!")
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
    alert("Please check your email and password. Also make sure that your email address is confirmed!")
    window.location.reload()
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}