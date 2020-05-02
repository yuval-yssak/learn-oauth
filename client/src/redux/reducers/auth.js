function auth(state = { authenticated: false }, action) {
  switch (action.type) {
    case 'NEW_TOKEN': {
      return { ...state, token: action.payload }
    }
    default: {
      return state
    }
  }
}

export default auth
