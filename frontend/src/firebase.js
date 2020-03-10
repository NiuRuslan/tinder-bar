import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBVHoZkVbuh3G38MJbps2a9EDh_TZsSh_U',
  authDomain: 'tinder-bar.firebaseapp.com',
  databaseURL: 'https://tinder-bar.firebaseio.com',
  projectId: 'tinder-bar',
  storageBucket: 'tinder-bar.appspot.com',
  messagingSenderId: '136178829220',
  appId: '1:136178829220:web:f5826ab15e041c911c2331',
  measurementId: 'G-YSP82RJD3F',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();
export {
  database, storage, firebase as default
}
