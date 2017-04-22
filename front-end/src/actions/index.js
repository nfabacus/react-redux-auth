import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
 } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Purpose of redux-thunk is to dispatch multiple different actions inside action creator. can also insert different logic.  can wait as long as we want to dispatch action, in contrary to normal synchronous actions

    // Submit email/password to the server
       //below {email, password} is the short for { email:email, password:password }
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        // If request is good,
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT token
        localStorage.setItem('token', response.data.token);

        // - redirect to the route '/dashboard'
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        // If request is bad,
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  }
}
