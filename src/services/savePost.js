import firebase from "firebase/app";
import { addDataIndexedDb } from "../indexdb";

export const savePostOnline = post => {
    firebase
      .database()
      .ref("posts")
      .push(post);
    return post;
};

export const savePostOffline = () => {
  const data = addDataIndexedDb.getNewPost();
  let newPost = null;
  data.onsuccess = e => {
    newPost = e.target.result.newPost;
    firebase
      .database()
      .ref('posts')
      .push(newPost)
  }
}