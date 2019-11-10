import auth from './modules/auth';

const reducer = (state, action) => {
  return {
    auth: auth.reducer(state, action)
  }
}

export default reducer;
