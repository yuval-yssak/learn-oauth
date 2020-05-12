import {
  INCREMENT,
  ASYNC_INCREMENT,
  DECREMENT,
  SET_COUNT,
  CANCEL_ASYNC_CHANGE,
  SEND_ACCESS_TOKEN
} from './actionTypes'

const increment = () => ({ type: INCREMENT })
const incrementAsync = () => ({ type: ASYNC_INCREMENT })
const decrement = () => ({ type: DECREMENT })
const setCount = count => ({ type: SET_COUNT, payload: { newCount: count } })
const cancelAsync = () => ({ type: CANCEL_ASYNC_CHANGE })
const sendAccessToken = token => ({ type: SEND_ACCESS_TOKEN, payload: token })
export {
  increment,
  decrement,
  incrementAsync,
  setCount,
  cancelAsync,
  sendAccessToken
}
