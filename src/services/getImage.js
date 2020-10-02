import firebase from 'firebase/app'
import 'firebase/storage';

export const imageUrl = () => {
  return firebase
    .storage()
    .ref('/')
    .child('docks.jpg')
    .getDownloadURL()
    .catch(error => {
      console.log(error);
    })
}
