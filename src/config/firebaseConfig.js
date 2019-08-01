import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyDYPgDZa1Y46IaowtXgOrVwWuruT1xvcW8",
    authDomain: "crud-project-react.firebaseapp.com",
    databaseURL: "https://crud-project-react.firebaseio.com",
    projectId: "crud-project-react",
    storageBucket: "",
    messagingSenderId: "981725580414",
    appId: "1:981725580414:web:82305eacda0d966d"
};

firebase.initializeApp(config);
export default firebase;