import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
  
const config = {
  apiKey: "AIzaSyAVrcuyWRp7ueGI2xugtnuBgQuoOm6Dh2g",
  authDomain: "social-telecoms.firebaseapp.com",
  databaseURL: "https://social-telecoms.firebaseio.com",
  projectId: "social-telecoms",
  storageBucket: "social-telecoms.appspot.com",
  messagingSenderId: "500483695155",
  appId: "1:500483695155:web:e8242d29aef52e95673946",
  measurementId: "G-D53GF3SQ3Q"
  };
  firebase.initializeApp(config);
  
const store = createStore(rootReducer, 
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      reduxFirestore(firebase)
));

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
 const rrfProps = {
      firebase,
      config: rrfConfig,
      dispatch: store.dispatch,
      createFirestoreInstance // <- needed if using firestore
    }

ReactDOM.render(
  <Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}>
    <App />
    </ReactReduxFirebaseProvider>
  </Provider>, 
  document.getElementById('root')
);