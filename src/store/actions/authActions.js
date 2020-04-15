import firebase from 'firebase/app'

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        //const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        //  const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_ SUCCESS'})
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                groupName: newUser.groupName
            })
        }).then(()  => {
            dispatch({ type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err})
        })
    }
}

  //This creates a new group when a user signs up
  export const signUpGroup = (newUser) =>{
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      //const profile = getState().firebase.profile;
      //const ownerID = getState().firebase.auth.uid;
      const randomKey = Math.random().toString(18);
      console.log(newUser.groupKey)
      firestore.collection('groups').add({
        
        groupOwner: newUser.email,
        members:[newUser.email],
        requests:[],
        groupKey: randomKey,
        groupName: newUser.groupName
      }).then( () => {
          dispatch({type: 'CREATE_GROUP' });
      }).catch((err)=>{
          dispatch({type: 'CREATE_GROUP_ERROR', err });
      })
      
  }
  };
