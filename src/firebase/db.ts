import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyD3Kx1ZgaBvvPMXMtkrFuq-Gsogc7TV2qs',
    authDomain: 'tournament-app-backend.firebaseapp.com',
    databaseURL: 'https://tournament-app-backend.firebaseio.com',
    projectId: 'tournament-app-backend',
    storageBucket: 'tournament-app-backend.appspot.com',
    messagingSenderId: '731915439308',
    appId: '1:731915439308:web:395e4965fead14aba98669',
    measurementId: 'G-4SH1ZC1KDW'
  })
  .firestore()
