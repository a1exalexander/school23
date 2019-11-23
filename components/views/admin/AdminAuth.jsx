import React, { useReducer, useEffect } from 'react';
import firebase, { auth, db } from '../../../firebase';

function reducer(state, action) {
  switch (action.type) {
    case 'user':
      return {...state, user: {...action.payload}};
    case 'auth':
      return {...state, auth: action.payload};
    case 'email':
      return {...state, email: action.payload};
    case 'password':
      return {...state, password: action.payload};
    default:
      throw new Error();
  }
}

const AdminAuth = () => {

  const [state, dispatch] = useReducer(reducer, {user: {}, auth: 'not authorized', email: '', password: ''});

  useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {

      if (authUser) {
        authUser.getIdTokenResult()
          .then(res => {
            console.log(res.token)
          })

        const user = {};
        ({
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData,
        } = authUser);
        dispatch({type: 'user', payload: user})
        dispatch({type: 'auth', payload: 'authorized'});
      } else {
        dispatch({type: 'user', payload: {}})
        dispatch({type: 'auth', payload: 'not authorized'});
      }
    });
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    const {email, password} = state;
    console.log(state)
    auth
      .doSignInWithEmailAndPassword({email, password})
      .then(() => {
        dispatch({type: 'auth', payload: 'auth success'});
      })
      .catch(error => {
        dispatch({type: 'auth', payload: 'auth failure'});
      });
  };

  const handleChange = (type) => (e) => {
    const { value: payload } = e.target;
    dispatch({type, payload});
  }

  return (
    <div>
      <div>
        <p>{state.auth}</p>
        <input onChange={handleChange('email')} value={state.email} type="email"/>
        <input onChange={handleChange('password')} value={state.password} type="password"/>
        <button onClick={onSubmit}>Login</button>
      </div>
    </div>
  )
};

export default AdminAuth;
