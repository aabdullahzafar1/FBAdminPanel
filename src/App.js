

import firebase from "firebase/app";
import "firebase/firestore";
import { useState } from "react";
import AppRouter from './AppRouter';
import AuthContext from "./components/context";
import Example from "./pages/example";
import LoginPage from "./pages/LoginPage";
import * as admin from 'firebase-admin'


var firebaseConfig = {
  apiKey: "AIzaSyA893QImLDZFgNhnHwt8EyfOf0rqcIToag",
  authDomain: "foodbeast-340381.firebaseapp.com",
  databaseURL: "https://foodbeast-340381.firebaseio.com",
  projectId: "foodbeast-340381",
  storageBucket: "foodbeast-340381.appspot.com",
  messagingSenderId: "947968756348",
  appId: "1:947968756348:web:5663051b369f8a39ff17f9",
  measurementId: "G-BFS5WSKHHJ"
};
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
var serviceAccount = require("./foodbeast-340381-firebase-adminsdk-2a0eo-3ae6de6eda.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foodbeast-340381.firebaseio.com"
});

function App() {

  const [user,setUser] = useState(true)


  if(user === true){
    return (<AuthContext.Provider value = {{user, setUser}}>
      <AppRouter></AppRouter>
    </AuthContext.Provider>)
  }
  else{
    return (
      <AuthContext.Provider value = {{user, setUser}}>
        <LoginPage></LoginPage>
      </AuthContext.Provider>
      )
  }
 


}

export default App;
