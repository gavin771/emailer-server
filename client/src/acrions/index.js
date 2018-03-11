import axios from 'axxios';
import { FETCH_USER } from './types';

const fetchUser = async () => {
  return dispatch => {
    axios.get('/api/me')
      .then(res => dispatch({ type: FETCH_USER, payload: res }))
  }

  //typically, we would have this
  /**
   * const user = axios.get('/api/me');
   * 
   * returm {
   * type: FETCH_USER,
   * payload: user
   * }
   * 
   * which immediately returns an action 
   * 
   * but with redux-thunk we don't have to
   */
}