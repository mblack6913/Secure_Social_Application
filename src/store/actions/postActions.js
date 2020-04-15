import firebase from 'firebase/app'

export const createPost = (post) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('posts').add({
            ...post, 
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName, 
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_POST', post});
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERROR', err});
        })
        
    }
}

//This removes a member from a group 
export const removeMember = (group) =>{
    return (dispatch, getState, {getFirestore}) => {
      //async call
      const firestore = getFirestore();
      console.log(group);
      
      firestore.collection('groups').doc(group.groupID).update({
        members: firebase.firestore.FieldValue.arrayRemove(group.member)
      }).then( () => {
          dispatch({type: 'REMOVED_MEMBER' });
      }).catch((err)=>{
          dispatch({type: 'REMOVED_MEMBER_ERROR', err });
      })
      
  }
  };
  //This rejects a request to join a group
  export const rejectRequest = (group) =>{
    return (dispatch, getState, {getFirestore}) => {
      //async call
      const firestore = getFirestore();
      console.log(group);
      
      firestore.collection('groups').doc(group.groupID).update({
        requests: firebase.firestore.FieldValue.arrayRemove(group.member)
      }).then( () => {
          dispatch({type: 'REMOVED_MEMBER' });
      }).catch((err)=>{
          dispatch({type: 'REMOVED_MEMBER_ERROR', err });
      }) 
  }
  };
  // This requests a user to be a part of their group
  export const addMemberRequest = (group) =>{
    return (dispatch, getState, {getFirestore}) => {
      //async call
      const firestore = getFirestore();
      console.log(group);
      
      firestore.collection('groups').doc(group.groupID).update({
        requests: firebase.firestore.FieldValue.arrayUnion(group.member)
      }).then( () => {
          dispatch({type: 'REMOVED_MEMBER' });
      }).catch((err)=>{
          dispatch({type: 'REMOVED_MEMBER_ERROR', err });
      })
      
  }
  };
//This accepts request and adds them to the group
  export const acceptRequest = (group) =>{
    return (dispatch, getState, {getFirestore}) => {
      //async call
      const firestore = getFirestore();
      console.log(group);
      
      firestore.collection('groups').doc(group.groupID).update({
        members: firebase.firestore.FieldValue.arrayUnion(group.member)
      }).then( () => {
          dispatch({type: 'REMOVED_MEMBER' });
      }).catch((err)=>{
          dispatch({type: 'REMOVED_MEMBER_ERROR', err });
      })
      
  }
  };