import firebase from 'firebase/app';
import {addDataIndexedDb} from '../indexdb';

const Users = () => {
  if(!navigator.onLine){
    let users;
    const data = addDataIndexedDb.getUsers()
    return new Promise(resolve => {
      data.onsuccess = e => {
        users = e.target.result.users;
        resolve(users);
      }
    })
  }
  return firebase
    .database()
    .ref('users')
    .once('value')
    .then(data => {
      let keys = Object.keys(data.val());
      let users = keys.map(key => data.val()[key]);
      addDataIndexedDb.addUsers({id: 'users', users});
      return users;
    })
}

export {Users}
