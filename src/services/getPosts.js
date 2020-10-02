import firebase from 'firebase/app';
import {addDataIndexedDb} from '../indexdb';

const firstPostsOnline = () => {
    return firebase
      .database()
      .ref('posts')
      .orderByKey()
      .limitToLast(9)
      .once('value')
      .then(data => {
        const keys = Object.keys(data.val());
        const posts = keys.map(key => data.val()[key]).reverse();
        const key = keys[0];
        addDataIndexedDb.addPosts({id: 'posts', posts, key});
        return {posts, key};
      })
}

const firstPostsOffline = () => {
  const data = addDataIndexedDb.getPosts();
  return new Promise (resolve => {
    data.onsuccess = e => {
      const posts = e.target.result.posts;
      const key = e.target.result.key;
      resolve({posts, key});
    }
  })
}

const loadMorePosts = (prevKey) => {
  return firebase
    .database()
    .ref('posts')
    .orderByKey()
    .endAt(prevKey)
    .limitToLast(7)
    .once('value')
    .then(data => {
      let keys = Object.keys(data.val());
      let posts = keys.map(key => data.val()[key]).reverse().slice(1);
      let key = keys[0];
      return {posts, key};
    })
}

export {firstPostsOnline, firstPostsOffline, loadMorePosts}
