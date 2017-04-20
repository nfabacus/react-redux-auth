import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Purpose of redux-thunk is to dispatch multiple different actions inside action creator. can also insert different logic.  can wait as long as we want to dispatch action, in contrary to normal synchronous actions

    // Submit email/password to the server
       //below {email, password} is the short for { email:email, password:password }
       console.log('sending post request');
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        // If request is good,
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT token
        localStorage.setItem('token', response.data.token);

        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad,
        // - Show an error to the user
      });
  }
}
