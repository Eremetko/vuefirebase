let openRequest = indexedDB.open('db', 1);
let db;
openRequest.onupgradeneeded = function() {
  db = openRequest.result;
  if (!db.objectStoreNames.contains('users')) {
    db.createObjectStore('users', {keyPath: 'id'});
    db.createObjectStore('posts', {keyPath: 'id'});
  }
};

export const addDataIndexedDb = {
  addUsers(firebaseData) {
    db = openRequest.result;
    const transaction = db.transaction('users', 'readwrite');
    const users = transaction.objectStore('users');
    users.add(firebaseData);
  },
  getUsers() {
    db = openRequest.result;
    const transaction = db.transaction('users', 'readonly');
    const users = transaction.objectStore('users');
    return users.get('users');
  },
  addPosts(firebaseData) {
    db = openRequest.result;
    const transaction = db.transaction('posts', 'readwrite');
    const posts = transaction.objectStore('posts');
    posts.put(firebaseData);
  },
  addNewPost(firebaseData){
    db = openRequest.result;
    const transaction = db.transaction('posts', 'readwrite');
    const newPost = transaction.objectStore('posts');
    newPost.put(firebaseData);
  },
  getNewPost(){
    db = openRequest.result;
    const transaction = db.transaction('posts', 'readwrite');
    const newPost = transaction.objectStore('posts');
    const post = newPost.get('newPost');
    newPost.delete('newPost');
    return post;
  },
  getPosts() {
    db = openRequest.result;
    const transaction = db.transaction('posts', 'readonly');
    const posts = transaction.objectStore('posts');
    return posts.get('posts')
  }
}
