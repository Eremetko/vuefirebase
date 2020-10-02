import firebase from 'firebase/app'
import 'firebase/auth'

const currentUserRole = (userUid) => {
  let role = null
  firebase
    .database()
    .ref('users')
    .orderByChild('uid')
    .equalTo(userUid)
    .on('child_added', data => {
      role = data.val().role;
    })
  return role;
}

const saveUser = (user) => {
  firebase
    .database()
    .ref('users')
    .push({
      username: user.username,
      uid: user.uid,
      role: user.role
    })
}

const loginUser = (username, password) => {
  return new Promise ((resolve, reject) => {
    let currentUser = null,
    role = null;
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(data => {
        currentUser = data.user;
        role = currentUserRole(currentUser.uid);
        resolve({currentUser, role});
      })
      .catch(error => {
        reject(error);
      })
  })
}

const signUpUser = (username, password) => {
  return new Promise (reject => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        const user = {
          username,
          uid: firebase.auth().currentUser.uid,
          role: 'user'
        }
        saveUser(user);
        loginUser(username, password);
      })
      .catch(error => {
        reject(error);
      })
  })
}

const signOutUser = () => {
  firebase
    .auth()
    .signOut()
  return {currentUser: null, role: null}
}

export {loginUser, signUpUser, signOutUser}
